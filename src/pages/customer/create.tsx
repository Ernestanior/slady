import React, {FC, useEffect, useState} from "react";
import {Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Switch, Upload} from "antd";
import {useForm} from "antd/es/form/Form";
import {PaperClipOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import {customerService} from "@/store/apis/account";
import {classificationService} from "@/store/apis/content";
import {from} from "rxjs";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";

interface IProps{
    visible:boolean;
    onOk:()=>void;
}
const CreateCustomer:FC<IProps> = ({onOk,visible}) => {
    const [form] = useForm()
    const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const [subs,setSubs]=useState<any[]>([])
    useEffect(()=>{
        const config = classificationService.ClassList({}, {
            searchPage:{desc:0,page:0,pageSize:999,sort:""}
        })
        const sub = from(request(config)).subscribe((res:any) => {
            if(res.isSuccess){
                setSubs(res.result.content)
            }
        })
        return () => sub.unsubscribe()
    },[])
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onChange: any= (date:any, dateString:any) => {
        console.log(date, dateString);
    };
    const onFinish =async ()=>{
        const videoForm = form.getFieldsValue()
        console.log(videoForm)
        const formData = new FormData()
        imgList.forEach(img => {
            formData.append('profileImage', img as RcFile);
        });
        formData.append('email', videoForm.email || "");
        formData.append('password', videoForm.password || "");
        videoForm.birthday && formData.append('birthday', videoForm.birthday.format('YYYY-MM-DD') || "");
        formData.append('ic', videoForm.ic || "");
        formData.append('contact', videoForm.contact || "");
        formData.append('gender', videoForm.gender || "");
        formData.append('postCode', videoForm.postCode || "");
        formData.append('address', videoForm.address || "");
        formData.append('unitNumber', videoForm.unitNumber || "");
        formData.append('period', videoForm.period || "");
        formData.append('status', videoForm.status?"1":"0");
        videoForm.subscription && subs && subs.forEach((item:any,index:number)=>{
            formData.append(`subscriptionItemList[${index}].classificationId`,item.id)
            formData.append(`subscriptionItemList[${index}].status`,videoForm.subscription.includes(item.id)?'1':'0')
        })
        setLoading(true)
        const res = await request(customerService.CustomerCreate({}, formData as any))
        setLoading(false)
        if (res.isSuccess){
            form.resetFields()
            reloadMainList();
            onOk()
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
            <Form.Item name="email" label={<span className="login-label">Login Email</span>}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label={<span className="login-label">Password</span>}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="birthday" label={<span className="login-label">Birthday</span>}>
                <DatePicker onChange={onChange} />
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
            <Form.Item name="subscription" label="Subscriptions">
                <Checkbox.Group>
                    {subs.map((item)=><Checkbox key={item.id} value={item.id} defaultChecked={item.defaultStatus} disabled={!item.alterableFlag}>
                            {item.name}
                        </Checkbox>
                    )}
                </Checkbox.Group>
            </Form.Item>
            <Form.Item name="period" label="Period" >
                <InputNumber/>
            </Form.Item>
            <Form.Item name="status" label="Status" valuePropName="checked">
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
                        <span style={{marginLeft:10}}>(Supported image format: png, jpg, jpeg, svg)</span>
                    </Upload>
                </Col>
            </Row>
        </Form>
    </Modal>
}

export default CreateCustomer;
