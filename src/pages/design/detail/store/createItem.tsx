import React, {FC, useRef, useState} from "react";
import {Button, Divider, Form, Input, InputNumber, InputRef, Modal, notification, Select, Space} from "antd";
import {useForm} from "antd/es/form/Form";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import FormItem from "@/common/Form/formItem";
import {PlusOutlined} from "@ant-design/icons";
import SelectP from "@/common/select";
import {colorList, size} from "@/pages/design/create";
import {itemService} from "@/store/apis/item";
import {WAREHOUSE} from "@/common/const";
import {useTranslation} from "react-i18next";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    designId:any;
}
let index=0
const warehouse = [WAREHOUSE.SLADY,WAREHOUSE.SL,WAREHOUSE.LIVE]
const CreateItem:FC<IProps> = ({onOk,visible,designId}) => {
    const [t]=useTranslation()
    const [form] = useForm()
    const [loading,setLoading] = useState<boolean>(false)
    const inputRef = useRef<InputRef>(null);
    const [color, setColor] = useState('');
    const [items, setItems] = useState(colorList);

    const addColor = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, color || `New item ${index++}`]);
        setColor('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const onFinish =async ()=>{
        const newData = form.getFieldsValue()
        const {warehouseName,color,size}=newData
        if (warehouseName.length && color.length && size.length && designId){
            const id = parseInt(designId)
            setLoading(true)
            const config = itemService.ItemCreate({},{designId:id,...newData})
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
        title={<div style={{color:"#fff",fontWeight:550}}>{t("CREATE")}</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={t('SAVE')}
        cancelText={t('CANCEL')}
        width={600}
    >
        <Form form={form}  initialValues={{status:1,subscription:[1]}}>
            <FormItem name="warehouseName" label={t('SHOP')}>
                <SelectP data={warehouse} mode="multiple"/>
            </FormItem>
            <FormItem name="color" label={t('COLOR')}>
                <Select
                    mode="multiple"
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space style={{ padding: '0 8px 4px' }}>
                                <Input
                                    placeholder={t('PLEASE_ENTER_ITEM')}
                                    ref={inputRef}
                                    value={color}
                                    onChange={(e)=>setColor(e.target.value)}
                                />
                                <Button type="text" icon={<PlusOutlined />} onClick={addColor}>
                                    {t('ADD_COLOR')}
                                </Button>
                            </Space>
                        </>
                    )}
                    options={items.map((item) => ({ label: item, value: item }))}
                />
            </FormItem>
            <FormItem name="size" label={t('SIZE')}>
                <SelectP data={size} mode="multiple"/>
            </FormItem>
            <FormItem name="stock" label={t('STOCK')}>
                <InputNumber />
            </FormItem>
        </Form>
    </Modal>
}

export default CreateItem;
