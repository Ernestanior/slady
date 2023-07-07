import React, {FC, useEffect, useState} from "react";
import FormItem from "@/common/Form/formItem";
import {Button, Col, Divider, Form, Input, Modal, Row, Select, Space, Upload} from "antd";
import {useForm} from "antd/es/form/Form";
import {PaperClipOutlined, PlusOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import {adminService} from "@/store/apis/account";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import SelectP from "@/common/select";
import ImageUpload from "@/pages/design/create/imageUpload";
import {typeList} from "@/pages/design";
import {designService} from "@/store/apis/item";
import {reqAndReload} from "@/common/utils";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const ModifyDesign:FC<IProps> = ({onOk,visible,data}) => {
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const formData = form.getFieldsValue()
        console.log({...formData,id:data.id})
        const config = designService.DesignModify({}, {...formData,id:data.id})
        setLoading(true)
        const res = await request(config)
        setLoading(false)
        if (res.isSuccess){
            onOk()
        }
    }
    useEffect(()=>{
        data && form.setFieldsValue(data)
    },[form,data])
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Modify</div>}
        visible={visible}
        onCancel={onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        zIndex={7000}
        width={600}
    >
        <Form form={form} className="email-new">
            <FormItem name="design" label="品名">
                <Input />
            </FormItem>
            <FormItem name="type" label="类别">
                <SelectP data={typeList}/>
            </FormItem>
            <FormItem name="purchasePrice" label="进货价">
                <Input />
            </FormItem>
            <FormItem name="salePrice" label="售价">
                <Input />
            </FormItem>
        </Form>
    </Modal>
}

export default ModifyDesign;
