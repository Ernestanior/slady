import {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import {TableColumnProps} from "antd";
import ArchiveCustomerFilter from "@/pages/archive/customers/filters";
import {customerService} from "@/store/apis/account";
import ConfirmButton from "@/common/confirm/button";
import {reqAndReload} from "@/common/utils";

const ArchiveCustomer:FC = () => {
    const query = useCallback((data) => {
        return customerService.FindCustomer({}, {...data, deleted: 1, category: "biz"})
    }, [])

    const reOpenCustomer = useCallback((customer: any) => {
        const config = customerService.ReactivateCustomer({customerId: customer.id}, {});
        reqAndReload(config)
    }, [])

    const opt = useMemo(() => {
        return [
            ...columns,
            {
                title: "操作",
                dataIndex: "opt",
                width: 260,
                render(_:any, data:any){
                    return <ConfirmButton info={`确定恢复此用户${data.name}/${data.email}？`} submit={() => { reOpenCustomer(data) }}>重启客户</ConfirmButton>
                }
            }
        ]
    }, [reOpenCustomer])

    return <Template
        filter={<ArchiveCustomerFilter />}
        queryData={query}
        columns={opt}
        rowKey="userId"
    />
}

export default ArchiveCustomer;

/**
 * 表格行
 */
export const columns: TableColumnProps<any>[] = [
    {
        title: "ID",
        dataIndex: "id",
        width: 75,
        sorter: true,
    },
    {
        title: "用户名",
        dataIndex: "name",
        sorter: true,
    },
    {
        title: "登录邮箱",
        dataIndex: "email",
        sorter: true,
    },
    {
        title: "创建者",
        dataIndex: "creatorName",
    },
    {
        title: "创建时间",
        dataIndex: "createDate",
    },
    {
        title: "删除时间",
        dataIndex: "modifyDate"
    },
    {
        title: "删除方式",
        dataIndex: "autoDeletion",
        render(value){
            if(value === 1){
                return "自动删除"
            }
            if(value === 0){
                return "手动删除"
            }
            return "-"
        }
    }
];
