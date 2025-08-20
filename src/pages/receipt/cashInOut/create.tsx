import  {FC, useState} from "react";
import { Form, Input, InputNumber, Modal, notification, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import {useTranslation} from "react-i18next";
import SelectP from "@/common/select";
import { cashService } from "@/store/apis/cash";
import request from "@/store/request";
import { reloadMainList } from "@/common/template";

interface IProps{
    visible:boolean;
    onOk:()=>void;
}
const CreateCash:FC<IProps> = ({onOk,visible}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)

    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {type,amount,remark}=newData
        
        if (type && amount && remark){
            setLoading(true)
            const config = cashService.CashCreate({},newData)
            const res = await request(config)
            setLoading(false)
            console.log(res);
            
            if (res.isSuccess){
                reloadMainList();
                onOk()
            }
        }
        else{
            notification.error({message:t('PLEASE_COMPLETE')})
        }

    }
    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>{t("CREATE")}</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
            <Form form={form} className="email-new" initialValues={{type:1,amount:0,remark:''}}>
                <Form.Item name="type" label={t('Cash In/Out')}>
                    <Select options={[{value:1,label:'Cash In'},{value:2,label:'Cash Out'}]} style={{ width: 200 }}/>
                </Form.Item>
                <Form.Item name="amount" label={t('AMOUNT')}>
                    <InputNumber min={0} placeholder="code" style={{ width: 200 }} ></InputNumber>
                </Form.Item>
                <Form.Item name="remark" label={t('REMARK')}>
                    <Input placeholder={t('REMARK')} style={{ width: 200 }} ></Input>
                </Form.Item>
            </Form>
    </Modal>
}

export default CreateCash;
