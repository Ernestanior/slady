import React, {FC, useEffect, useState} from "react"
import {Form, Modal} from "antd";
import useMessage from "@/store/message";
import {useForm} from "antd/es/form/Form";
import {reqAndReload} from "@/common/utils";

const ModalF:FC = () => {
    const msg = useMessage()
    const [form] = useForm()
    const [value,setValue] = useState<any>()
    useEffect(()=>{
        if(msg && msg.type==="modalF"){
            setValue(msg.value)
            setVisible(true)
        }
    },[msg])
    useEffect(()=>{
        (value && value.data) ? form.setFieldsValue(value.data):form.resetFields()
    },[form,value])
    const [visible,setVisible]=useState<boolean>(false)

    const defaultCancel = () => setVisible(false)

    const onOk = ()=>{
        const data = form.getFieldsValue()
        const config = value.api({},value.data?{...data,id:value.data.id}:data)
        reqAndReload(config, () => {
            defaultCancel()
        });
        // value.onOk && value.onOk()
    }

    return value? <Modal
        title={<div style={{color:"#fff",fontWeight:550}}>{value.title}</div>}
            visible={visible}
            onCancel={value.onCancel || defaultCancel}
            onOk={onOk}
            okText={value.okText || 'Save'}
            cancelText={value.cancelText || 'Cancel'}
            zIndex={7000}
            width={value.width || 600}
        >
            <Form form={form} layout="vertical">
                {value.content}
            </Form>
        </Modal>:<></>
}

export default ModalF;
