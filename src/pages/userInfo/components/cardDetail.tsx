import {FC, ReactNode} from "react";
import {Card, Col, Row} from "antd";
import {ISubmitAsyncModule} from "@/common/interface";
import useUniDirectionalEvent from "@/hooks/utils/useUniDirectionalEvent";
import FormModal from "@/pages/userInfo/components/formModal";

interface IProps{
    icon: ReactNode;
    text: string;
}

const CardDetail:FC<IProps & ISubmitAsyncModule> = ({icon, text, submit, children}) => {
    const [event$, sendMessage] = useUniDirectionalEvent();
    return <>
        <Card hoverable onClick={() => sendMessage(true)}>
            <Row gutter={[15, 15]} align="middle">
                <Col span={24} style={{textAlign:"center"}}>
                    {icon}
                </Col>
                <Col span={24} style={{textAlign:"center"}}>
                    {text}
                </Col>
            </Row>
        </Card>
        <FormModal
            title={text}
            submit={submit}
            event$={event$}
        >
            {children}
        </FormModal>
    </>
}

export default CardDetail;
