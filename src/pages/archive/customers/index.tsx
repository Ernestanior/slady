import {FC, useCallback} from "react";
import Template from "@/common/template";
import {TableColumnProps} from "antd";
import ArchiveCustomerFilter from "@/pages/archive/customers/filters";
import {customerService} from "@/store/apis/account";

const ArchiveCustomer:FC = () => {
    const query = useCallback((data) => {
        return customerService.FindCustomer({}, {...data, isDeleted: 1, category: "biz"})
    }, [])

    return <Template
        filter={<ArchiveCustomerFilter />}
        queryData={query}
        columns={columns}
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
];
