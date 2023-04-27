import React, {FC, useEffect, useState} from "react";
import {DatePicker, Form, Input, Modal, Select, Switch} from "antd";
import {useForm} from "antd/es/form/Form";
import {customerService} from "@/store/apis/account";
import moment from "moment";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";

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
        // const formData = new FormData()
        // imgList.forEach(img => {
        //     formData.append('profileImage', img as RcFile);
        // });
        // formData.append('id', data.id+'');
        // formData.append('email', videoForm.email);
        // formData.append('password', videoForm.password);
        // formData.append('birthday', videoForm.birthday);
        // formData.append('ic', videoForm.ic);
        // formData.append('contact', videoForm.contact);
        // formData.append('postCode', videoForm.postCode);
        // formData.append('address', videoForm.address);
        // formData.append('unitNumber', videoForm.unitNumber);
        // formData.append('status', videoForm.status===true?"1":"0");
        // formData.append('subscriptionItemList', JSON.stringify(videoForm.subscription));
        setLoading(true)
        console.log(newData)
        const res = await request(customerService.CustomerModify({}, {...newData,id:data.id,probationStatus:newData.probationStatus?1:0}))
        setLoading(false)
        if (res.isSuccess){
            reloadMainList();
            onOk()
        }
    }
    useEffect(()=>{
        console.log(data)
        data && form.setFieldsValue({...data,birthday:moment(data.birthday)})
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
            <Form.Item name="email" label={<span className="login-label">Login Email</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="birthday" label={<span className="login-label">Birthday</span>}>
                <DatePicker />
            </Form.Item>
            <Form.Item name="gender" label={<span className="login-label">Gender</span>}>
                <Select options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                ]}/>
            </Form.Item>
            <Form.Item name="ic" label={<span className="login-label">NRIC No.</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="contact" label={<span className="login-label">Contact No.</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="postCode" label={<span className="login-label">Post Code</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="address" label={<span className="login-label">Address</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="unitNumber" label={<span className="login-label">unitNumber</span>}>
                <Input />
            </Form.Item>
            {/*<Form.Item name="planId" label="Plan">*/}
            {/*    <Select options={[{value:1,label:'monthly'},*/}
            {/*        {value:2,label:'quarterly'},*/}
            {/*        {value:3,label:'yearly'}]}/>*/}
            {/*</Form.Item>*/}
            {/*<Form.Item name="discountId" label="Discount" >*/}
            {/*    <Select options={[{value:0,label:'-'},*/}
            {/*        {value:1,label:'90% discount'},*/}
            {/*        {value:2,label:'80% discount'}]}/>*/}
            {/*</Form.Item>*/}
            <Form.Item name="status" valuePropName="checked" label="Status" >
                <Switch/>
            </Form.Item>
            <Form.Item name="probationStatus" label="ProbationStatus" valuePropName="checked">
                <Switch/>
            </Form.Item>
        </Form>}
    </Modal>
}

export default ModifyCustomer;
