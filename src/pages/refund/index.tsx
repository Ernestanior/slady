import  {FC, useMemo} from "react";
import Template from "@/common/template";
import {useTranslation} from "react-i18next";
import { memberRecordService } from "@/store/apis/member";
import { IOperationConfig } from "@/common/template/interface";
import { reqAndReload } from "@/common/utils";
import { notification } from "antd";
import msgModal from "@/store/message/service";



const Refund:FC = () => {  
      
    const {t}=useTranslation()

    const columns = [
        {
            dataIndex: "designs",
            title: t('ITEM'),
            render:(data:any)=>{
                return data?.map((item:any)=><div>
                    <div>{item?.designCode}: ${item?.price}</div>
                </div>)
            }
        },
        {
            dataIndex: "purchaseDate",
            title: t('DATE'),
        },
        {
            dataIndex: "saler",
            title: t('SALER'),
        },
        {
            dataIndex: "member",
            title: t('MEMBER'),
            render:(value:any,item:any)=><div>
                <span>{item.memberName} {item.memberPhone}</span>
            </div>
        },
        {
            dataIndex: "sum",
            title: t('TOTAL_AMOUNT'),
        },
        {
            dataIndex: "memberRemainingAmount",
            title: t('MEMBER_REMAINING_AMOUNT'),
        },
        {
            dataIndex: "remark",
            title: `${t('PAYMENT_DETAIL')}/${t('REFUND_REASON')}`,
        },
    ]
    
    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text:t("DELETE"),
                    event(data) {
                        const value = {
                            title: t("DELETE"),
                            content: `${t("CONFIRM")}${t("DELETE")}: ${data.name} ？`,
                            onOk: () => {
                                const config = memberRecordService.MemberRecordDelete({},[data.id])
                                reqAndReload(config, () => {
                                    notification.success({message: "Delete Success"})
                                });
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [t])

    return <section className="member-detail">
        <Template
            columns={columns}
            // optList={options}
            queryData={query=> memberRecordService.MemberRecordList({},{...query,refund:1})}
            rowKey="id"
        />
    </section>
}

export default Refund;



