import {FC, ReactNode} from "react";
import {Card, Col, Row} from "antd";
import {ITrigger} from "@/common/interface";

interface IProps{
    icon: ReactNode;
    text: string;
    onClick?: ITrigger;
}

const CardButton:FC<IProps> = ({icon, text, onClick}) => {
    return <Card hoverable onClick={onClick}>
        <Row gutter={[15, 15]} align="middle">
            <Col span={24} style={{textAlign:"center"}}>
                {icon}
            </Col>
            <Col span={24} style={{textAlign:"center"}}>
                {text}
            </Col>
        </Row>
    </Card>
}

export default CardButton
