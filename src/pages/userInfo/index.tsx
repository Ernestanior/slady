import {FC} from "react";
import {Col, Divider, Row} from "antd";
import ModifyPassword from "@/pages/userInfo/modifyPassword";
import useSaleInfo from "@/store/account/useSaleInfo";
import Safety from "@/pages/userInfo/safety";
import FA2 from "@/pages/userInfo/2FA";

const UserInfo:FC = () => {
    const saleInfo = useSaleInfo();
    return <section style={{ width: 450, padding: 15 }}>
        <h3 style={{fontWeight:650}}>
            个人中心
        </h3>
        <br/>
        <Row gutter={[15, 15]}>
            <Col span={6}>
                用户名称
            </Col>
            <Col span={18}>
                {saleInfo && saleInfo.name}
            </Col>
            <Col span={6}>
                登录邮箱
            </Col>
            <Col span={18}>
                {saleInfo && saleInfo.email}
            </Col>
        </Row>
        <Divider />
        <Row gutter={[15, 15]}>
            <Col span={8}>
                <ModifyPassword />
            </Col>
            <Col span={8}>
                <Safety />
            </Col>
            <Col span={8}>
                <FA2 />
            </Col>
        </Row>
    </section>
}

export default UserInfo
