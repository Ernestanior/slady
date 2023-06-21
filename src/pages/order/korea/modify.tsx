import React, {FC, useEffect, useState} from "react";
import {DatePicker, Form, Input, Modal, notification, Select, Switch} from "antd";
import {useForm} from "antd/es/form/Form";
import {customerService} from "@/store/apis/account";
import moment from "moment";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import Log from "@/pages/profile/comp/log";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const ModifyCustomer:FC<IProps> = ({onOk,visible,data}) => {
    const [form] = useForm()
    const [status,setStatus]=useState<string>()
    // const [imgList,setImgList] = useState<UploadFile[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const onCancel=()=>{
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        console.log(newData)
        if (newData.status===STATUS.DONE && !newData.price){
            notification.error({message:"修改状态为OK时，必须填写价格"})
            return
        }
        setLoading(true)
        // const res = await request(customerService.CustomerModify({}, {...newData,id:data.id,probationStatus:newData.probationStatus?1:0}))
        setLoading(false)
        // if (res.isSuccess){
        //     reloadMainList();
        //     onOk()
        // }
    }
    useEffect(()=>{
        if(data){
            form.setFieldsValue({...data})
            setStatus(data.status)
        }
    },[form,data])

    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Modify</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        width={600}
    >
        {data && <Form form={form} className="email-new">
            <Form.Item name="status" label={<span className="login-label">状态</span>}>
                {/*<Input onChange={(e)=>setStatus(e.target.value.trim().toLowerCase())}/>*/}
                <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={setStatus}
                    options={[{ value: STATUS.DONE, label: 'OK' },{ value: STATUS.PENDING, label: '待定' },{ value: STATUS.SEND, label: '已发货' }]}
                />
            </Form.Item>
            {status===STATUS.PENDING && <Form.Item name="data" label={<span className="login-label">待定日期</span>}>
                <Input />
            </Form.Item>}
            {status===STATUS.DONE && <Form.Item name="price" label={<span className="login-label">价格</span>}>
                <Input />
            </Form.Item>}
        </Form>}
    </Modal>
}

export default ModifyCustomer;

enum STATUS {
    DONE='OK',
    PENDING='待定',
    SEND='已发货',
    CANCEL='已取消'
}
