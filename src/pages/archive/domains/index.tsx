import React, {FC, useCallback} from "react";
import Template from "@/common/template";
import {domainService} from "@/store/apis/site";
import {Button, Input, TableColumnProps} from "antd";
import ArchiveDomainFilter from "@/pages/archive/domains/filters";
import ArchiveDomainFilterMobile from "@/pages/archive/domains/filterMobile";
import FormItem from "@/common/Form/formItem";
import isMobile from "@/app/isMobile";
import msgModal from "@/store/message/service";
import View from "@/common/popup/view";

const ArchiveDomains:FC = () => {
    const query = useCallback((data) => {
        return domainService.FindDomain({}, {...data, deleted: 1})
    }, [])
    return <Template
        filter={isMobile?<ArchiveDomainFilterMobile />:<ArchiveDomainFilter />}
        queryData={query}
        columns={isMobile?columnMobile:columns}
        rowKey="domain"
        primarySearch={primarySearch}
    />
}

export default ArchiveDomains;

/**
 * 表格行
 */
const columnMobile : TableColumnProps<any>[] = [
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
        title: "操作",
        dataIndex: "opt",
        render(_:any, data:any){
            return <Button onClick={() => {
                    if (data) {
                        const {
                            displayName,
                            siteName,
                            upstream,
                            customerName,
                            createDate,
                        } = data
                        const dataList=[
                            {label:'主机记录值',content:displayName},
                            {label:'站点名称',content:siteName},
                            {label:'源点',content:upstream.split(" ").filter((item:any)=>item).join(", ")},
                            {label:'客户名称',content:customerName},
                            {label:'创建时间',content:createDate},
                        ]
                        const value = {
                            node: <View dataList={dataList}/>,
                        }
                        msgModal.createEvent("popup", value)
                    }
                }}>查看</Button>
        }
    }
]
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
const primarySearch=<>
    <FormItem noStyle name="displayName" >
        <Input style={{width:"70vw"}} placeholder="主机记录值" allowClear/>
    </FormItem>
</>
