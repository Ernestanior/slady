import React, {FC, useEffect, useState} from "react";
import {Form, InputNumber, Modal, notification} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {itemService} from "@/store/apis/item";
import {useTranslation} from "react-i18next";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any
}
const CreateCustomer:FC<IProps> = ({onOk,visible,data}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    useEffect(()=>{
        data && form.setFieldsValue(data)
    },[form,data])
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {stock}=newData
        if (stock){
            setLoading(true)
            const config = itemService.ItemModifyStock({id:data.id,stock},{})
            const res = await request(config)
            setLoading(false)
            if (res.isSuccess){
                reloadMainList();
                onOk()
            }
        }
        else{
            notification.error({message:t('PLEASE_COMPLETE')})
        }

    }
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>{t('CREATE')}</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >

        <Form form={form} className="email-new" initialValues={{status:1,subscription:[1]}}>
            <Form.Item name="stock" label={<span className="login-label">{t('STOCK')}</span>}>
                <InputNumber />
            </Form.Item>
        </Form>
    </Modal>
}

export default CreateCustomer;
