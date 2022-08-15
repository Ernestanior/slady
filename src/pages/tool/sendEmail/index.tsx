import {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import {Input, notification, TableColumnProps} from "antd";
import SendEmailFilter from "./filters";
import SendEmailFilterMobile from "./filterMobile";
import {reqAndReload} from "@/common/utils";
import {IBatchEvent, INormalEvent} from "@/common/interface";
import {emailService} from "@/store/apis/tool";
import historyService from "@/store/history";
import {IEmail} from "@/store/apis/tool/email";
import FormItem from "@/common/Form/formItem";
import isMobile from "@/app/isMobile";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";

const SendEmail:FC = () => {
    const query = useCallback((data) => {
        const startDate = data.date && data.date[0].format('YYYY/MM/DD')
        const endDate = data.date && data.date[1].format('YYYY/MM/DD')
        return emailService.EmailList({...data,startDate,endDate})
    }, [])

    const deleteEmail= (email:IEmail[])=>{
        const ids = email.map(item=>item.id)
        const config = emailService.EmailDelete(ids)
        reqAndReload(config)
    }
    const buttons: INormalEvent[] = useMemo(()=> {
        return [{
            text: '新增邮件',
            primary: true,
            event(){
                if(isMobile){
                    notification.error({message:"手机端无法使用该功能"})
                    return
                }
                historyService.push("/email/create")
            }
        }]
    }, [])

    const batchButtons: IBatchEvent[] = useMemo(()=> {
        return [{
            text: '批量删除',
            event(selectIds){
                const value = {
                    title: "删除",
                    content: `你确定删除邮件 ID：${selectIds}`,
                    onOk: () => reqAndReload(emailService.EmailDelete(selectIds))
                }
                msgModal.createEvent("modal", value)
            }
        }]
    }, [])

    const opt: IOperationConfig =  useMemo(() => {
        return [
            {
                text:"查看",
                event:(data)=> historyService.push("/email/" + data.id)
            },
            {
                text: "删除",
                event(data) {
                    // deleteCustomer(data);
                    const value = {
                        title: "删除",
                        content: `你确定删除邮件 ID：${data.id}`,
                        onOk: () => deleteEmail([data])
                    }
                    msgModal.createEvent("modal", value)
                },
            }
        ]
    }, [])

    return <Template
        filter={isMobile?<SendEmailFilterMobile />:<SendEmailFilter />}
        event={buttons}
        batchEvent={batchButtons}
        queryData={query}
        columns={isMobile?columnMobile:columns}
        optList={opt}
        rowKey="id"
        primarySearch={primarySearch}
    />
}

export default SendEmail;

export const columnMobile: TableColumnProps<any>[] = [
    {
        title: "ID",
        dataIndex: "id",
        width: 50,
        sorter: true,
    },
    {
        title: "标题",
        dataIndex: "title",
        width: 130,
        sorter: true,
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
        title: "标题",
        dataIndex: "title",
        sorter: true,
    },
    {
        title: "发送者",
        dataIndex: "sender",
        sorter: true,
    },
    {
        title: "创建时间",
        dataIndex: "createDate",
    }
];
const primarySearch=<>
    <FormItem noStyle name="title" >
        <Input style={{width:"70vw"}} placeholder="标题" allowClear/>
    </FormItem>
</>