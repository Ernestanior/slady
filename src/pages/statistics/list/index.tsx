import React, {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import { Input, TableColumnProps} from "antd";
import historyService from "@/store/history";
import {customerService} from "@/store/apis/account";
import request from "@/store/request";
import {ITableDataModule} from "@/common/interface";
import {statService} from "@/store/apis/stat";
import StatFilter from "@/pages/statistics/list/filter";
import StatFilterMobile from "@/pages/statistics/list/filterMobile";
import {toFixed} from "@/common/utils";
import { LABEL_COLOR} from "@/common/const";
import FormItem from "@/common/Form/formItem";
import isMobile from "@/app/isMobile";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import View from "@/common/popup/view";

// 流量计算倍率
const MAGNIFICATION = 10;

const StatisticsList:FC = () => {

    const queryFunction = useCallback(async (data) => {
        try {
            const customerConfig = customerService.FindCustomer({}, { ...data, category: "biz", probation: -1 });
            const customerListRep = await request<ITableDataModule>(customerConfig);
            if(!customerListRep.isSuccess){
                return null
            }
            const customerList = customerListRep.result
            // 调用客户带宽统计功能先禁用
            if (customerList) {
                const customerIds: number[] = customerList.content.map((t) => t.id);
                if (customerIds.length > 0) {
                    // 套餐使用等统计
                    const customerStatConfig = statService.SaleStatCustomer(customerIds);
                    const responses = await request<any[]>(customerStatConfig);
                    if (responses.isSuccess && responses.result && responses.result.length > 0) {
                        const customerSaleStatList = responses.result;
                        const customerSaleStatMap:any = {};
                        customerSaleStatList.forEach(item => {
                            customerSaleStatMap[item.customerId] = item
                        })
                        customerList.content.forEach(item => {
                            item.saleStat = customerSaleStatMap[item.id]
                        })
                    }
                }
            }
            return customerList;
        } catch (error) {
            console.error(error);
        }
        return null;
    }, []);

    // 查询95带宽
    const update95 = useCallback(async (data: any[]) => {
        const customerIds: number[] = data.map((t) => t.id);
        const customerStatConfig = statService.SaleStatCustomer95(customerIds);
        const responses = await request<any>(customerStatConfig);
        const res:any[] = []
        if(responses.isSuccess && responses.result){
            data.forEach(item => {
                res.push({
                    ...item,
                    saleStat: {
                        ...item.saleStat,
                        bandwidthOfCurrentMonth: responses.result[item.id]
                    }
                })
            })
        }
        return res
    }, [])

    const options: IOperationConfig = useMemo(() => {
        return [
                {
                    text: "查看",
                    hide:()=>!isMobile,
                    event(data) {
                        if (data) {
                            const {
                                name,
                                saleName,
                                limitBandwidth,
                                saleStat,
                                limitDefence
                            } = data
                            const dataList=[
                                {label:'客户名称',content:name},
                                {label:'销售员',content:saleName?saleName:"-"},
                                {label:'带宽额度(Mbps)',content:typeof limitBandwidth !== "number"?"-":toFixed(limitBandwidth / 1000000, 2)},
                                {label:'上个月95带宽(Mbps)',content:(!data.saleStat || typeof data.saleStat.bandwidthOfLastMonth !== "number")? "-":getCompareRender(saleStat.bandwidthOfLastMonth, data)},
                                {label:'本月95带宽(Mbps)',content:(!data.saleStat || typeof data.saleStat.bandwidthOfCurrentMonth !== "number")? "-":getCompareRender(saleStat.bandwidthOfCurrentMonth, data)},
                                {label:'最近-14-7天流量(M)',content:(!data.saleStat || typeof data.saleStat.flowOfLast14To7Day !== "number")? "-":toFixed(saleStat.flowOfLast14To7Day/1000000, 2)},
                                {label:'最近7天流量(M)',content:(!data.saleStat || typeof data.saleStat.flowOfLast7Day !== "number")? "-":toFixed(saleStat.flowOfLast7Day/1000000, 2)},
                                {label:'域名(站点)额度',content:domainRender(data)},
                                {label:'防御额度(GB)',content:limitDefence===-1?"Unlimited":limitDefence || "-"},
                            ]
                            const value = {
                                node: <View dataList={dataList} />,
                            }
                            msgModal.createEvent("popup", value)
                        }
                    },
                },
                {
                    text: "统计",
                    event(data) {
                        historyService.push(`/statistics/${data.id}`)
                    }
                },
            ]

    }, [])
    return <section>
        <Template
            filter={isMobile?<StatFilterMobile/>:<StatFilter />}
            columns={isMobile?columnMobile:columns}
            optList={options}
            primarySearch={primarySearch}
            queryDataFunction={queryFunction}
            rowKey="id"
            scroll={isMobile?{}:{
                x: 1600
            }}
            dataMergeEvent={update95}
        />
    </section>
}

export default StatisticsList;

const columnMobile: TableColumnProps<any>[] = [
    {
        title: "客户名称",
        dataIndex: "name",
        width: 110,
        sorter: true,
    },
    {
        title: "销售员",
        dataIndex: "saleName",
        width: 90,
        render:(value:any)=> value?value:"-"
    },
]
const columns: TableColumnProps<any>[] = [
    {
        title: "客户名称",
        dataIndex: "name",
        width: 200,
        sorter: true,
        fixed: isMobile?undefined:"left"
    },
    {
        title: "销售员",
        dataIndex: "saleName",
        width: 200
    },
    {
        title: "带宽额度(Mbps)",
        dataIndex: "limitBandwidth",
        render: (value: any) => {
            if(typeof value !== "number"){
                return "-"
            }
            return toFixed(value / 1000000, 2)
        }
    },
    {
        title: "上个月95带宽(Mbps)",
        dataIndex: "bandwidthOfLastMonth",
        render: (_, data) => {
            if(!data.saleStat || typeof data.saleStat.bandwidthOfLastMonth !== "number"){
                return "-"
            }
            const value = data.saleStat.bandwidthOfLastMonth;
            return getCompareRender(value, data)
        }
    },
    {
        title: "本月95带宽(Mbps)",
        dataIndex: "bandwidthOfCurrentMonth",
        render: (_, data) => {
            if(!data.saleStat || typeof data.saleStat.bandwidthOfCurrentMonth !== "number"){
                return "-"
            }
            const value = data.saleStat.bandwidthOfCurrentMonth;
            return getCompareRender(value, data)
        }
    },
    {
        title: "最近-14-7天流量(M)",
        dataIndex: "flowOfLast14To7Day",
        render: (_, data) => {
            if(!data.saleStat || typeof data.saleStat.flowOfLast14To7Day !== "number"){
                return "-"
            }
            const value = data.saleStat.flowOfLast14To7Day;
            return toFixed(value / 1000000, 2);
        }
    },
    {
        title: "最近7天流量(M)",
        dataIndex: "flowOfLast7Day",
        render: (_, data) => {
            if(!data.saleStat || typeof data.saleStat.flowOfLast7Day !== "number"){
                return "-"
            }
            const value = data.saleStat.flowOfLast7Day;
            let color;
            if(data.saleStat){
                if(typeof data.saleStat.flowOfLast14To7Day === "number"){
                    if(value > (data.saleStat.flowOfLast14To7Day * MAGNIFICATION)){
                        color = LABEL_COLOR.LIGHT_YELLOW
                    }
                    if((value * MAGNIFICATION) < data.saleStat.flowOfLast14To7Day){
                        color = LABEL_COLOR.GREEN
                    }
                }
            }
            return <div {...getLabelStyle(color)}>{toFixed(value / 1000000, 2)}</div>;
        }
    },
    {
        title: "域名（站点）额度",
        dataIndex: "domains",
        render: (_, data) => {
            if(data.type === "normal"){
                if(!data.saleStat || typeof data.saleStat.usedMasterDomains !== "number"){
                    return "-"
                }
                const value = data.saleStat.usedMasterDomains;
                return `${value}/${data.limitMasterDomains}`;
            }
            if(data.type === "cname"){
                if(!data.saleStat || typeof data.saleStat.usedSites !== "number"){
                    return "-"
                }
                const value = data.saleStat.usedSites;
                return `${value}/${data.limitCnames}`;
            }
            return "-"
        }
    },
    {
        title: "防御额度(GB)",
        dataIndex: "limitDefence",
        render: (value) => {
            if(value === -1){
                return "Unlimited"
            }
            return value || "-"
        }
    }
]

function getLabelStyle(color?: string, fontColor?: string){
    if(!color){
        return {}
    }
    return {
        style: {
            backgroundColor: color,
            color: fontColor,
            borderRadius: "5px",
            lineHeight: "32px",
            paddingLeft: 5
        }
    }
}

function getCompareRender(value:number, data:any){
    let color;
    if(value > data.limitBandwidth){
        color = LABEL_COLOR.RED;
    }
    return <div {...getLabelStyle(color, "#fff")}>{toFixed(value / 1000000, 2)}</div>
}
const primarySearch=<>
    <FormItem noStyle name="name" >
        <Input style={{width:"70vw"}} placeholder="用户名" allowClear/>
    </FormItem>
</>

const domainRender=(data:any)=>{
    if(data.type === "normal"){
        if(!data.saleStat || typeof data.saleStat.usedMasterDomains !== "number"){
            return "-"
        }
        const value = data.saleStat.usedMasterDomains;
        return `${value}/${data.limitMasterDomains}`;
    }
    if(data.type === "cname"){
        if(!data.saleStat || typeof data.saleStat.usedSites !== "number"){
            return "-"
        }
        const value = data.saleStat.usedSites;
        return `${value}/${data.limitCnames}`;
    }
    return "-"
}
