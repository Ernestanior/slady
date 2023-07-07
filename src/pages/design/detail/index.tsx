import React, {FC, useEffect, useMemo, useState} from "react";
import item1 from '@/assets/1.jpg'
import {Button, Col, Row, Tabs} from "antd";
import {useRouteMatch} from "react-router-dom";
import {designService, itemService} from "@/store/apis/item";
import {from} from "rxjs";
import request, {dev_url} from "@/store/request";
import Slady from "@/pages/design/detail/store/slady";
import Sl from "@/pages/design/detail/store/sl";
import {reqAndReload} from "@/common/utils";
import historyService from "@/store/history";
import msgModal from "@/store/message/service";
import ModifyDesign from "@/pages/design/detail/modify";

const { TabPane } = Tabs;

const Detail: FC = () => {
    const [data,setData]=useState<any>()
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const url = useRouteMatch<{id:string }>("/item/detail/:id");

    const id = useMemo(()=>url?.params.id,[url])

    useEffect(()=>{
        const config = designService.DesignDetail({id},{})
        from(request(config)).subscribe((res:any)=>{
            res.isSuccess && setData(res.result)
        })
    },[id,editFlag])

    const deleteDesign= async ()=>{
        const value = {
            title: "删除商品",
            content: `确定删除商品: ${data.design} ？`,
            onOk: () => {
                if (id){
                    const config = designService.DesignDelete({},[parseInt(id)])
                    reqAndReload(config,()=>historyService.goBack())
                }
            }
        }
        msgModal.createEvent("modal", value)
    }
    // const sladyData = useMemo(()=>data && data.filter((item:any)=>item.warehouseName==='Slady一店'),[data])
    // const SLData = useMemo(()=>data && data.filter((item:any)=>item.warehouseName==='SL二店'),[data])
    const goPic=async()=>{
        const config = itemService.FileList({folderPath:data.photos},{})
        const res = await request(config)
        console.log(res)
    }
    return (
        <section>
            <section style={{display:"flex"}}>
                <img src={dev_url+data?.photos} height={200} onClick={goPic}/>
                <div style={{width:300,marginLeft:20}}>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>设计编号</Col>
                        <Col span={14} style={{fontWeight:550}}>{data?.design}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{color:"#9d692c"}}>类别</Col>
                        <Col span={14} >{data?.type}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>总库存数</Col>
                        <Col span={14}>{data?.stock}件</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>颜色</Col>
                        <Col span={14}>{data?.color.join(", ")}</Col>
                        {/*<Col span={14}><Select style={{width:300}} mode={"multiple"} defaultValue={["白色","棕色","粉色"]}></Select></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>尺寸</Col>
                        <Col span={14}>{data?.size.join(", ")}</Col>
                        {/*<Col span={14}><Select style={{width:300}} mode={"multiple"} defaultValue={["S","M","L"]}></Select></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>进货价</Col>
                        <Col span={14}>${data?.purchasePrice}</Col>
                        {/*<Col span={14}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/></div></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>销售价</Col>
                        <Col span={14}>${data?.salePrice}</Col>
                        {/*<Col span={14}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                    </Row>
                </div>
                <Button onClick={()=>setEditFlag(true)}>修改</Button>
                <Button style={{marginLeft:20,color:"red"}} onClick={deleteDesign}>删除商品</Button>
            </section>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Slady一店" key="1">
                    <Slady></Slady>
                </TabPane>
                <TabPane tab="SL二店" key="2">
                    <Sl></Sl>
                </TabPane>
            </Tabs>
            <ModifyDesign onOk={()=>setEditFlag(false)} visible={editFlag} data={data}></ModifyDesign>

        </section>
    );
};

export default Detail;
