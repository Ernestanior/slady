import {FC} from "react";
import {Button, Col, Row} from "antd";
import {ICancelModule, ISubmitModule} from "@/common/interface";

interface IProps{
    marginTop?: number;
    marginBottom?: number
}

const Footer:FC<IProps & ISubmitModule & ICancelModule> = ({ marginTop=60, marginBottom=0, submit, cancel }) => {
    return <div style={{ marginTop, marginBottom }}>
        <Row gutter={15}>
            <Col>
                <Button type="primary" onClick={submit}>
                    应用
                </Button>
            </Col>
            <Col>
                <Button onClick={cancel}>
                    取消
                </Button>
            </Col>
        </Row>
    </div>
}

export default Footer
