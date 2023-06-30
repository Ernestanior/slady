import React, {FC, useEffect, useState} from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {userService} from "@/store/apis/account";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const ModifyCustomer:FC<IProps> = ({onOk,visible,data}) => {
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
            notification.error({message:"请填写完整"})
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
        okText={'Save'}
        cancelText={'Cancel'}
        width={600}
    >
        {data && <Form form={form} className="email-new">
            <Form.Item name="id" hidden label={<span className="login-label">ID</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="name" label={<span className="login-label">账号</span>}>
                <Input />
            </Form.Item>
            {/*<Form.Item name="password" label={<span className="login-label">Password</span>}>*/}
            {/*    <Input.Password />*/}
            {/*</Form.Item>*/}

            <Form.Item name="type" label={<span className="login-label">权限</span>}>
                <Select options={[
                    { value: 'admin', label: '老板' },
                    { value: 'saler', label: '销售员工' },
                    { value: 'operator', label: '后台人员' },
                    { value: 'kr-logistics', label: '韩国物流' },
                ]}/>
            </Form.Item>
        </Form>}
    </Modal>
}

export default ModifyCustomer;
