import {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import CustomerFilter from "@/pages/customerList/filter";
import {INormalEvent} from "@/common/interface";
import {Button, Space, TableColumnProps, Tooltip} from "antd";
import {agentService, customerService, saleService, userService} from "@/store/apis/account";
import historyService from "@/store/history";
import ConfirmButton from "@/common/confirm/button";
import {reqAndReload} from "@/common/utils";
import Status from "@/common/status";
import {E_COLOR} from "@/common/const";
import {E_All_USER_TYPE, E_USER_TYPE} from "@/store/account/interface";
import useAccountInfo from "@/store/account";
import moment from "moment";
import request from "@/store/request";
import EllipsisTooltip from "@/common/ellipsisTooltip";
import {ellopsisTableConfig} from "@/common/utilsx";
import {statService} from "@/store/apis/stat";

/**
 * 用户启用禁用状态
 */
export const E_USER_STATUS_COLUMN:TableColumnProps<any> = {
    title: "账号状态",
    dataIndex: "status",
    width: 80,
    render(value,item){
        let leftTime = 0;
        const endDate = moment(item.probationStart, "YYYY/MM/DD").add(item.probationPeriod + 1, "day")
        if(moment().isBefore(endDate)){
            leftTime = endDate.diff(moment(), "day");
        }
        if(item.probation){
            return <Tooltip title="测试" placement="left">
                <Status color={E_COLOR.warn}>
                    {leftTime}/{item.probationPeriod}
                </Status>
            </Tooltip>
        }
        if(value === 1){
            return <Status color={E_COLOR.enable}>
                启用
            </Status>
        }
        return <Status color={E_COLOR.disable}>
            禁用
        </Status>
    }
}

const CustomerList:FC = () => {
    const buttons: INormalEvent[] = useMemo(()=> {
        return [{
            text: '新增',
            primary: true,
            event(){
                historyService.push("/customer/create")
            }
        }]
    }, [])

    // const query = useCallback((data) => {
    //     return saleService.QueryUserList({}, data);
    // }, [])

    const queryDataFunction = useCallback(async (filters) => {
        const cusList = await request(saleService.QueryUserList({}, filters));
        if(cusList.isSuccess && cusList.result){
            const data:any = cusList.result

            const params = data.content
                            .filter((item:{type:string,dnsServiceFlag:number})=>item.type!== USER_TYPE[2].id && item.dnsServiceFlag)
                            .map((item:{id:number})=>item.id)
            const dnsUsage:any = await request(saleService.CustomerDnsUsage({}, [...params]));
            if(dnsUsage.isSuccess && dnsUsage.result){
                dnsUsage.result.forEach((item:any)=>{
                    data.content.forEach((i:any)=>{
                        if(i.id===item.customerId){
                            i['usedDomains']=item.usedDomains
                        }
                    })
                })
            }

            const customerIds = data.content.filter((item:{type:string})=> item.type !== USER_TYPE[2].id).map((item:{id:number})=>item.id)
            const cdnUsage = await request<any[]>(statService.SaleStatCustomer(customerIds));
            if(cdnUsage.isSuccess && cdnUsage.result){
                cdnUsage.result.forEach((item:any)=>{
                    data.content.forEach((i:any)=>{
                        if(i.id===item.customerId){
                            i['usedMasterDomains']=item.usedMasterDomains
                        }
                    })
                })
            }
            return data;
        }
        return null;
    }, [])

    // modify
    const modify = useCallback(customer => {
        historyService.push(`/customer/modify/${customer.type}/${customer.id}`)
    }, [])

    // disable
    const disable = useCallback((data) => {
        let config;
        if(data.type === E_All_USER_TYPE.AGENT){
            config = userService.DisableUser({id: data.userId}, {});
        }else{
            config = customerService.DisableCustomer({ id: data.id }, {});
        }
        reqAndReload(config)
    }, [])

    // enable
    const enable = useCallback((data) => {
        let config;
        if(data.type === E_All_USER_TYPE.AGENT){
            config = userService.EnableUser({id: data.userId}, {});
        }else{
            config = customerService.EnableCustomer({ id: data.id }, {});
        }
        reqAndReload(config)
    }, [])

    // modify
    const deleteCustomer = useCallback((data) => {
        let config;
        if(data.type === E_All_USER_TYPE.AGENT){
            config = agentService.Delete({id: data.id}, {});
        }else{
            config = customerService.Delete({ id: data.id }, {});
        }
        reqAndReload(config)
    }, [])

    const info = useAccountInfo();
    let _columns_fix:any = columns;
    if(info && info.type === E_USER_TYPE.SALE_MANAGER){
        _columns_fix = columns_manage;
    }

    // 下拉
    const _columns:any = useMemo(() => {
        return [
            ..._columns_fix,
            {
                title: "操作",
                dataIndex: "opt",
                width: 200,
                fixed: "right",
                render(_:any, data:any){
                    return <Space>
                        <Button onClick={() => { modify(data) }}>修改</Button>
                        {data.status === 1 && <ConfirmButton info={`确定禁用此客户${data.name}/${data.email}？`} submit={() => { disable(data) }}>禁用</ConfirmButton>}
                        {data.status !== 1 && <ConfirmButton info={`确定启用此客户${data.name}/${data.email}？`} submit={() => { enable(data) }}>启用</ConfirmButton>}
                        <ConfirmButton info={`确定删除此客户${data.name}/${data.email}？`} submit={() => { deleteCustomer(data) }}>删除</ConfirmButton>
                    </Space>
                }
            }
        ]
    }, [modify, enable, disable, deleteCustomer, _columns_fix])


    return <section>
        <Template
            filter={<CustomerFilter />}
            event={buttons}
            columns={_columns}
            // queryData={query}
            queryDataFunction={queryDataFunction}
            rowKey="id"
            scroll={{
                x: 1200
            }}
        />
    </section>
}

export default CustomerList

const columns: TableColumnProps<any>[] = [
    {
        title: "客户名称",
        dataIndex: "name",
        sorter: true,
        width: 120,
        fixed: "left",
        ...ellopsisTableConfig
    },
    {
        title: "客户邮箱",
        dataIndex: "email",
        sorter: true,
        width: 120,
        ...ellopsisTableConfig
    },
    {
        title: "客户类型",
        dataIndex: "type",
        width:90,
        onCell:() => ({
                style: {
                    whiteSpace: "nowrap",
                    maxWidth: 90,
                },
        }),
        render: type => {
            const item = USER_TYPE.find(it => it.id === type);
            if(item){
                if(item.name.length>6){
                    return <EllipsisTooltip title={item.name}>{item.name}</EllipsisTooltip>;
                }
                return item.name
            }
            return "-"
        }
    },
    {
        ...E_USER_STATUS_COLUMN,
    },
    {
        title: "CDN",
        dataIndex: "probation",
        width: 140,
        render(_, data){
            if(data.type === USER_TYPE[2].id){
                return "-"
            }
            // CDN服务未启用
            if(data.cdnServiceFlag !== 1){
                return <Status color={E_COLOR.off}>
                    未启用
                </Status>
            }
            return <><Status color={E_COLOR.enable}>
                启用
            </Status>{data.usedMasterDomains || 0}/{data.limitMasterDomains} </>

            // return <div>
            //     <Status color={E_COLOR.warn}>测试</Status>
            //     {leftTime}/{data.probationPeriod}
            // </div>
        }
    },
    {
        title: "DNS",
        dataIndex: "dnsServiceFlag",
        width: 140,
        render(_, data){
            if(data.type === USER_TYPE[2].id){
                return "-"
            }
            // DNS服务未启用
            if(data.dnsServiceFlag !== 1){
                return <Status color={E_COLOR.off}>
                    未启用
                </Status>
            }

            return <div>
                <Status color={E_COLOR.enable}>启用</Status>
                {data.usedDomains || 0}/{data.limitDedicatedPlans || 0}
            </div>
        }
    }
]

const columns_manage = [
    ...columns.slice(0, 2),
    {
        title: "销售员",
        dataIndex: "saleName",
        width:110,
        onCell:() => ({
                style: {
                    whiteSpace: "nowrap",
                    maxWidth: 110,
                },
        }),
        render:(value:any)=>{
            if(value.length>10){
                return <EllipsisTooltip title={value}>{value}</EllipsisTooltip>
            }
            return value || "-"
        }
    },
    ...columns.slice(2)
]

export const USER_TYPE = [
    {
        id: "direct",
        name: "直属客户"
    },
    {
        id: "assign_to_agent",
        name: "代理客户"
    },
    {
        id: "agent",
        name: "代理"
    }
]

