import {FC} from "react";
import {Col, Divider, Row} from "antd";
import ModifyPassword from "@/pages/userInfo/modifyPassword";
import useSaleInfo from "@/store/account/useSaleInfo";
import Safety from "@/pages/userInfo/safety";

const UserInfo:FC = () => {
    const saleInfo = useSaleInfo();
    console.log(saleInfo)
    return <section style={{ width: 450, padding: 15 }}>
        <p style={{fontWeight: "bolder", fontSize: "1.2em"}}>
            个人中心
        </p>
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
        </Row>
    </section>
}

export default UserInfo
