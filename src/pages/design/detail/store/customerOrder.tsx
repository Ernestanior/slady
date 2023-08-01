import React, {FC, useState} from "react";
import {Form, Input, InputNumber, Modal, notification} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {orderService} from "@/store/apis/order";
import {itemService} from "@/store/apis/item";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any
}
enum orderType{
    REPLENISH,
    ORDER
}
const CustomerOrder:FC<IProps> = ({onOk,visible,data}) => {
    console.log(data)
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)

    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {amount,remark}=newData
        if (amount){
            setLoading(true)
            await request(itemService.ItemModifyStock({id:data.id,stock:data.stock-amount},{}))
            const config = orderService.OrderCreate({},{itemId:data.id,amount,type:orderType.REPLENISH,remark,paymentStatus:-1,status:"0"})
            const res = await request(config)
            setLoading(false)
            if (res.isSuccess){
                reloadMainList();
                onOk()
            }
        }
        else{
            notification.error({message:"请填写完整"})
        }

    }
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>客订</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        width={600}
    >

        <Form form={form} className="email-new" initialValues={{status:1,subscription:[1]}}>
            <Form.Item name="amount" label={<span className="login-label">客订数量</span>}>
                <InputNumber min={0}/>
            </Form.Item>
            <Form.Item name="remark" label={<span className="login-label">留言</span>}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
}

export default CustomerOrder;
