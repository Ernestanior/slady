import React, {FC, useEffect, useState} from "react";
import FormItem from "@/common/Form/formItem";
import {Form, Input, Modal, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {typeList} from "@/pages/design";
import {designService} from "@/store/apis/item";
import {useTranslation} from "react-i18next";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const ModifyDesign:FC<IProps> = ({onOk,visible,data}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const formData = form.getFieldsValue()
        console.log({...formData,id:data.id})
        const config = designService.DesignModify({}, {...formData,id:data.id})
        setLoading(true)
        const res = await request(config)
        setLoading(false)
        if (res.isSuccess){
            onOk()
        }
    }
    useEffect(()=>{
        data && form.setFieldsValue(data)
    },[form,data])
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>{t('EDIT')}</div>}
        visible={visible}
        onCancel={onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
        <Form form={form} className="email-new">
            <FormItem name="design" label={t('ITEM_NAME')}>
                <Input />
            </FormItem>
            <FormItem name="type" label={t('TYPE')}>
                <Select options={typeList}/>
            </FormItem>
            <FormItem name="purchasePrice" label={t('PURCHASE_PRICE')}>
                <Input />
            </FormItem>
            <FormItem name="salePrice" label={t('SALE_PRICE')}>
                <Input />
            </FormItem>
            <FormItem name="remark" label={t('REMARK')}>
                <Input />
            </FormItem>
        </Form>
    </Modal>
}

export default ModifyDesign;
