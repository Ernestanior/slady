import React, { FC, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/lib/form/Form";
import SelectP from "@/common/select";
import { colorList, size } from "@/pages/design/create";
import historyService from "@/store/history";
import { printService } from "@/store/apis/print";
import request from "@/store/request";

const Create: FC = () => {
    const [t] = useTranslation()
    const [form] = useForm()


    const onPrint = async() => {
        const data = form.getFieldsValue()
         await request(printService.PrintLabel({},data))
        
    }


    return (
        <>
        <Button onClick={()=>historyService.goBack()} style={{marginBottom:20}}>{'<'} {t('BACK')}</Button>
            <Form form={form} className="email-new" initialValues={{
                color: colorList[0], size: size[0]
            }}>
                <FormItem name="amount" label={t('AMOUNT')}>
                    <InputNumber min={0} placeholder="code" style={{ width: 200 }} ></InputNumber>
                </FormItem>
                <FormItem name="remark" label={t('REMARK')}>
                    <Input placeholder="price" style={{ width: 200 }} ></Input>
                </FormItem>
            </Form>

            <div>
                <Button type="primary" style={{ marginRight: 20 }} onClick={onPrint}>{t('CASH IN')}</Button>
                <Button type="primary" style={{ marginRight: 20 }} onClick={onPrint}>{t('CASH OUT')}</Button>
                <Button onClick={() => form.resetFields}>{t('RESET')}</Button>
            </div>
        </>
    );
};


export default Create;
