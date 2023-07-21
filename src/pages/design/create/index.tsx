import React, {FC, useRef, useState} from "react";
import {Button, Divider, Form, Input, InputRef, notification, Select, Space} from "antd";
import FormItem from "@/common/Form/formItem";
import { PlusOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import request from "@/store/request";
import ImageUpload from "@/pages/design/create/imageUpload";
import SelectP from "@/common/select";
import {designService, itemService} from "@/store/apis/item";
import historyService from "@/store/history";
import {WAREHOUSE} from "@/common/const";
import {typeList} from "@/pages/design";

// export const typeList = [ 'DR', 'TB', 'SK', 'PT', 'GO', 'JK', 'JS', 'BT', 'SE', 'SI', 'AC', 'SH']
// const color = ['灰色','橙色','黄色','绿色','蓝色','紫色','白色','粉色','米色','棕色','灰褐色','香槟色','深蓝色','天空色','芥末黄','薄荷绿','蜜桃色','奶油色','炭黑色']
export const colorList = ['Grey','Orange','Yellow','Green','Blue','purple','White','Pink','beige','Brown','Champagne','Navy','Sky','Mustard','Mint','Peach','Cream','Charcoal']
// const size = [{label:'XS',value:'XS'},{label:'S',value:'S'},{label:'M',value:'M'},{label:'L',value:'L'},{label:'XL',value:'XL'}]
export const size = ['XXS','XS','S','M','L','XL','XXL','3XL','4XL']
let index=0
const CreateItem: FC = () => {
    const [form] = useForm()
    const [imgList,setImgList] = useState<UploadFile[]>([])
    // const [loading,setLoading] = useState<boolean>(false)
    const [items, setItems] = useState(colorList);
    const [color, setColor] = useState('');
    const inputRef = useRef<InputRef>(null);

    const addColor = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, color || `New item ${index++}`]);
        setColor('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    // const onCancel=()=>{
    //     form.resetFields()
    // }
    const onFinish =async ()=>{
        const itemForm:any = form.getFieldsValue()
        const formData = new FormData()
        const {design,type,color,size}=itemForm
        if (!design || !type || !color || !size){
            notification.error({message:'请填写完整'})
            return
        }
        imgList.forEach(img => {
            formData.append('files', img.originFileObj as RcFile);
        });
         // setLoading(true)
        const upload_result = await request(itemService.FileUpload({}, formData as any));

        // setLoading(false)
            let photos:string[]=[]
            if(upload_result.isSuccess){
                photos = upload_result.result as string[]
                const design_result:any = await request(designService.DesignCreate({}, {...itemForm,photos}));
                if (design_result.isSuccess){
                    const item_result = await request(itemService.ItemCreate({}, {...itemForm,designId:design_result.result.id,warehouseName:[WAREHOUSE.SLADY,WAREHOUSE.SL]}));
                    if(item_result.isSuccess)
                        historyService.replace('/item')
                }
            }
    }
    return (
        <section>
            <Form form={form} className="email-new">
                <FormItem name="design" label="品名">
                    <Input />
                </FormItem>
                <FormItem name="type" label="类别">
                    <Select options={typeList}/>
                </FormItem>
                <FormItem name="color" label="颜色">
                    <Select
                        mode="multiple"
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <Space style={{ padding: '0 8px 4px' }}>
                                    <Input
                                        placeholder="Please enter item"
                                        ref={inputRef}
                                        value={color}
                                        onChange={(e)=>setColor(e.target.value)}
                                    />
                                    <Button type="text" icon={<PlusOutlined />} onClick={addColor}>
                                        Add Color
                                    </Button>
                                </Space>
                            </>
                        )}
                        options={items.map((item) => ({ label: item, value: item }))}
                    />
                </FormItem>
                <FormItem name="size" label="尺寸">
                    <SelectP data={size} mode="multiple"/>
                </FormItem>
                <FormItem name="purchasePrice" label="进货价">
                    <Input />
                </FormItem>
                <FormItem name="salePrice" label="售价">
                    <Input />
                </FormItem>
                <ImageUpload changePic={setImgList}></ImageUpload>
            </Form>
            <div>
                <Button type="primary" style={{marginRight:20}} onClick={onFinish}>确认</Button>
                <Button onClick={()=>historyService.goBack()}>返回</Button>
            </div>
        </section>
    );
};

export default CreateItem;
