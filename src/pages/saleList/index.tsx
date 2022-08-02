import {FC, useCallback, useMemo} from "react";
import {INormalEvent} from "@/common/interface";
import historyService from "@/store/history";
import {saleService} from "@/store/apis/account";
import {queryValueFromListRender, reqAndReload} from "@/common/utils";
import Template from "@/common/template";
import {SALE_LIST} from "@/pages/sale/create";
import SaleFilter from "@/pages/saleList/filter";
import {E_USER_STATUS_COLUMN} from "@/pages/customerList";
import {E_USER_TYPE} from "@/store/account/service";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";

const SaleList:FC = () => {

    const buttons: INormalEvent[] = useMemo(()=> {
        return [{
            text: '新增',
            primary: true,
            event(){
                historyService.push("/sale/create")
            }
        }]
    }, [])

    const query = useCallback((data) => {
        return saleService.QueryList({}, data);
    }, [])

    // modify
    const modify = useCallback(sale => {
        historyService.push(`/sale/modify/${sale.id}`)
    }, [])

    // disable
    // const disable = useCallback(({userId}) => {
    //     const config = userService.EnableUser({ id:userId }, {});
    //     reqAndReload(config)
    // }, [])
    //
    // // enable
    // const enable = useCallback(({userId}) => {
    //     const config = userService.DisableUser({ id:userId }, {});
    //     reqAndReload(config)
    // }, [])

    //重置密码
    const resetPwd = useCallback(
        (user) => {
            historyService.push(`/sale/resetPwd/${user.name}/${user.userId}`);
        },
        []
    );
    // modify
    const deleteUser = useCallback(({id}) => {
        const config = saleService.Delete({ saleId: id }, {});
        reqAndReload(config)
    }, [])

    // 分配客户
    const reAssignCustomer = useCallback(({id}) => {
        // 跳转到为销售分配客户页面
        historyService.push("/sale/assign/" + id)
    }, [])

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "分配客户",
                    hide:(data)=>!(data.type === E_USER_TYPE.SALE),
                    event(data) {
                        reAssignCustomer(data)
                    }
                },
                {
                    text: "修改",
                    hide:(data)=>data.status !== 1,
                    event(data) {
                        modify(data)
                    }
                },
                {
                    text: "重置密码",
                    event(data) {
                        resetPwd(data);
                    },
                },
                {
                    text: "删除",
                    event(data) {
                        // deleteCustomer(data);
                        const value = {
                            title:"删除",
                            content:"你确定要删除该客户么？",
                            onOk:()=>deleteUser(data)
                        }
                        msgModal.createEvent(value)
                    },
                }]
        ]
    }, [resetPwd,deleteUser,reAssignCustomer,modify])

    // 下拉
    /** 老版本
    const _columns = useMemo(() => {
        return [
            ...columns,
            {
                title: "操作",
                dataIndex: "opt",
                width: 260,
                render(_:any, data:any){
                    const showAssign = data.type === E_USER_TYPE.SALE;
                    return <Space>
                        {showAssign && <Button onClick={() => { reAssignCustomer(data) }}>分配客户</Button>}
                        <Button onClick={() => { modify(data) }}>修改</Button>
                        <ConfirmButton info={`确定删除此用户${data.name}/${data.email}？`} submit={() => { deleteUser(data) }}>删除</ConfirmButton>
                    </Space>
                }
            }
        ]
    }, [modify, deleteUser, reAssignCustomer])
    */
    return <section>
        <Template
            optList={options}
            filter={<SaleFilter />}
            event={buttons}
            columns={columns}
            queryData={query}
            rowKey="id"
        />
    </section>
}

export default SaleList

const columns = [
    {
        dataIndex: "name",
        title: "名称"
    },
    {
        dataIndex: "type",
        title: "类型",
        render: queryValueFromListRender(SALE_LIST)
    },
    E_USER_STATUS_COLUMN
]
