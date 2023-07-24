import React, {FC, useState} from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {userService} from "@/store/apis/account";

interface IProps{
    visible:boolean;
    onOk:()=>void;
}
const CreateCustomer:FC<IProps> = ({onOk,visible}) => {
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
        console.log(newData)
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
            notification.error({message:"请填写完整"})
        }

    }
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Create</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        width={600}
    >
        <Form form={form} className="email-new" initialValues={{status:1,subscription:[1]}}>
            <Form.Item name="name" label={<span className="login-label">账号</span>}>
                <Input />
            </Form.Item>
            {/*<Form.Item name="password" label={<span className="login-label">Password</span>}>*/}
            {/*    <Input.Password />*/}
            {/*</Form.Item>*/}

            <Form.Item name="type" label={<span className="login-label">权限</span>}>
                <Select options={[
                    { value: 'ADMIN', label: '老板' },
                    { value: 'SALER', label: '销售员工' },
                    { value: 'PRODUCTMANAGEMENT', label: '产品管理' },
                    { value: 'FINANCE', label: '财务' },
                    { value: 'LOGISTICS', label: '韩国物流' },
                ]}/>
            </Form.Item>
            <Form.Item name="password" label={<span className="login-label">密码</span>}>
                <Input.Password />
            </Form.Item>
        </Form>
    </Modal>
}

export default CreateCustomer;
