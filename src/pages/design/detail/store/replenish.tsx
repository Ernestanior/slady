import React, {FC, useState} from "react";
import {Form, InputNumber, Modal, notification} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {orderService} from "@/store/apis/order";
import {useTranslation} from "react-i18next";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any
}
enum orderType{
    REPLENISH,
    ORDER
}
const Rpelenish:FC<IProps> = ({onOk,visible,data}) => {
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)
    const [t]=useTranslation()

    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {amount}=newData
        if (amount){
            setLoading(true)
            const config = orderService.OrderCreate({},{itemId:data.id,amount,type:orderType.REPLENISH,remark:'店补',paymentStatus:-1,status:"0"})
            const res = await request(config)
            setLoading(false)
            if (res.isSuccess){
                reloadMainList();
                onOk()
            }
        }
        else{
            notification.error({message:"PLEASE_COMPLETE"})
        }

    }
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>{t("SUPPLEMENT")}</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >

        <Form form={form} className="email-new" initialValues={{status:1,subscription:[1]}}>
            <Form.Item name="amount" label={<span className="login-label">{t('SUPPLEMENT')} {t('AMOUNT')}</span>}>
                <InputNumber min={0}/>
            </Form.Item>
        </Form>
    </Modal>
}

export default Rpelenish;
