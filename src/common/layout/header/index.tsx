import { FC } from "react";
import {PoweroffOutlined, ExclamationCircleOutlined, FileTextOutlined} from '@ant-design/icons';
import { Space, Row, Col  } from 'antd';
import Logo from "./logo.png";
import "./index.less";
import accountService from "@/store/account/service";
import ConfirmInfo from "@/common/confirm";
import UserPopover from "@/pages/userInfo/popover";

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
                    <UserPopover />
                    <ConfirmInfo info="确定退出登录？" submit={() => { accountService.autoLogout() }}>
                        <PoweroffOutlined />
                    </ConfirmInfo>
                </Space>
            </Col>
        </Row>
    </nav>
}

export default HeaderPlx;
