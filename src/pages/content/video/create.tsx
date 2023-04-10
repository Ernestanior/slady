import React, {FC, useState} from "react";
import FormItem from "@/common/Form/formItem";
import {Button, Col, Form, Input, Modal, Row, Upload} from "antd";
import {useForm} from "antd/es/form/Form";
import {PaperClipOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import {videoService} from "@/store/apis/content";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    classificationId:string;
}
const CreateVideo:FC<IProps> = ({onOk,visible,classificationId}) => {
    const [form] = useForm()
    const [imgList,setImgList] = useState<UploadFile[]>([])
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        setLoading(true)
        const videoForm = form.getFieldsValue()
        const formData = new FormData()
        fileList.forEach(file => {
            formData.append('videoFile', file as RcFile);
        });
        imgList.forEach(img => {
            formData.append('imageFile', img as RcFile);
        });
        formData.append('description', videoForm.description || "");
        formData.append('title', videoForm.title || "" );
        formData.append('classificationId', classificationId);
        setLoading(true)
        const res = await request(videoService.VideoCreate({}, formData as any))
        setLoading(false)
        if (res.isSuccess){
            form.resetFields()
            setImgList([])
            reloadMainList();
            onOk()
        }
    }
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Create Video</div>}
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
            <FormItem name="description" label="Description">
                <Input />
            </FormItem>
            <Row gutter={15} style={{marginTop:20,marginBottom:30}}>
                <Col>Video: </Col>
                <Col>
                    <Upload
                        onRemove={(file)=>{
                            const index = fileList.indexOf(file);
                            const newFileList = fileList.slice();
                            newFileList.splice(index, 1);
                            setFileList(newFileList);
                        }}
                        beforeUpload={(file)=>{
                            // setFileList([...fileList, file]);
                            setFileList([file]);
                            return false;
                        }}
                        maxCount={1}
                        fileList={fileList}>
                        <Button icon={<PaperClipOutlined />}/>
                        <span style={{marginLeft:10}}>(Maximum 500MB. Supported video format: mp4, m4v, mov)</span>
                    </Upload>
                </Col>
            </Row>
            <Row gutter={15} style={{marginTop:20,marginBottom:30}}>
                <Col>Image: </Col>
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

export default CreateVideo;
