import {FC, useCallback} from "react";
import Template from "@/common/template";
import {domainService} from "@/store/apis/site";
import {TableColumnProps} from "antd";
import ArchiveDomainFilter from "@/pages/archive/domains/filters";

const ArchiveDomains:FC = () => {
    const query = useCallback((data) => {
        return domainService.FindDomain({}, {...data, isDeleted: 1})
    }, [])
    return <Template
        filter={<ArchiveDomainFilter />}
        queryData={query}
        columns={columns}
        rowKey="domain"
    />
}

export default ArchiveDomains;

/**
 * 表格行
 */
export const columns: TableColumnProps<any>[] = [
    {
        title: "主机记录值",
        dataIndex: "displayName",
        sorter: true,
    },
    {
        title: "站点名称",
        dataIndex: "siteName",
        sorter: true,
    },
    {
        title: "源点",
        dataIndex: "upstream",
    },
    {
        title: "客户名称",
        dataIndex: "customerName",
        render: (data) => {
            if (typeof data !== "string") {
                return "-";
            }
            return data;
        },
    },
    {
        title: "创建时间",
        dataIndex: "createDate",
    },
];
