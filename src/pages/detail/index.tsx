import React, {FC} from "react";
import item1 from '../../assets/1.jpg'
import {Col, Row} from "antd";
import Stock from "@/pages/detail/stock";

const Detail: FC = () => {
    return (
        <section>
            <section style={{display:"flex"}}>
                <img src={item1} height={200}/>
                <div style={{width:300,marginLeft:20}}>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>设计编号</Col>
                        <Col span={14} style={{fontWeight:550}}>628-163</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>总库存数</Col>
                        <Col span={14}>781 件</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>颜色</Col>
                        <Col span={14}>白色，棕色，粉色</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>尺寸</Col>
                        <Col span={14}>S，M，L，XL，XXL</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>进货价</Col>
                        <Col span={14}>$19.00</Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Col span={10} style={{fontWeight:550,color:"#9d692c"}}>销售价</Col>
                        <Col span={14}>$299.00</Col>
                    </Row>
                </div>
            </section>
            <Stock></Stock>
        </section>
    );
};

export default Detail;

const staticData = {

}
