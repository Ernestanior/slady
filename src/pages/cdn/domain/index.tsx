import {FC, useCallback} from "react";
import Template from "@/common/template";
import {domainService} from "@/store/apis/site";
import {Button, Input, Row, Space, TableColumnProps} from "antd";
import CDNDomainFilter from "@/pages/cdn/domain/filters";
import CDNDomainFilterMobile from "@/pages/cdn/domain/filterMobile";
import IconFont from "@/common/icon";
import FormItem from "@/common/Form/formItem";
import isMobile from "@/app/isMobile";
import msgModal from "@/store/message/service";

const CDNDomains:FC = () => {
    const query = useCallback((data) => {
        return domainService.FindDomain({}, data)
    }, [])
    return <Template
        filter={isMobile?<CDNDomainFilterMobile/>:<CDNDomainFilter />}
        queryData={query}
        primarySearch={primarySearch}
        columns={isMobile?columnMobile:columns}
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


const columnMobile: TableColumnProps<any>[] = [
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
            return <Space>
                <Button onClick={() => {
                    if (data) {
                        const {
                            displayName,
                            siteName,
                            upstream,
                            sslEnable,
                            sslAuto,
                            dnsStatus,
                            customerName
                        } = data
                        const value = {
                            node: <section>
                                <Row>主机记录值：{displayName}</Row>
                                <Row>站点名称：{siteName}</Row>
                                <Row>源点：{upstream.split(" ").filter((item:any)=>item).join(", ")}</Row>
                                <Row>SSL状态：{sslEnable === 1 ? <IconFont type="iconbaseline-check_box-px" />
                                    : <IconFont type="iconcheck_box" />}</Row>
                                <Row>灰域证书：{(sslAuto === 1 || sslAuto === 2) ? <IconFont type="iconbaseline-check_box-px" /> : <IconFont type="iconcheck_box" />}</Row>
                                <Row>dns状态：{dnsStatus === 1 ?
                                    <IconFont type="iconbaseline-check_box-px" />
                                    : <IconFont type="iconcheck_box" />}</Row>
                                <Row>客户名称：{customerName}</Row>
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
const primarySearch=<>
    <FormItem noStyle name="displayName" >
        <Input style={{width:"70vw"}} placeholder="主机记录值" allowClear/>
    </FormItem>
</>
