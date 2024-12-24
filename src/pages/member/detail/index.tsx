import  {FC, useMemo, useState} from "react";
import Template from "@/common/template";
import {useTranslation} from "react-i18next";
import { memberRecordService } from "@/store/apis/member";
import { IOperationConfig } from "@/common/template/interface";
import { reqAndReload } from "@/common/utils";
import { notification, Row } from "antd";
import msgModal from "@/store/message/service";
import { INormalEvent } from "@/common/interface";
import CreateMemberRecord from "./create";
// import ModifyMemberRecord from "./modify";
import { LeftOutlined } from "@ant-design/icons";

import './index.less'
import useAccountInfo from "@/store/account";
import { E_USER_TYPE } from "@/store/account/interface";
import RefundMemberRecord from "./refund";
interface IProps{
    data:any;
    onReturn:()=>void;
}

const MemberDetail:FC<IProps>  = ({data,onReturn}) => {  
      
    const {t}=useTranslation()
    const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [returnFlag,setReturnFlag]=useState<boolean>(false)
    // const [editFlag,setEditFlag]=useState<boolean>(false)
    // const [selectData,setSelectData] = useState<any>()
    const userInfo = useAccountInfo()

    const buttons: INormalEvent[] = useMemo(() => {
        return [
            {
                text: t("CREATE"),
                primary: true,
                event() {
                    setCreateFlag(true)
                },
            },
            {
                text: t("REFUND"),
                primary: true,
                event() {
                    setReturnFlag(true)
                },
            },
        ];
    }, [t]);
    
    const columns = [
        {
            dataIndex: "purchaseDate",
            title: t('DATE'),
        },
        {
            dataIndex: "designs",
            title: t('ITEM'),
            render:(data:any)=>{
                return data.map((item:any)=><div>
                    <div>{item.designCode}: ${item.price}</div>
                </div>)
                
            }
        },
        {
            dataIndex: "saler",
            title: t('SALER'),
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
                // {
                //     text: t("EDIT"),
                //     event(data) {                        
                //         setSelectData(data)
                //         setEditFlag(true)
                //     },
                // },
                {
                    text:t("DELETE"),
                    event(data) {
                        const value = {
                            title: t("DELETE"),
                            content: `${t("CONFIRM")}${t("DELETE")}: ${data.name} ？`,
                            onOk: () => {
                                const config = memberRecordService.MemberRecordDelete({},[data.id])
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [t])

    return <section className="member-detail">
            <div style={{marginBottom:10,cursor:"pointer",color:"#ee8d20",}} onClick={onReturn}><LeftOutlined />{t('RETURN')}</div>
         
        <div>
            <Row><span className="member-detail-label">Name 贵名：</span><span className="member-detail-value">{data.name}</span></Row>
            <Row><span className="member-detail-label">Phone 手机号码：</span><span className="member-detail-value">{data.phone}</span></Row>
            <Row><span className="member-detail-label">Date 日期： </span><span className="member-detail-value">{data.registrationDate}</span></Row>
            <Row><span className="member-detail-label">Voucher Number 编号：</span><span className="member-detail-value">{data.voucherNumber}</span></Row>
            <Row><span className="member-detail-label">Member Package Total Amount 会员配套总额：</span><span className="member-detail-value">{data.membershipPackageTotal}</span></Row>
            {/* <Row><span className="member-detail-label">Member Remaining Amount 会员余额：</span><span className="member-detail-value">{data.balance}</span></Row> */}
            <Row><span className="member-detail-label">Remark 备注：</span><span className="member-detail-value">{data.remark}</span></Row>
        </div>
        <Template
            columns={columns}
            optList={userInfo?.type===E_USER_TYPE.SALER?[]:options}
            event={buttons}
            queryData={query=> memberRecordService.MemberRecordList({},{memberId:data.id,...query})}
            rowKey="id"
        />
        <CreateMemberRecord onOk={()=>setCreateFlag(false)} visible={createFlag} data={data}></CreateMemberRecord>
        <RefundMemberRecord onOk={()=>setReturnFlag(false)} visible={returnFlag} data={data}></RefundMemberRecord>
        {/* <ModifyMemberRecord onOk={()=>{setEditFlag(false);}} visible={editFlag} data={selectData}></ModifyMemberRecord> */}

    </section>
}

export default MemberDetail



