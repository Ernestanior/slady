import FormItem from "@/common/Form/formItem";
import {Input, Select,DatePicker} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Query=()=>{
    const [t]=useTranslation()
    return <>
        <FormItem span={4} label={t("OPERATOR")} name="userName">
            <Input/>
        </FormItem>
        <FormItem span={4} label={t("INTERFACE")} name="uri">
            <Input/>
        </FormItem>
        <FormItem span={6} noStyle name="operateDate">
            <DatePicker.RangePicker placeholder={[t("STARTING_TIME"), t("ENDING_TIME")]} />
        </FormItem>
    </>
}
export default Query
