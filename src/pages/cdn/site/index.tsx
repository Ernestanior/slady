import {FC, useCallback} from "react";
import Template from "@/common/template";
import {siteService} from "@/store/apis/site";
import {Button, Input, Row, Space, TableColumnProps} from "antd";
import CDNSiteListFilter from "@/pages/cdn/site/filters";
import CDNSiteListFilterMobile from "@/pages/cdn/site/filterMobile";
import {E_USER_STATUS_COLUMN} from "@/pages/customerList";
import isMobile from "@/app/isMobile";
import FormItem from "@/common/Form/formItem";
import Status from "@/common/status";
import {E_COLOR} from "@/common/const";
import msgModal from "@/store/message/service";

const CDNSiteList:FC = () => {
    const query = useCallback((data) => {
        return siteService.FindSite({}, data)
    }, [])

    return <Template
        filter={isMobile?<CDNSiteListFilterMobile/>:<CDNSiteListFilter />}
        primarySearch={primarySearch}
        queryData={query}
        columns={isMobile?columnMobile:columns}
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

const columnMobile: TableColumnProps<any>[] = [
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
        title: "操作",
        dataIndex: "opt",
        render(_:any, data:any){
            return <Space>
                <Button onClick={() => {
                    if (data) {
                        const {
                            name,
                            customerName,
                            type,
                            records,
                            uniqueName,
                            upstream,
                            status
                        } = data
                        const value = {
                            node: <section>
                                <Row>站点名称：{name}</Row>
                                <Row>客户名称：{customerName}</Row>
                                <Row>站点类型：{type}</Row>
                                <Row>记录数：{records}</Row>
                                <Row>UniqueName：{uniqueName}</Row>
                                <Row>源点：{upstream.split(" ").filter((item:any)=>item).join(", ")}</Row>
                                <Row>站点状态：{status === 1?<Status color={E_COLOR.enable}>正式</Status>:<Status color={E_COLOR.disable}>禁用</Status>}</Row>
                            </section>,
                        }
                        msgModal.createEvent("popup", value)
                    }
                }}>查看</Button>
            </Space>
        }
    }
]
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
const primarySearch=<>
    <FormItem noStyle name="siteName" >
        <Input style={{width:"70vw"}} placeholder="站点名称" allowClear/>
    </FormItem>
</>
