import React, {FC, useRef, useState} from "react";
import {Button, DatePicker, Divider, Form, Input, InputNumber, InputRef, Modal, notification, Select, Space} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {userService} from "@/store/apis/account";
import {useTranslation} from "react-i18next";
import { memberRecordService, memberService } from "@/store/apis/member";
import { log } from "console";
import FormList from "antd/lib/form/FormList";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
let index=0
const TopUpRecord:FC<IProps> = ({onOk,visible,data}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)
    
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {amount,saler,remark}=newData
        
        if (amount && saler && remark){
            setLoading(true)
            const config = memberService.MemberTopUp({},{id:data.id,saler,balance:parseInt(amount),remark})
            
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
        title={<div style={{color:"#fff",fontWeight:550}}>{t("TOP_UP")}</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
        <Form form={form} className="email-new" initialValues={{status:1,subscription:[1]}}>
            <Form.Item name="amount" label={<span className="login-label">{t('AMOUNT')}</span>}>
                <InputNumber/>
            </Form.Item>
            <Form.Item name="saler" label={<span className="login-label">{t('SALER')}</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="remark" label={<span className="login-label">{t('PAYMENT_DETAIL')}</span>}>
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}

export default TopUpRecord;
