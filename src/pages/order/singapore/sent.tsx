import React, {FC,useState} from "react";
import {Form, Input, Modal, notification} from "antd";
import {useForm} from "antd/es/form/Form";
import {orderService} from "@/store/apis/order";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {useTranslation} from "react-i18next";
interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const Sent:FC<IProps> = ({onOk,visible,data}) => {
    const [form] = useForm()
    const [t]=useTranslation()
    // const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        if (!newData.pendingDate){
            notification.error({message:t('PENDING_NEED_DATE')})
            return
        }
        setLoading(true)
        const res = await request(orderService.OrderModify({}, {id:data.id,pendingDate:newData.pendingDate,status:'1'}))
        setLoading(false)
        if (res.isSuccess){
            reloadMainList();
            onOk()
        }
    }

    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>{t('UNSENT')}</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
        {data && <Form form={form} className="email-new">
             <Form.Item name="pendingDate" label={<span className="login-label">{t("SHIPPING_DATE")}</span>}>
                <Input></Input>
            </Form.Item>
        </Form>}
    </Modal>
}

export default Sent;


