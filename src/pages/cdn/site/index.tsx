import {FC, useCallback} from "react";
import Template from "@/common/template";
import {siteService} from "@/store/apis/site";
import {TableColumnProps} from "antd";
import CDNSiteListFilter from "@/pages/cdn/site/filters";
import {E_USER_STATUS_COLUMN} from "@/pages/customerList";

const CDNSiteList:FC = () => {
    const query = useCallback((data) => {
        return siteService.FindSite({}, data)
    }, [])

    return <Template
        filter={<CDNSiteListFilter />}
        queryData={query}
        columns={columns}
        rowKey="domain"
    />
}

export default CDNSiteList;

export const CONST_SITE_TYPE = [
    {
        name: "Top Domain",
        id: "normal",
    },
    {
        name: "CName",
        id: "cname",
    },
    {
        name: "端口转发",
        id: "port",
    },
    {
        name: "域名跳转",
        id: "forward",
    },
];

/**
 * 表格行
 */
export const columns: TableColumnProps<any>[] = [
    {
        title: "站点名称",
        dataIndex: "name",
        sorter: true,
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
        title: "站点类型",
        dataIndex: "type",
        render(type){
            const item = CONST_SITE_TYPE.find(_item => _item.id === type );
            return !!item? item.name : "-"
        }
    },
    {
        title: "记录数",
        dataIndex: "records"
    },
    {
        title: "UniqueName",
        dataIndex: "uniqueName"
    },
    {
        title: "源点",
        dataIndex: "upstream",
    },
    {
        ...E_USER_STATUS_COLUMN,
        title: "站点状态"
    }
];
