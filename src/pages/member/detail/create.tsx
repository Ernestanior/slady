import React, {FC, useRef, useState} from "react";
import {Button, DatePicker, Divider, Form, Input, InputNumber, InputRef, Modal, notification, Select, Space} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {userService} from "@/store/apis/account";
import {useTranslation} from "react-i18next";
import { memberRecordService, memberService } from "@/store/apis/member";
import { log } from "console";
import FormList from "antd/lib/form/FormList";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    memberId:number;
}
let index=0
const CreateMemberRecord:FC<IProps> = ({onOk,visible,memberId}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)

    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {designs,purchaseDate,remark,sum}=newData
        
        if (designs.length && purchaseDate && sum && remark){
            setLoading(true)
            const config = memberRecordService.MemberRecordCreate({},{...newData,memberId,purchaseDate:purchaseDate.format('YYYY-MM-DD')})
            const res = await request(config)
            setLoading(false)
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
        <Form form={form} className="email-new" initialValues={{status:1,subscription:[1]}}>
            <Form.Item name="purchaseDate" label={<span className="login-label">{t('DATE')}</span>}>
                <DatePicker />
            </Form.Item>
            <FormList name="designs">
                    {(fields,{add,remove})=>(<>
                        <Form.Item>
                            {t('ITEM')}：
                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                {t('ADD_FIELD')}
                            </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'designCode']}
                                >
                                   <div style={{display:"flex",alignItems:"center"}}><Input placeholder={'Item产品'}/></div>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                >
                                   <div style={{display:"flex",alignItems:"center"}}><Input placeholder={'Item Price产品价格'} min={0}/></div>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} style={{color:"red"}}/>
                            </Space>
                        ))}

                    </>)}
                </FormList>
            <Form.Item name="sum" label={<span className="login-label">{t('AMOUNT')}</span>}>
                <InputNumber/>
            </Form.Item>
            <Form.Item name="remark" label={<span className="login-label">{t('REMARK')}</span>}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
}

export default CreateMemberRecord;
