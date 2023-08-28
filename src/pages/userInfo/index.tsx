import {FC} from "react";
import {Col, Divider, Row} from "antd";
import useAccountInfo from "@/store/account";
import {useTranslation} from "react-i18next";

const UserInfo:FC = () => {
    const {t}=useTranslation()
    const userInfo = useAccountInfo();
    return <section style={{ width: 450, padding: 15 }}>
        <h3 style={{fontWeight:650}}>
            {t('PROFILE')}
        </h3>
        <br/>
        <Row>
            <Col span={6}>
                {t('ACCOUNT')} :
            </Col>
            <Col span={18}>
                {t('ADMIN')}
            </Col>
        </Row>
        <br/>

        <Row>
            <Col span={6}>
                {t('PERMISSION')} :
            </Col>
            <Col span={18}>
                {t(userInfo?.type)}
            </Col>
        </Row>
        <Divider />

        {/*<Row gutter={[15, 15]}>*/}
        {/*    <Col span={8}>*/}
        {/*        <ModifyPassword />*/}
        {/*    </Col>*/}
        {/*    <Col span={8}>*/}
        {/*        <Safety />*/}
        {/*    </Col>*/}
        {/*    <Col span={8}>*/}
        {/*        <FA2 />*/}
        {/*    </Col>*/}
        {/*</Row>*/}
    </section>
}

export default UserInfo
