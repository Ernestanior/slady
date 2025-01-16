import {FC, useMemo} from "react";
import Template from "@/common/template";
import {useTranslation} from "react-i18next";
import { memberRecordService } from "@/store/apis/member";
import Query from "./query";


const MemberTopup: FC = () => {
    const [t]=useTranslation()
    
    const columns = useMemo(()=>[
        {
            dataIndex: "purchaseDate",
            title: t('DATE'),
        },
        {
            dataIndex: "memberName",
            title: t('MEMBER_NAME'),
        },
        {
            dataIndex: "voucherNumber",
            title: t('VOUCHER_NUMBER'),
        },
        {
            dataIndex: "sum",
            title: t('TOP_UP_AMOUNT'),
        },
        {
            dataIndex: "memberRemainingAmount",
            title: t('MEMBER_REMAINING_AMOUNT'),
        },
        {
            dataIndex: "remark",
            title: `${t('PAYMENT_DETAIL')}`,
        },
    ],[t])
    

    return (
        <section>
            <Template
                filter={<Query/>}
                columns={columns}
                queryData={query=> memberRecordService.MemberRecordList({},{...query,types:[1]})}
                rowKey="id"/>
        </section>
    );
};


export default MemberTopup;

