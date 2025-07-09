import React, {FC, useState} from "react";
import {DatePicker, Form, Input, Modal, notification} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {useTranslation} from "react-i18next";
import { memberService } from "@/store/apis/member";

interface IProps{
    visible:boolean;
    onOk:()=>void;
}
const CreateMember:FC<IProps> = ({onOk,visible}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)

    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {name,phone,registrationDate,voucherNumber,remark}=newData
        
        if (name && phone && registrationDate && voucherNumber && remark){
            setLoading(true)
            const config = memberService.MemberCreate({},{...newData,registrationDate:registrationDate.format('YYYY-MM-DD'),balance:0,membershipPackageTotal:0})
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
        title={<div style={{color:"#fff",fontWeight:550}}>{t("CREATE")}</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
        <Form form={form} className="email-new" initialValues={{status:1,subscription:[1]}}>
            <Form.Item name="name" label={<span className="login-label">{t('NAME')}</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="phone" label={<span className="login-label">{t('PHONE')}</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="registrationDate" label={<span className="login-label">{t('DATE')}</span>}>
                <DatePicker/>
            </Form.Item>
            <Form.Item name="voucherNumber" label={<span className="login-label">{t('VOUCHER_NUMBER')}</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="saler" label={<span className="login-label">{t('SALER')}</span>}>
                <Input />
            </Form.Item>
            {/* <Form.Item name="balance" label={<span className="login-label">{t('MEMBER_REMAINING_AMOUNT')}</span>}>
                <InputNumber />
            </Form.Item>
            <Form.Item name="membershipPackageTotal" label={<span className="login-label">{t('MEMBER_PACKAGE_TOTAL_AMOUNT')}</span>}>
                <InputNumber />
            </Form.Item> */}
            <Form.Item name="remark" label={<span className="login-label">{t('REMARK')}</span>}>
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}

export default CreateMember;
