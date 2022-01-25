import { FC } from "react";
import { UserOutlined, PoweroffOutlined, ExclamationCircleOutlined, FileTextOutlined} from '@ant-design/icons';
import { Space, Row, Col  } from 'antd';
import Logo from "./logo.png";
import "./index.less";
import accountService from "@/store/account/service";

const HeaderPlx:FC = () => {
    return <nav className='comp-header'>
        <Row align="middle">
            <Col flex={1}>
                <span>
                    <img className="logo" src={Logo} alt="logo" />
                </span>
            </Col>
            <Col>
                <Space className="right-options" size="large">
                    <ExclamationCircleOutlined />
                    <FileTextOutlined />
                    <UserOutlined />
                    <PoweroffOutlined onClick={() => { accountService.autoLogout() }} />
                </Space>
            </Col>
        </Row>
    </nav>
}

export default HeaderPlx;
