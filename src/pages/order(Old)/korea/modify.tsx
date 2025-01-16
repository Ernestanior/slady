import React, {FC, useEffect, useMemo, useState} from "react";
import {Form, Input, Modal, notification, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {orderType} from "../index";
import {orderService} from "@/store/apis/order";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {useTranslation} from "react-i18next";
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

    const statusList = useMemo(()=>{
        if (data?.status===orderType.PENDING){
            return [{ value: orderType.PENDING, label: '待定',disabled:true },{ value: orderType.DONE, label: 'OK' },{ value: orderType.SEND, label: '已发货',disabled: true }]
        }
        else if (data?.status===orderType.CANCELREQUEST){
            return [{ value: orderType.CANCELREQUEST, label: '待定(请求取消)',disabled:true }]
        }
        else if (data?.status===orderType.DONE){
            return [{ value: orderType.PENDING, label: '待定',disabled:true },{ value: orderType.DONE, label: 'OK',disabled:true },{ value: orderType.SEND, label: '已发货' }]
        }
        else if (data?.status===orderType.SEND){
            return [{ value: orderType.PENDING, label: '待定',disabled:true },{ value: orderType.DONE, label: 'OK',disabled:true },{ value: orderType.SEND, label: '已发货',disabled:true }]
        }
        return [{ value: '0', label: '无状态',disabled:true },{ value: orderType.PENDING, label: '待定' },{ value: orderType.DONE, label: 'OK' },{ value: orderType.SEND, label: '已发货',disabled:true }]
    },[data?.status])
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        if (newData.status===orderType.CANCELREQUEST ){
            onOk()
            return
        }
        if (newData.status===orderType.PENDING && !newData.pendingDate){
            notification.error({message:t('PENDING_NEED_DATE')})
            return
        }
        if (newData.status===orderType.DONE && !newData.quotedPrice){
            notification.error({message:t('OK_NEED_PRICE')})
            return
        }
        setLoading(true)
        const res = await request(orderService.OrderModify({}, {...newData,id:data.id,pendingDate:newData.status===orderType.PENDING?newData.pendingDate:"",paymentStatus:(newData.status===orderType.DONE||newData.status===orderType.SEND)?0:-1}))
        setLoading(false)
        if (res.isSuccess){
            reloadMainList();
            onOk()
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
            <Form.Item name="status" label={<span className="login-label">{t("STATUS")}</span>}>
                {/*<Input onChange={(e)=>setStatus(e.target.value.trim().toLowerCase())}/>*/}
                <Select
                    style={{ width: 180 }}
                    onChange={setStatus}
                    options={statusList}
                />
            </Form.Item>
            {status===orderType.PENDING && <Form.Item name="pendingDate" label={<span className="login-label">{t("PENDING_DATE")}</span>}>
                <Input></Input>
            </Form.Item>}
            {status===orderType.DONE && <Form.Item name="quotedPrice" label={<span className="login-label">{t("QUOTED_PRICE")}</span>}>
                <Input disabled={data?.status===orderType.DONE}/>
            </Form.Item>}
        </Form>}
    </Modal>
}

export default ModifyStatus;


