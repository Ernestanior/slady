import React, {FC, useEffect, useMemo, useState} from "react";
import {Form, Input, InputNumber, Modal, notification, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {orderType} from "../index";
import {orderService} from "@/store/apis/order";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {useTranslation} from "react-i18next";
import SelectP from "@/common/select";
import { colorList, size } from "@/pages/design/create";
interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const ModifyStatus:FC<IProps> = ({onOk,visible,data}) => {
    const [form] = useForm()
    const [t]=useTranslation()
    const [status,setStatus]=useState<string>()
    // const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        onOk()
    }
    

    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {color,size,salePrice,amount}=newData
        if (color && size && salePrice && amount) {
            setLoading(true)
            const res = await request(orderService.OrderModify({}, {...newData,id:data.id,}))
            setLoading(false)
            if (res.isSuccess){
                reloadMainList();
                onOk()
            }
        }else{
            notification.error({message:t("PLEASE_COMPLETE")})
        }

    }
    useEffect(()=>{
        if(data && data.status){
            form.setFieldsValue({...data})
            setStatus(data.status)
        }
        else{
            form.setFieldsValue({status:""})
            setStatus("")
        }
    },[form,data])

    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Modify</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
        {data && <Form form={form} className="email-new">
            <Form.Item name="color" label={<span className="login-label">{t("COLOR")}</span>}>
                <SelectP data={colorList} />
            </Form.Item>
             <Form.Item name="size" label={<span className="login-label">{t("SIZE")}</span>}>
                <SelectP data={size} />
            </Form.Item>
            <Form.Item name="salePrice" label={<span className="login-label">{t("PRICE")}</span>}>
                <Input></Input>
            </Form.Item>
             <Form.Item name="amount" label={<span className="login-label">{t("AMOUNT")}</span>}>
                <InputNumber min={1}/>
            </Form.Item>
            <Form.Item name="remark" label={<span className="login-label">{t("REMARK")}</span>}>
                <Input></Input>
            </Form.Item>
        </Form>}
    </Modal>
}

export default ModifyStatus;


