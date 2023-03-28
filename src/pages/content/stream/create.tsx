import React, {FC, useState} from "react";
import FormItem from "@/common/Form/formItem";
import {Button, Col, Form, Input, Modal, Row, Upload} from "antd";
import {useForm} from "antd/es/form/Form";
import {PaperClipOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import {streamService} from "@/store/apis/content";
import request from "@/store/request";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    classificationId:string;
}
const CreateStream:FC<IProps> = ({onOk,visible,classificationId}) => {
    const [form] = useForm()
    const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        setLoading(true)
        const videoForm = form.getFieldsValue()
        const formData = new FormData()
        imgList.forEach(img => {
            formData.append('coverPage', img as RcFile);
        });
        formData.append('description', videoForm.description);
        formData.append('title', videoForm.title);
        formData.append('streamSource', videoForm.streamSource);
        formData.append('classificationId', classificationId);
        const res = await request(streamService.StreamCreate({}, formData as any))
        setLoading(false)
        if (res.isSuccess){
            onOk()
        }

    }
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Create Stream</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        zIndex={7000}
        width={600}
    >
        <Form form={form} className="email-new">
            <FormItem name="title" label="Title">
                <Input />
            </FormItem>
            <FormItem name="streamSource" label="Stream Source">
                <Input />
            </FormItem>
            <FormItem name="description" label="Description">
                <Input />
            </FormItem>
            <Row gutter={15} style={{marginTop:20,marginBottom:30}}>
                <Col>Cover Image: </Col>
                <Col>
                    <Upload
                        onRemove={(file)=>{
                            const index = imgList.indexOf(file);
                            const newFileList = imgList.slice();
                            newFileList.splice(index, 1);
                            setImgList(newFileList);
                        }}
                        beforeUpload={(file)=>{
                            setImgList([...imgList, file]);
                            return false;
                        }}
                        fileList={imgList}
                        maxCount={1}>
                        <Button icon={<PaperClipOutlined />}/>
                    </Upload>
                </Col>
            </Row>
        </Form>
    </Modal>
}

export default CreateStream;
