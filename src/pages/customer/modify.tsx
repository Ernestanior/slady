import React, {FC, useEffect, useState} from "react";
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select, Switch, Upload} from "antd";
import {useForm} from "antd/es/form/Form";
import {PaperClipOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
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
    const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        onOk()
    }
    const onFinish =async ()=>{
        const videoForm = form.getFieldsValue()
        const formData = new FormData()
        imgList.forEach(img => {
            formData.append('profileImage', img as RcFile);
        });
        formData.append('id', data.id+'');
        formData.append('email', videoForm.email);
        formData.append('password', videoForm.password);
        formData.append('birthday', videoForm.birthday);
        formData.append('ic', videoForm.ic);
        formData.append('contact', videoForm.contact);
        formData.append('postCode', videoForm.postCode);
        formData.append('address', videoForm.address);
        formData.append('unitNumber', videoForm.unitNumber);
        formData.append('status', videoForm.status===true?"1":"0");
        // formData.append('subscriptionItemList', JSON.stringify(videoForm.subscription));
        setLoading(true)
        const res = await request(customerService.CustomerModify({}, formData as any))
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
            <Form.Item name="status" valuePropName="checked" label="Status" >
                <Switch/>
            </Form.Item>
            <Row gutter={15} style={{marginTop:20,marginBottom:30}}>
                <Col>Profile Image</Col>
                <Col>
                    <Upload
                        onRemove={(file)=>{
                            const index = imgList.indexOf(file);
                            const newFileList = imgList.slice();
                            newFileList.splice(index, 1);
                            setImgList(newFileList);
                        }}
                        beforeUpload={(file)=>{
                            // setImgList([...imgList, file]);
                            setImgList([file]);
                            return false;
                        }}
                        fileList={imgList}
                        maxCount={1}>
                        <Button icon={<PaperClipOutlined />}/>
                    </Upload>
                </Col>
            </Row>
        </Form>}
    </Modal>
}

export default ModifyCustomer;
