import {FC, useCallback} from "react";
import Template from "@/common/template";
import {domainService} from "@/store/apis/site";
import {TableColumnProps} from "antd";
import CDNDomainFilter from "@/pages/cdn/domain/filters";
import IconFont from "@/common/icon";

const CDNDomains:FC = () => {
    const query = useCallback((data) => {
        return domainService.FindDomain({}, data)
    }, [])
    return <Template
        filter={<CDNDomainFilter />}
        queryData={query}
        columns={columns}
        rowKey="domain"
    />
}

export default CDNDomains;


export const ColStatus = {
    title: "状态",
    dataIndex: "dnsStatus",
    width: 120,
    render: (status: number) => {
        return status === 1 ?
            <IconFont type="iconbaseline-check_box-px" />
            : <IconFont type="iconcheck_box" />;
    }
}

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
        ...ColStatus,
        title: "SSL状态",
        dataIndex: "sslEnable"
    },
    {
        title: "灰域证书",
        dataIndex: "sslAuto",
        width: 120,
        render(value){
            return (value === 1 || value === 2) ? <IconFont type="iconbaseline-check_box-px" /> : <IconFont type="iconcheck_box" />
        }
    },
    {
        ...ColStatus,
        title: "dns状态"
    },
    {
        title: "客户名称",
        dataIndex: "customerName"
    }
];
