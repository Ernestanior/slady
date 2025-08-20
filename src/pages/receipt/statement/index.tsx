import React, { FC, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/lib/form/Form";
import SelectP from "@/common/select";
import { colorList, size } from "@/pages/design/create";
import historyService from "@/store/history";
import request from "@/store/request";
import { printService } from "@/store/apis/print";
import { saler } from "../invoice";
import moment from "moment";

 const counter = ['SL Studio', 'Slady Fashion']
const Statement: FC = () => {
    const [t] = useTranslation()
    const [form] = useForm()


    const onPrint = async() => {
        const data = form.getFieldsValue()
        await request(printService.PrintDailyReport({},{...data,shop:"Slady Studio Pte. Ltd.",date:moment(data.date).format('YYYY-MM-DD')}))
    }


    return (
        <>
        <Button onClick={()=>historyService.goBack()} style={{marginBottom:20}}>{'<'} {t('BACK')}</Button>
            <Form form={form} className="email-new" initialValues={{
                counter: counter[0], saler: saler[0]
            }}>
                <FormItem name="counter" label={t('COUNTER')}>
                    <SelectP data={counter} style={{ width: 200 }} />
                </FormItem>
                <FormItem name="saler" label={t('CASHIER')}>
                    <SelectP data={saler} style={{ width: 200 }} />
                </FormItem>
                <FormItem name="date" label={t('DATE')}>
                    <DatePicker></DatePicker>
                </FormItem>

            </Form>

            <div>
                <Button type="primary" style={{ marginRight: 20 }} onClick={onPrint}>{t('CONFIRM')}</Button>
                <Button onClick={() => form.resetFields}>{t('RESET')}</Button>
            </div>
        </>
    );
};


export default Statement;
