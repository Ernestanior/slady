import FormItem from "@/common/Form/formItem";
import {Input, Select,DatePicker} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Query=()=>{
    const [t]=useTranslation()
    return <>
        <FormItem span={4} label={t("NAME")} name="name" >
            <Input/>
        </FormItem>
        <FormItem span={4} label={t("PHONE")} name="phone">
            <Input/>
        </FormItem>

    </>
}
export default Query
