import React, {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import { Input, TableColumnProps} from "antd";
import ArchiveCustomerFilter from "@/pages/archive/customers/filters";
import ArchiveCustomerFilterMobile from "@/pages/archive/customers/filterMobile";
import {customerService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import FormItem from "@/common/Form/formItem";
import isMobile from "@/app/isMobile";
import msgModal from "@/store/message/service";
import {IOperationConfig} from "@/common/template/interface";
import View from "@/common/popup/view";

const ArchiveCustomer:FC = () => {
    const query = useCallback((data) => {
        return customerService.FindCustomer({}, {...data, deleted: 1, category: "biz"})
    }, [])

    const reOpenCustomer = useCallback((customer: any) => {
        const config = customerService.ReactivateCustomer({customerId: customer.id}, {});
        reqAndReload(config)
    }, [])

    const opt: IOperationConfig =  useMemo(() => {
        return [
            {
                text:"重启客户",
                event:(data)=>{
                    const value = {
                        title: "重启客户",
                        content: `你确定要重启客户：${data.name}`,
                        onOk: () => reOpenCustomer(data)
                    }
                    msgModal.createEvent("modal", value)
            }
            },
            {
                text:"查看",
                event:(data)=>{
                    if (data) {
                        const {
                            id,
                            name,
                            email,
                            creatorName,
                            createDate,
                            modifyDate,
                            autoDeletion
                        } = data
                        const dataList = [
                            {label:'ID',content:id},
                            {label:'用户名',content:name},
                            {label:'登录邮箱',content:email},
                            {label:'创建者',content:creatorName},
                            {label:'创建时间',content:createDate},
                            {label:'删除时间',content:modifyDate},
                            {label:'删除方式',content:autoDeletion?"自动删除":"手动删除"},
                        ]
                        const value = {
                            node: <View dataList={dataList}/>,
                        }
                        msgModal.createEvent("popup", value)
                    }
                }
            }
        ]
    }, [reOpenCustomer])

    return <Template
        filter={isMobile?<ArchiveCustomerFilterMobile />:<ArchiveCustomerFilter />}
        queryData={query}
        optList={opt}
        columns={isMobile?columnMobile:columns}
        rowKey="userId"
        primarySearch={primarySearch}
    />
}

export default ArchiveCustomer;

export const columnMobile: TableColumnProps<any>[] = [
    {
        title: "ID",
        dataIndex: "id",
        sorter: true,
        width:90
    },
    {
        title: "用户名",
        dataIndex: "name",
        sorter: true,
        width:130

    }
]
export const columns: TableColumnProps<any>[] = [
    {
        title: "ID",
        dataIndex: "id",
        width: 75,
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
    {
        title: "删除方式",
        dataIndex: "autoDeletion",
        render(value){
            if(value === 1){
                return "自动删除"
            }
            if(value === 0){
                return "手动删除"
            }
            return "-"
        }
    }
];
const primarySearch=<>
    <FormItem noStyle name="keyWord" >
        <Input style={{width:"70vw"}} placeholder="关键字" allowClear/>
    </FormItem>
</>
