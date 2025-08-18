import React, { FC, useState } from "react";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/lib/form/Form";
import SelectP from "@/common/select";
import { colorList, size } from "@/pages/design/create";
import historyService from "@/store/history";
import { printService } from "@/store/apis/print";
import request from "@/store/request";

const Barcode: FC = () => {
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
                <FormItem name="code" label={t('CODE')}>
                    <Input placeholder="code" style={{ width: 200 }} ></Input>

                </FormItem>
                <FormItem name="color" label={t('COLOR')}>
                    <SelectP data={colorList} style={{ width: 200 }} />
                </FormItem>
                <FormItem name="size" label={t('SIZE')}>
                    <SelectP data={size} style={{ width: 200 }} />
                </FormItem>
                <FormItem name="salePrice" label={t('PRICE')}>
                    <Input placeholder="price" style={{ width: 200 }} ></Input>
                </FormItem>
            </Form>

            <div>
                <Button type="primary" style={{ marginRight: 20 }} onClick={onPrint}>{t('CONFIRM')}</Button>
                <Button onClick={() => form.resetFields}>{t('RESET')}</Button>
            </div>
        </>
    );
};


export default Barcode;
