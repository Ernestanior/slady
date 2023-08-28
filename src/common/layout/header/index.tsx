import { FC } from "react";
import {Space, Row, Col, Select} from 'antd';
import Logo from "./logo.png";
import "./index.less";
import accountService from "@/store/account/service";
import ConfirmInfo from "@/common/confirm";
import UserPopover from "@/pages/userInfo/popover";
import IconFont from "@/common/icon";
import useStore from "@/store/store";

const HeaderPlx:FC = () => {
    const {language,setLanguage}=useStore()
    console.log(language)
    return <nav className='comp-header'>
        <Row align="middle">
            <Col flex={1}>
                <span>
                    <img className="logo" src={Logo} alt="logo" />
                </span>
            </Col>
            <Col style={{marginRight:50}}>
                <Select value={language} onSelect={setLanguage} style={{width:150}} options={[{label:"English",value:"en_US"},{label:"中文",value:"zh_CN"}]}></Select>
            </Col>
            <Col>
                <Space className="right-options" size="large">
                    {/*<IconFont*/}
                    {/*    className="ant-dropdown-link"*/}
                    {/*    style={{ fontSize: 24 }}*/}
                    {/*    type="icon-customer-bussinessman"*/}
                    {/*/>*/}
                    <UserPopover />
                    <ConfirmInfo info="Confirm logout?" submit={() => { accountService.autoLogout() }}>
                        <IconFont type="icon-shut-down" style={{fontSize:24}}/>
                    </ConfirmInfo>
                </Space>
            </Col>
        </Row>
    </nav>
}

export default HeaderPlx;
