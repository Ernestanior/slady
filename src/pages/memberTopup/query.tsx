import FormItem from "@/common/Form/formItem";
import {Input, Select,DatePicker} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Query=()=>{
    const [t]=useTranslation()
    return <>
        <FormItem span={4} label={t("MEMBER_NAME")} name="name" >
            <Input/>
        </FormItem>
        <FormItem span={4} label={t("VOUCHER_NUMBER")} name="voucherNumber">
            <Input/>
        </FormItem>

    </>
}
export default Query
