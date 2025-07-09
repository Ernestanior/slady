import React, {FC,useState} from "react";
import {Button, DatePicker, Form, Input, InputNumber, Modal, notification, Space} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {useTranslation} from "react-i18next";
import { memberRecordService } from "@/store/apis/member";
import FormList from "antd/lib/form/FormList";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const CreateMemberRecord:FC<IProps> = ({onOk,visible,data}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)

    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {designs,purchaseDate,remark}=newData

        
        if (designs.length){
            let amount=0
            designs.forEach((item:any) => {
                if (item) {
                    amount+=parseFloat(item.price)
                }else{
                    notification.error({message:t('PLEASE_COMPLETE')})
                    return
                }
            });
            if (amount>data.balance) {
                notification.error({message:t('INSUFFICIENT_BALANCE')})
                return
            }
            if (designs.length && purchaseDate && remark){
                setLoading(true)
                const config = memberRecordService.MemberRecordCreate({},{...newData,memberId:data.id,sum:amount.toFixed(2),purchaseDate:purchaseDate.format('YYYY-MM-DD')})
                const res = await request(config)
                setLoading(false)
                if (res.isSuccess){
                    reloadMainList();
                    onOk()
                }
            }else{
                notification.error({message:t('PLEASE_COMPLETE')})
            }

        } else{
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
                                   <div style={{display:"flex",alignItems:"center"}}><InputNumber placeholder={'Item Price产品价格'} min={0}/></div>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} style={{color:"red"}}/>
                            </Space>
                        ))}

                    </>)}
                </FormList>
            <Form.Item name="saler" label={<span className="login-label">{t('SALER')}</span>}>
                <Input />
            </Form.Item>
            {/* <Form.Item name="sum" label={<span className="login-label">{t('AMOUNT')}</span>}>
                <InputNumber/>
            </Form.Item> */}
            <Form.Item name="remark" label={<span className="login-label">{t('PAYMENT_DETAIL')}</span>}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
}

export default CreateMemberRecord;
