import {FC} from "react";
import {Col, Input, Row} from "antd";

interface IProps{
    value?: string;
    onChange?: (data: any) => void
}

const PIN:FC<IProps> = ({onChange}) => {
    return <div style={{marginTop: 15, padding: "0 15px"}}>
        <Row>
            <Col span={8}>
                Pin码
            </Col>
            <Col span={16}>
                <Input onChange={onChange}/>
            </Col>
        </Row>
    </div>
}

export default PIN