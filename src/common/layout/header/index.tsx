import { FC } from "react";
import { Space, Row, Col  } from 'antd';
import Logo from "./logo.svg";
import "./index.less";
import accountService from "@/store/account/service";
import ConfirmInfo from "@/common/confirm";
import UserPopover from "@/pages/userInfo/popover";
import IconFont from "@/common/icon";

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
                    <IconFont
                        className="ant-dropdown-link"
                        style={{ fontSize: 24 }}
                        type="iconai-i"
                    />
                    <UserPopover />
                    <ConfirmInfo info="确定退出登录？" submit={() => { accountService.autoLogout() }}>
                        <IconFont type="iconicon" style={{fontSize:24}}/>
                    </ConfirmInfo>
                </Space>
            </Col>
        </Row>
    </nav>
}

export default HeaderPlx;
