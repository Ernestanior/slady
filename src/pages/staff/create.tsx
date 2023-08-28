import React, {FC, useState} from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {userService} from "@/store/apis/account";
import {useTranslation} from "react-i18next";

interface IProps{
    visible:boolean;
    onOk:()=>void;
}
const CreateCustomer:FC<IProps> = ({onOk,visible}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)
    // useEffect(()=>{
    //     const config = classificationService.ClassList({}, {
    //         searchPage:{desc:0,page:0,pageSize:999,sort:""}
    //     })
    //     const sub = from(request(config)).subscribe((res:any) => {
    //         if(res.isSuccess){
    //             setSubs(res.result.content)
    //         }
    //     })
    //     return () => sub.unsubscribe()
    // },[])
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {name,type,password}=newData
        if (name && type && password){
            setLoading(true)
            const config = userService.CreateUser({},newData)
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
        title={<div style={{color:"#fff",fontWeight:550}}>Create</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
        <Form form={form} className="email-new" initialValues={{status:1,subscription:[1]}}>
            <Form.Item name="name" label={<span className="login-label">{t('ACCOUNT')}</span>}>
                <Input />
            </Form.Item>
            {/*<Form.Item name="password" label={<span className="login-label">Password</span>}>*/}
            {/*    <Input.Password />*/}
            {/*</Form.Item>*/}

            <Form.Item name="type" label={<span className="login-label">{t('PERMISSION')}</span>}>
                <Select options={[
                    { value: 'ADMIN', label: t('BOSS') },
                    { value: 'SALER', label: t('SALER') },
                    { value: 'PRODUCTMANAGEMENT', label: t('PRODUCT_MANAGEMENT') },
                    { value: 'FINANCE', label: t('FINANCIAL') },
                    { value: 'LOGISTICS', label: t('KOREAN_LOGISTICS') },
                ]}/>
            </Form.Item>
            <Form.Item name="password" label={<span className="login-label">{t('PASSWORD')}</span>}>
                <Input.Password />
            </Form.Item>
        </Form>
    </Modal>
}

export default CreateCustomer;
