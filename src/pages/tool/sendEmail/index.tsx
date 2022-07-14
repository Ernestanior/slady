import {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import {Button, Space, TableColumnProps} from "antd";
import SendEmailFilter from "./filters";
import ConfirmButton from "@/common/confirm/button";
import {reqAndReload} from "@/common/utils";
import {IBatchEvent, INormalEvent} from "@/common/interface";
import {emailService} from "@/store/apis/tool";
import historyService from "@/store/history";
import {IEmail} from "@/store/apis/tool/email";

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
                historyService.push("/email/create")
            }
        }]
    }, [])

    const batchButtons: IBatchEvent[] = useMemo(()=> {
        return [{
            text: '批量删除',
            event(selectIds){
                const config = emailService.EmailDelete(selectIds)
                reqAndReload(config)
            }
        }]
    }, [])

    const opt = useMemo(() => {
        return [
            ...columns,
            {
                title: "操作",
                dataIndex: "opt",
                width: 200,
                render(_:any, data:any){
                    return <Space>
                        <Button onClick={() => { historyService.push("/email/" + data.id) }}>查看</Button>
                        <ConfirmButton info={`确定删除此邮件？`} submit={() => { deleteEmail([data]) }}>删除</ConfirmButton>
                    </Space>}
            }
        ]
    }, [])

    return <Template
        filter={<SendEmailFilter />}
        event={buttons}
        batchEvent={batchButtons}
        queryData={query}
        columns={opt}
        rowKey="id"
    />
}

export default SendEmail;

/**
 * 表格行
 */
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
    },
    {
        title: "收件人数",
        dataIndex: "toListCount",
    }
];
