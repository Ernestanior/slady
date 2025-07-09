import React, {FC, useRef, useState} from "react";
import {Button, Divider, Form, Input, InputNumber, InputRef, notification, Select, Space} from "antd";
import FormItem from "@/common/Form/formItem";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import request from "@/store/request";
import ImageUpload from "@/common/ImageUpload";
import SelectP from "@/common/select";
import {designService, itemService} from "@/store/apis/item";
import historyService from "@/store/history";
import {WAREHOUSE} from "@/common/const";
import {typeList} from "@/pages/design";
import FormList from "antd/es/form/FormList";
import {useTranslation} from "react-i18next";

// export const typeList = [ 'DR', 'TB', 'SK', 'PT', 'GO', 'JK', 'JS', 'BT', 'SE', 'SI', 'AC', 'SH']
// const color = ['灰色','橙色','黄色','绿色','蓝色','紫色','白色','粉色','米色','棕色','灰褐色','香槟色','深蓝色','天空色','芥末黄','薄荷绿','蜜桃色','奶油色','炭黑色']
export const colorList = ['Khaki','Grey','Red','Orange','Yellow','Green','Blue','Black','Stripes','Grid','Purple','White','Pink','Beige','Brown','Champagne','Navy','Sky','Mustard','Mint','Peach','Cream','Charcoal','Silver','Gold']
export const fabricList = ['Knits','Denim','Silk' ,'Polyester' ,'Lace'  , 'Chiffon', 'Cotton', 'Linen' , 'Tweed fabric' , 'Stretch fabrics', 'leather' , 'PVC']
// const size = [{label:'XS',value:'XS'},{label:'S',value:'S'},{label:'M',value:'M'},{label:'L',value:'L'},{label:'XL',value:'XL'}]
export const size = ['XXS','XS','S','M','L','XL','XXL','3XL','4XL','One Size','32','33','34','35','36','37','38','39','40','41','42','43','44']
let index=0
const CreateItem: FC = () => {
    const [form] = useForm()
    const [imgList,setImgList] = useState<UploadFile[]>([])
    const [imgCover,setImgCover] = useState<UploadFile[]>([])
    const [newColor, setNewColor] = useState(colorList);
    const [newFabric, setNewFabric] = useState(fabricList);
    const [color, setColor] = useState('');
    const [fabric, setFabric] = useState('');
    const inputRef = useRef<InputRef>(null);
    const [t]=useTranslation()

    const addColor = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setNewColor([...newColor, color || `New item ${index++}`]);
        setColor('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const addFabric = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setNewFabric([...newFabric, fabric || `New item ${index++}`]);
        setFabric('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    // const onCancel=()=>{
    //     form.resetFields()
    // }
    const onFinish =async ()=>{
        const itemForm:any = form.getFieldsValue()

        const fabric = itemForm.fabricList?.reduce((total:any,current:any)=>total+current.fabric+' '+(current.percent?': '+current.percent+"%\n":'\n'),'')
        const imgFormData = new FormData()
        const coverFormData = new FormData()
        const {design,type,color,size}=itemForm
        if (!design || !type.length || !color.length|| !size.length || !imgList.length || !imgCover.length){
            notification.error({message:'请填写完整'})
            return
        }
        
        imgList.forEach(img => {
            imgFormData.append('files', img.originFileObj as RcFile);
        });
        imgCover.forEach(img => {
            coverFormData.append('files', img.originFileObj as RcFile);
        });
        const upload_img_result = await request(itemService.FileUpload({}, imgFormData as any));
        const upload_cover_result = await request(itemService.FileUpload({}, coverFormData as any));

        let photos:string[]=[]
        let covers:string[]=[]
            if(upload_img_result.isSuccess && upload_cover_result.isSuccess){
                photos = upload_img_result.result as string[]
                covers = upload_cover_result.result as string[]
                const design_result:any = await request(designService.DesignCreate({}, {...itemForm,type:type.join(','),fabric,photos,previewPhoto:covers}));
                if (design_result.isSuccess){
                    const item_result = await request(itemService.ItemCreate({}, {...itemForm,designId:design_result.result.id,warehouseName:[WAREHOUSE.SLADY,WAREHOUSE.SL,WAREHOUSE.LIVE]}));
                    notification.success({message:"Upload Success"})
                    if(item_result.isSuccess)
                        historyService.replace('/item')
                }
            }
    }
    return (
        <section>
            <Form form={form} className="email-new">
                <FormItem name="design" label={t('ITEM_NAME')}>
                    <Input />
                </FormItem>
                <FormItem name="type" label={t('TYPE')}>
                    <Select options={typeList} mode="multiple"/>
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
                                        placeholder="Please enter item"
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
                        options={newColor.map((item) => ({ label: item, value: item }))}
                    />
                </FormItem>
                <FormItem name="size" label={t('SIZE')}>
                    <SelectP data={size} mode="multiple"/>
                </FormItem>

                <FormList name="fabricList">
                    {(fields,{add,remove})=>(<>
                        <Form.Item>
                            {t('FABRIC')}：
                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                {t('ADD_FIELD')}
                            </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'fabric']}
                                    rules={[{ required: true, message: t('MISSING_FABRIC') }]}
                                >
                                    <Select
                                        style={{width:300}}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider style={{ margin: '8px 0' }} />
                                                <Space style={{ padding: '0 8px 4px' }}>
                                                    <Input
                                                        placeholder={t('PLEASE_ENTER_ITEM')}
                                                        ref={inputRef}
                                                        value={fabric}
                                                        onChange={(e)=>setFabric(e.target.value)}
                                                    />
                                                    <Button type="text" icon={<PlusOutlined />} onClick={addFabric}>
                                                        {t('ADD_FABRIC')}
                                                    </Button>
                                                </Space>
                                            </>
                                        )}
                                        options={newFabric.map((item) => ({ label: item, value: item }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'percent']}
                                >
                                   <div style={{display:"flex",alignItems:"center"}}><InputNumber placeholder={t('PERCENT')} min={0}/>%</div>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} style={{color:"red"}}/>
                            </Space>
                        ))}

                    </>)}
                </FormList>
                <FormItem name="purchasePrice" label={t('PURCHASE_PRICE')}>
                    <Input />
                </FormItem>
                <FormItem name="salePrice" label={t('SALE_PRICE')}>
                    <Input />
                </FormItem>
                <FormItem name="remark" label={t('REMARK')}>
                    <Input />
                </FormItem>
                <div style={{display:"flex"}}>
                    {t('COVER')}：
                    <ImageUpload changePic={setImgCover} maxCount={1}></ImageUpload>
                </div>
                <div style={{display:"flex"}}>
                    {t('IMAGE')}：
                    <ImageUpload changePic={setImgList}></ImageUpload>
                </div>
            </Form>
            <div>
                <Button type="primary" style={{marginRight:20}} onClick={onFinish}>{t('CONFIRM')}</Button>
                <Button onClick={()=>historyService.goBack()}>{t('RETURN')}</Button>
            </div>
        </section>
    );
};

export default CreateItem;
