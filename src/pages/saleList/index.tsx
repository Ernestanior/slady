import {FC, useCallback, useMemo} from "react";
import {INormalEvent} from "@/common/interface";
import historyService from "@/store/history";
import {saleService, userService} from "@/store/apis/account";
import {Button, Space} from "antd";
import ConfirmButton from "@/common/confirm/button";
import {queryValueFromListRender, reqAndReload} from "@/common/utils";
import Template from "@/common/template";
import {SALE_LIST} from "@/pages/sale/create";
import SaleFilter from "@/pages/saleList/filter";

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
    const disable = useCallback(({userId}) => {
        const config = userService.DisableUser({ id:userId }, {});
        reqAndReload(config)
    }, [])

    // enable
    const enable = useCallback(({userId}) => {
        const config = userService.DisableUser({ id:userId }, {});
        reqAndReload(config)
    }, [])

    // modify
    const deleteUser = useCallback(({userId}) => {
        const config = userService.Delete({ id:userId }, {});
        reqAndReload(config)
    }, [])


    // 下拉
    const _columns = useMemo(() => {
        return [
            ...columns,
            {
                title: "操作",
                dataIndex: "opt",
                width: 200,
                render(_:any, data:any){
                    return <Space>
                        <Button onClick={() => { modify(data) }}>修改</Button>
                        {data.status === 1 && <ConfirmButton info="确定禁用此用户？" submit={() => { disable(data) }}>禁用</ConfirmButton>}
                        {data.status !== 1 && <ConfirmButton info="确定启用此用户？" submit={() => { enable(data) }}>启用</ConfirmButton>}
                        <ConfirmButton info="确定删除此用户？" submit={() => { deleteUser(data) }}>删除</ConfirmButton>
                    </Space>
                }
            }
        ]
    }, [modify, enable, disable, deleteUser])

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
    {
        title: "状态",
        dataIndex: "status",
        width: 150
    }
]