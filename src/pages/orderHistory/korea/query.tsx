import FormItem from "@/common/Form/formItem";
import {DatePicker, Input} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Query=()=>{
    const [t]=useTranslation()
    return<>
        <FormItem span={5} label={t("CODE")} name="design" >
            <Input/>
        </FormItem>
        <FormItem span={5} label={t("REMARK")} name="remark">
            <Input/>
        </FormItem>
        <FormItem span={6} noStyle name="operateDate">
            <DatePicker.RangePicker placeholder={[t("STARTING_TIME"), t("ENDING_TIME")]} />
        </FormItem>
    </>
}
export default Query
