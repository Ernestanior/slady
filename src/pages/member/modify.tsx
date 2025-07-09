import React, {FC, useEffect, useState} from "react";
import {DatePicker, Form, Input, InputNumber, Modal, notification} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {useTranslation} from "react-i18next";
import { memberService } from "@/store/apis/member";
import moment from "moment";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const ModifyMember:FC<IProps> = ({onOk,visible,data}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    
    // const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {name,phone,registrationDate,voucherNumber,remark}=newData
        if (name && phone && registrationDate && voucherNumber && remark){
            setLoading(true)
            console.log({id:data.id,...newData,registrationDate:registrationDate.format('YYYY-MM-DD')},'newData');

            const config = memberService.MemberModify({},{id:data.id,...newData,registrationDate:registrationDate.format('YYYY-MM-DD')})
            const res = await request(config)
            setLoading(false)
            if (res.isSuccess){
                reloadMainList();
                onOk()
            }
        }
        else{
            notification.error({message:t("PLEASE_COMPLETE")})
        }

    }
    useEffect(()=>{        
        data && form.setFieldsValue({...data,registrationDate:moment(data.registrationDate)})
    },[form,data])
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Modify</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
        {data && <Form form={form} className="email-new">
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
                <InputNumber />
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
        </Form>}
    </Modal>
}

export default ModifyMember;
