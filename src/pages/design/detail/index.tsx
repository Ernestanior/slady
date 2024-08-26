import React, {FC, useCallback, useEffect, useState} from "react";
import {Button, Col, Row} from "antd";
import {designService} from "@/store/apis/item";
import {from} from "rxjs";
import request, {dev_url} from "@/store/request";
import Slady from "@/pages/design/detail/store/slady";
import Sl from "@/pages/design/detail/store/sl";
import {reqAndReload} from "@/common/utils";
import msgModal from "@/store/message/service";
import ModifyDesign from "@/pages/design/detail/modify";
import {E_USER_TYPE} from "@/store/account/interface";
import useAccountInfo from "@/store/account";
import {useTranslation} from "react-i18next";
import {LeftOutlined} from "@ant-design/icons";
import ImgView from "@/pages/design/imgView";
import Live from "@/pages/design/detail/store/live";

interface IProps{
    id:number;
    onReturn:()=>void;
    toImgView:()=>void;
}
const Detail: FC<IProps> = ({id,onReturn}) => {
    const [t]=useTranslation()
    const userInfo = useAccountInfo()
    const [data,setData]=useState<any>()
    const [editFlag,setEditFlag]=useState<boolean>(false)
    // const url = useRouteMatch<{id:string }>("/item/detail/:id");

    const [currentPage,setCurrentPage]=useState<string>('detail')


    // const id = useMemo(()=>url?.params.id,[url])

    const getDetail=useCallback(()=>{
        const config = designService.DesignDetail({id},{})
        from(request(config)).subscribe((res:any)=>{
            res.isSuccess && setData(res.result)
        })
    },[id])

    useEffect(()=>{
        getDetail()
    },[getDetail])

    const deleteDesign= async ()=>{
        const value = {
            title: "删除商品",
            content: `确定删除商品: ${data.design} ？`,
            onOk: () => {
                if (id){
                    const config = designService.DesignDelete({},[id])
                    reqAndReload(config,()=>{
                        // historyService.goBack()
                        onReturn()

                    })
                }
            }
        }
        msgModal.createEvent("modal", value)
    }
    // const goPic=async()=>{
    //     toImgView()
    //     // data?.photos && historyService.push({pathname:`/item/images/${id}`,search:`forderPath=${data.photos}`})
    // }
    if(currentPage==="imgView"){
        return <ImgView onReturn={()=>{getDetail();setCurrentPage('detail')}} id={id} folderPath={data.photos} coverPath={data?.previewPhoto}/>
    }
    return (
        <section>
            <div style={{marginBottom:10,cursor:"pointer",color:"#ee8d20",}} onClick={onReturn}><LeftOutlined />{t('RETURN')}</div>
            {userInfo?.type!==E_USER_TYPE.SALER && <div style={{marginBottom:20}}>
                <Button onClick={()=>setCurrentPage('imgView')}>{t('IMAGE_VIEW')}</Button>
                <Button style={{marginLeft:20}} onClick={()=>setEditFlag(true)}>{t('EDIT')}</Button>
                <Button style={{marginLeft:20,color:"red"}} onClick={deleteDesign}>{t('DELETE_ITEM')}</Button>
            </div>}
            <section style={{display:"flex"}}>
                <img style={{cursor:"pointer"}} alt="" src={dev_url+data?.previewPhoto} height={200} onClick={()=>setCurrentPage('imgView')}/>
                <div style={{flex:1,marginLeft:20}}>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('DESIGN_CODE')}</Col>
                        <Col span={16} style={{fontWeight:550}}>{data?.design}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('TYPE')}</Col>
                        <Col span={16} >{data?.type}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('TOTAL_STOCK')}</Col>
                        <Col span={16}>{data?.stock}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('COLOR')}</Col>
                        <Col span={16}>{data?.color.join(", ")}</Col>
                        {/*<Col span={16}><Select style={{width:300}} mode={"multiple"} defaultValue={["白色","棕色","粉色"]}></Select></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('SIZE')}</Col>
                        <Col span={16}>{data?.size.join(", ")}</Col>
                        {/*<Col span={16}><Select style={{width:300}} mode={"multiple"} defaultValue={["S","M","L"]}></Select></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('HOT')}</Col>
                        <Col span={16}>{data?.hot || 0}</Col>
                    </Row>
                    {(userInfo?.type ===E_USER_TYPE.ADMIN || userInfo?.type ===E_USER_TYPE.PRODUCTMANAGEMENT)&& <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('PURCHASE_PRICE')}</Col>
                        <Col span={16}>{data?.purchasePrice}</Col>
                        {/*<Col span={16}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/></div></Col>*/}
                    </Row>}
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('SALE_PRICE')}</Col>
                        <Col span={16}>{data?.salePrice}</Col>
                        {/*<Col span={19}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                    </Row>
                </div>
                <div style={{flex:1,marginLeft:20}}>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('CREATE_DATE')}</Col>
                        <Col span={16}>{data?.createDate}</Col>
                        {/*<Col span={19}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('FABRIC')}</Col>
                        <Col span={16}>
                            <div>{data?.fabric?.split('\n').map((item:string)=><div>{item}</div>)}</div>
                        </Col>

                        {/*<Col span={19}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={8} style={{fontWeight:550,color:"#9d692c"}}>{t('REMARK')}</Col>
                        <Col span={16}>{data?.remark}</Col>
                        {/*<Col span={19}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                    </Row>
                </div>
            </section>
            {/*<Tabs defaultActiveKey="1">*/}
            {/*    <TabPane tab={WAREHOUSE.SLADY} key="1">*/}
            {/*        <Slady onRefresh={getDetail}></Slady>*/}
            {/*    </TabPane>*/}
            {/*    <TabPane tab={WAREHOUSE.SL} key="2">*/}
            {/*        <Sl onRefresh={getDetail}></Sl>*/}
            {/*    </TabPane>*/}
            {/*</Tabs>*/}
            <div style={{display:"flex",justifyContent:"space-between",padding:20}}>
                <Slady onRefresh={getDetail} designId={id}></Slady>
                <Sl onRefresh={getDetail} designId={id}></Sl>
            </div>
            <div style={{display:"flex",justifyContent:"flex-start"}}>
                <Live onRefresh={getDetail} designId={id}></Live>
            </div>

            <ModifyDesign onOk={()=>setEditFlag(false)} visible={editFlag} data={data}></ModifyDesign>

        </section>
    );
};

export default Detail;
