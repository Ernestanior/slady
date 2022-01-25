import {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import CustomerFilter from "@/pages/customerList/filter";
import {INormalEvent} from "@/common/interface";
import {Button, Space, TableColumnProps} from "antd";
import {customerService} from "@/store/apis/account";
import historyService from "@/store/history";
import ConfirmButton from "@/common/confirm/button";
import {reqAndReload} from "@/common/utils";

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

    const query = useCallback((data) => {
        return customerService.FindCustomer({}, data);
    }, [])

    // modify
    const modify = useCallback(customer => {
        historyService.push(`/customer/modify/${customer.id}`)
    }, [])

    // disable
    const disable = useCallback(({id}) => {
        const config = customerService.DisableCustomer({ id }, {});
        reqAndReload(config)
    }, [])

    // enable
    const enable = useCallback(({id}) => {
        const config = customerService.EnableCustomer({ id }, {});
        reqAndReload(config)
    }, [])

    // modify
    const deleteCustomer = useCallback(({id}) => {
        const config = customerService.Delete({ id }, {});
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
                        {data.status === 1 && <ConfirmButton info="确定禁用此客户？" submit={() => { disable(data) }}>禁用</ConfirmButton>}
                        {data.status !== 1 && <ConfirmButton info="确定启用此客户？" submit={() => { enable(data) }}>启用</ConfirmButton>}
                        <ConfirmButton info="确定删除此客户？" submit={() => { deleteCustomer(data) }}>删除</ConfirmButton>
                    </Space>
                }
            }
        ]
    }, [modify, enable, disable, deleteCustomer])

    return <section>
        <Template
            filter={<CustomerFilter />}
            event={buttons}
            columns={_columns}
            queryData={query}
            rowKey="id"
        />
    </section>
}

export default CustomerList

const columns: TableColumnProps<any>[] = [
    {
        title: "客户名称",
        dataIndex: "name",
        sorter: true,
    },
    {
        title: "邮箱",
        dataIndex: "email",
        sorter: true,
    },
    {
        title: "类型",
        dataIndex: "type",
        sorter: true
    },
    {
        title: "状态",
        dataIndex: "status",
        width: 150
    },
    {
        title: "正式客戶",
        dataIndex: "probation",
        width: 120,
        render(value){
            if(value === 0){
                return "正式客户"
            }
            return "测试客户"
        }
    }
]
