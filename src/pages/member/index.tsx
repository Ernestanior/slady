import {FC, useMemo, useState} from "react";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import {reqAndReload} from "@/common/utils";
import msgModal from "@/store/message/service";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {notification} from "antd";
import { memberService } from "@/store/apis/member";
import { INormalEvent } from "@/common/interface";
import CreateMember from "./create";
import ModifyMember from "./modify";
import MemberDetail from "./detail";
import TopUpRecord from "./topup";
import Query from "./query";
import useAccountInfo from "@/store/account";
import { E_USER_TYPE } from "@/store/account/interface";

const OrderList: FC = () => {
    const [t]=useTranslation()
    const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()
    const [page,setPage]=useState<string>('list')
    const [reload,setReload]=useState<boolean>(false)
    const [topUpFlag,setTopUpFlag]=useState<boolean>(false)
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
        ];
    }, [t]);
    
    const columns = [
        {
            dataIndex: "name",
            title: t('NAME'),
        },
        {
            dataIndex: "phone",
            title: t('PHONE'),
        },
        {
            dataIndex: "registrationDate",
            title: t('Date'),
            render:(value:string)=>moment(value).format("YYYY-MM-DD")
        },
        {
            dataIndex: "voucherNumber",
            title: t('VOUCHER_NUMBER'),
        },
        {
            dataIndex: "balance",
            title:  t('MEMBER_REMAINING_AMOUNT'),
        },
    ]
    
    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: t("PURCHASE_RECORD"),
                    event: async (data)=> {
                        await setSelectData(data)
                        setPage('detail')
                    },
                },
                {
                    text: t("EDIT"),
                    event(data) {
                        setSelectData(data)
                        setEditFlag(true)
                    },
                },
                {
                    text: t("TOP_UP"),
                    event(data) {                        
                        setSelectData(data)
                        setTopUpFlag(true)
                    },
                },
                {
                    hide: () => userInfo?.type ===E_USER_TYPE.SALER,
                    text:t("DELETE"),
                    event(data) {
                        const value = {
                            title: t("DELETE"),
                            content: `${t("CONFIRM")}${t("DELETE")}: ${data.name} ？`,
                            onOk: () => {
                                const config = memberService.MemberDelete({},[data.id])
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [t])
    return (page==='detail'?
        <MemberDetail data={selectData} onReturn={()=>{setPage('list');setReload(!reload)}}/>:
        <section>

            <Template
                filter={<Query/>}
                columns={columns}
                optList={options}
                event={buttons}
                queryData={data=> memberService.MemberList({},{...data})}
                rowKey="id"/>
                <CreateMember onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateMember>
                <ModifyMember onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyMember>
                <TopUpRecord onOk={()=>setTopUpFlag(false)} visible={topUpFlag} data={selectData}></TopUpRecord>

        </section>
    );
};


export default OrderList;

