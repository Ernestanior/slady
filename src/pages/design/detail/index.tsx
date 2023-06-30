import React, {FC, useEffect, useMemo, useState} from "react";
import item1 from '@/assets/1.jpg'
import {Button, Col, Input, Row, Select, Tabs} from "antd";
import {useRouteMatch} from "react-router-dom";
import {designService, itemService} from "@/store/apis/item";
import {from} from "rxjs";
import request from "@/store/request";
import Slady from "@/pages/design/detail/store/slady";
import Sl from "@/pages/design/detail/store/sl";

const { TabPane } = Tabs;

const Detail: FC = () => {
    const [data,setData]=useState<any>()
    const url = useRouteMatch<{id:string }>("/item/detail/:id");

    const id = useMemo(()=>url?.params.id,[url])

    useEffect(()=>{
        const config = designService.DesignDetail({id},{})
        from(request(config)).subscribe((res:any)=>{
            res.isSuccess && setData(res.result)
        })
    },[id])
    console.log(data)
    // const sladyData = useMemo(()=>data && data.filter((item:any)=>item.warehouseName==='Slady一店'),[data])
    // const SLData = useMemo(()=>data && data.filter((item:any)=>item.warehouseName==='SL二店'),[data])

    return (
        <section>
            <section style={{display:"flex"}}>
                <img src={item1} height={200}/>
                <div style={{width:300,marginLeft:20}}>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>设计编号</Col>
                        <Col span={14} style={{fontWeight:550}}>{data?.design}</Col>
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
                {/*<Button>修改</Button>*/}
                {/*<Button>确定</Button>*/}
            </section>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Slady一店" key="1">
                    <Slady></Slady>
                </TabPane>
                <TabPane tab="SL二店" key="2">
                    <Sl></Sl>
                </TabPane>
            </Tabs>
        </section>
    );
};

export default Detail;

const staticData = {

}
