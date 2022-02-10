import {FC, useCallback, useMemo} from "react";
import {INormalEvent} from "@/common/interface";
import historyService from "@/store/history";
import {saleService} from "@/store/apis/account";
import {Button, Space} from "antd";
import ConfirmButton from "@/common/confirm/button";
import {queryValueFromListRender, reqAndReload} from "@/common/utils";
import Template from "@/common/template";
import {SALE_LIST} from "@/pages/sale/create";
import SaleFilter from "@/pages/saleList/filter";
import {E_USER_STATUS_COLUMN} from "@/pages/customerList";
import {E_USER_TYPE} from "@/store/account/service";

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

    // modify
    const deleteUser = useCallback(({id}) => {
        const config = saleService.Delete({ id }, {});
        reqAndReload(config)
    }, [])

    // 分配客户
    const reAssignCustomer = useCallback(({id}) => {
        // 跳转到为销售分配客户页面
        historyService.push("/sale/assign/" + id)
    }, [])

    // 下拉
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
                        <ConfirmButton info="确定删除此用户？" submit={() => { deleteUser(data) }}>删除</ConfirmButton>
                    </Space>
                }
            }
        ]
    }, [modify, deleteUser, reAssignCustomer])

    return <section>
        <Template
            filter={<SaleFilter />}
            event={buttons}
            columns={_columns}
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
