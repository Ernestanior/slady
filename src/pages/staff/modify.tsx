import React, {FC, useEffect, useState} from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {userService} from "@/store/apis/account";
import {useTranslation} from "react-i18next";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const ModifyCustomer:FC<IProps> = ({onOk,visible,data}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    // const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {name,type} = newData
        if (name && type){
            setLoading(true)
            const res = await request(userService.ModifyUser({},newData))
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
        data && form.setFieldsValue({...data})
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
            <Form.Item name="id" hidden label={<span className="login-label">ID</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="name" label={<span className="login-label">{t("ACCOUNT")}</span>}>
                <Input />
            </Form.Item>
            {/*<Form.Item name="password" label={<span className="login-label">Password</span>}>*/}
            {/*    <Input.Password />*/}
            {/*</Form.Item>*/}

            <Form.Item name="type" label={<span className="login-label">{t("PERMISSION")}</span>}>
                <Select options={[
                    { value: 'ADMIN', label: t('BOSS') },
                    { value: 'SALER', label: t('SALER') },
                    { value: 'PRODUCTMANAGEMENT', label: t('PRODUCT_MANAGEMENT') },
                    { value: 'FINANCE', label: t('FINANCIAL') },
                    { value: 'LOGISTICS', label: t('KOREAN_LOGISTICS') },
                ]}/>
            </Form.Item>
        </Form>}
    </Modal>
}

export default ModifyCustomer;
