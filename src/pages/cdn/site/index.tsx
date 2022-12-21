import React, {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import {siteService} from "@/store/apis/site";
import {Input, TableColumnProps} from "antd";
import CDNSiteListFilter from "@/pages/cdn/site/filters";
import CDNSiteListFilterMobile from "@/pages/cdn/site/filterMobile";
import {E_USER_STATUS_COLUMN} from "@/pages/customerList";
import isMobile from "@/app/isMobile";
import FormItem from "@/common/Form/formItem";
import Status from "@/common/status";
import {E_COLOR} from "@/common/const";
import msgModal from "@/store/message/service";
import View from "@/common/popup/view";
import {IOperationConfig} from "@/common/template/interface";
import historyService from "@/store/history";

const CDNSiteList:FC = () => {
    const query = useCallback((data) => {
        return siteService.FindSite({}, data)
    }, [])
    const options: IOperationConfig = useMemo(() => {
        const option:IOperationConfig = [
            {
                text: "性能统计",
                event(data) {
                    historyService.push(`/cdn/siteList/perform-sta/${data.id}`)
                }
            },
            {
                text: "防御统计",
                event(data) {
                    historyService.push(`/cdn/siteList/defend-sta/${data.id}`)
                }
            },
        ]
        if (isMobile){
            option.unshift({
                text: "查看",
                event(data) {
                        const {
                            name,
                            customerName,
                            type,
                            records,
                            uniqueName,
                            upstream,
                            status
                        } = data
                        const dataList=[
                            {label:'站点名称',content:name},
                            {label:'客户名称',content:customerName},
                            {label:'站点类型',content:type},
                            {label:'记录数',content:records},
                            {label:'UniqueName',content:uniqueName},
                            {label:'源点',content:upstream.split(" ").filter((item:any)=>item).join(", ")},
                            {label:'站点状态',content:status === 1?<Status color={E_COLOR.enable}>正式</Status>:<Status color={E_COLOR.disable}>禁用</Status>},
                        ]
                        const value = {
                            node: <View dataList={dataList} />,
                        }
                        msgModal.createEvent("popup", value)
                }
            })
        }
        return option
    }, [])

    return <Template
        filter={isMobile?<CDNSiteListFilterMobile/>:<CDNSiteListFilter />}
        primarySearch={primarySearch}
        queryData={query}
        optList={options}
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
        width:150
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
        width:150
    }]
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
