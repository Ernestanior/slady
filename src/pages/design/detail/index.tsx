import React, {FC, useEffect, useMemo, useState} from "react";
import {Button, Col, Row, Tabs} from "antd";
import {useRouteMatch} from "react-router-dom";
import {designService} from "@/store/apis/item";
import {from} from "rxjs";
import request, {dev_url} from "@/store/request";
import Slady from "@/pages/design/detail/store/slady";
import Sl from "@/pages/design/detail/store/sl";
import {reqAndReload} from "@/common/utils";
import historyService from "@/store/history";
import msgModal from "@/store/message/service";
import ModifyDesign from "@/pages/design/detail/modify";
import {WAREHOUSE} from "@/common/const";
import {E_USER_TYPE} from "@/store/account/interface";
import useAccountInfo from "@/store/account";

const { TabPane } = Tabs;

const Detail: FC = () => {
    const userInfo = useAccountInfo()
    const [data,setData]=useState<any>()
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const url = useRouteMatch<{id:string }>("/item/detail/:id");

    const id = useMemo(()=>url?.params.id,[url])
    console.log(url)
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
    const goPic=async()=>{
        data?.photos && historyService.push({pathname:`/item/images/${id}`,search:`forderPath=${data.photos}`})
    }
    return (
        <section>
            {userInfo?.type!==E_USER_TYPE.SALER && <div style={{marginBottom:20}}>
                <Button onClick={()=>setEditFlag(true)}>修改</Button>
                <Button style={{marginLeft:20,color:"red"}} onClick={deleteDesign}>删除商品</Button>
            </div>}
            <section style={{display:"flex"}}>
                <img style={{cursor:"pointer"}} alt="" src={dev_url+data?.previewPhoto} height={200} onClick={goPic}/>
                <div style={{flex:1,marginLeft:20}}>
                    <Row style={{marginBottom:10}}>
                        <Col span={6} style={{fontWeight:550,color:"#9d692c"}}>设计编号</Col>
                        <Col span={18} style={{fontWeight:550}}>{data?.design}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={6} style={{fontWeight:550,color:"#9d692c"}}>类别</Col>
                        <Col span={18} >{data?.type}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={6} style={{fontWeight:550,color:"#9d692c"}}>总库存数</Col>
                        <Col span={18}>{data?.stock}件</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={6} style={{fontWeight:550,color:"#9d692c"}}>颜色</Col>
                        <Col span={5}>{data?.color.join(", ")}</Col>
                        {/*<Col span={18}><Select style={{width:300}} mode={"multiple"} defaultValue={["白色","棕色","粉色"]}></Select></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={6} style={{fontWeight:550,color:"#9d692c"}}>尺寸</Col>
                        <Col span={18}>{data?.size.join(", ")}</Col>
                        {/*<Col span={18}><Select style={{width:300}} mode={"multiple"} defaultValue={["S","M","L"]}></Select></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={6} style={{fontWeight:550,color:"#9d692c"}}>热度</Col>
                        <Col span={18}>{data?.hot || 0}</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={6} style={{fontWeight:550,color:"#9d692c"}}>进货价</Col>
                        <Col span={18}>{data?.purchasePrice}</Col>
                        {/*<Col span={18}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/></div></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={6} style={{fontWeight:550,color:"#9d692c"}}>销售价</Col>
                        <Col span={18}>{data?.salePrice}</Col>
                        {/*<Col span={19}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                    </Row>
                </div>
                <div style={{flex:1,marginLeft:20}}>
                    <Row style={{marginBottom:10}}>
                        <Col span={5} style={{fontWeight:550,color:"#9d692c"}}>面料</Col>
                        <Col span={19}>
                            <div>{data?.fabric?.split('\n').map((item:string)=><div>{item}</div>)}</div>
                        </Col>

                        {/*<Col span={19}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={5} style={{fontWeight:550,color:"#9d692c"}}>备注</Col>
                        <Col span={19}>{data?.remark}</Col>
                        {/*<Col span={19}><div style={{display:"flex"}}>$<Input style={{marginRight:10}}/> </div></Col>*/}
                    </Row>
                </div>


            </section>
            <Tabs defaultActiveKey="1">
                <TabPane tab={WAREHOUSE.SLADY} key="1">
                    <Slady></Slady>
                </TabPane>
                <TabPane tab={WAREHOUSE.SL} key="2">
                    <Sl></Sl>
                </TabPane>
            </Tabs>
            <ModifyDesign onOk={()=>setEditFlag(false)} visible={editFlag} data={data}></ModifyDesign>

        </section>
    );
};

export default Detail;
