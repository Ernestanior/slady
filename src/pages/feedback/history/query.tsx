import FormItem from "@/common/Form/formItem";
import {DatePicker, Input, Select} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

const Query=()=>{
    const [t]=useTranslation()
    return <>
        <FormItem span={5} label={t('CODE')} name="design" >
            <Input/>
        </FormItem>
        <FormItem span={5} label={t('REMARK')} name="remark">
            <Input/>
        </FormItem>
        <FormItem span={5} label={t('STATUS')} name="status">
            <Select options={[{value:"1",label:'待定'},{value:"2",label:'OK'},{value:"3",label:'已发货'}]}/>
        </FormItem>
        <FormItem span={6} noStyle name="operateDate">
            <DatePicker.RangePicker placeholder={[t('STARTING_TIME'), t('ENDING_TIME')]} />
        </FormItem>
    </>
}
export default Query
