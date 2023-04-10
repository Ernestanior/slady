import React, {FC, useState} from "react";
import FormItem from "@/common/Form/formItem";
import {Button, Col, Form, Input, Modal, Row, Upload} from "antd";
import {useForm} from "antd/es/form/Form";
import {PaperClipOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import {adminService} from "@/store/apis/account";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";

interface IProps{
    visible:boolean;
    onOk:()=>void;
}
const CreateAdmin:FC<IProps> = ({onOk,visible}) => {
    const [form] = useForm()
    const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const videoForm = form.getFieldsValue()
        const formData = new FormData()
        imgList.forEach(img => {
            formData.append('profileImage', img as RcFile);
        });
        formData.append('email', videoForm.email || "");
        formData.append('password', videoForm.password || "");
        setLoading(true)
        const res = await request(adminService.UserCreate({}, formData as any))
        setLoading(false)
        if (res.isSuccess){
            reloadMainList();
            form.resetFields();
            onOk()
        }
    }
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Create Admin</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        zIndex={7000}
        width={600}
    >
        <Form form={form} className="email-new">
            <FormItem name="email" label="Email">
                <Input />
            </FormItem>
            <FormItem name="password" label="Password">
                <Input.Password />
            </FormItem>
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

export default CreateAdmin;
