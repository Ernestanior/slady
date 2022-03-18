import {FC, useCallback} from "react";
import Template from "@/common/template";
import {TableColumnProps} from "antd";
import {accessLogService} from "@/store/apis/log";

const LoginRecord:FC = () => {
    const query = useCallback((data) => {
        return accessLogService.FindAccessLog({}, data);
    }, [])
    return <section>
        <p>登录记录</p>
        <Template
            queryData={query}
            columns={columns}
            rowKey="domain"
        />
    </section>
}

export default LoginRecord;

/**
 * 表格行
 */
export const columns: TableColumnProps<any>[] = [
    {
        title: "浏览器",
        dataIndex: "userAgent",
    },
    {
        title: "访问时间",
        dataIndex: "accessTime",
    },
    {
        title: "登录IP",
        dataIndex: "clientIp",
    },
];
