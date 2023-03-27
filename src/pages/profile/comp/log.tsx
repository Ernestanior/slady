import React, {FC, useCallback} from "react";
import Template from "@/common/template";
import {Input, TableColumnProps, Tooltip} from "antd";
import FormItem from "@/common/Form/formItem";
import {accessLogService} from "@/store/apis/log";

const AccessLog:FC = () => {
    const query = useCallback((data) => {
        return accessLogService.FindAccessLog({}, data)
    }, [])
    return <Template
        filter={<FormItem span={5} noStyle name="keyWord">
            <Input allowClear />
        </FormItem>}
        queryData={query}
        columns={columns}
        rowKey="id"
    />
}
export default AccessLog;

const columns: TableColumnProps<any>[] = [
    {
        title:"User Agent",
        dataIndex: "userAgent",
        ellipsis: {
            showTitle: false,
        },
        render: (address) => (
            <Tooltip placement="topLeft" title={address}>
                {address}
            </Tooltip>
        ),
    },
    {
        title: "Access On",
        dataIndex: "accessTime",
    },
    {
        title: "Login IP",
        dataIndex: "clientIp",
        width:130
    },
    {
        title: "Country",
        dataIndex: "region",
        width:100
    },

];
