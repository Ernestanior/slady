import {FC, useState} from "react";
import {MenuOutlined} from '@ant-design/icons';
import { Row, Col  } from 'antd';
import Logo from "./logo.png";
import "./index.less";
import {Popup} from "antd-mobile";
import Nav from "@/common/layout/headerMobile/nav";


const HeaderPlx:FC = () => {
    const [visible,setVisible]=useState(false)
    return <nav className='mobile-header'>
        <Row align="middle">
            <MenuOutlined style={{fontSize:20,color: '#fff'}} onClick={() => {
                setVisible(true)
            }}/>
            <Col offset={6}>
                <span>
                    <img className="logo" src={Logo} alt="logo" />
                </span>
            </Col>
        </Row>
        <Popup
            visible={visible}
            onMaskClick={() => setVisible(false)}
            position='left'
            bodyStyle={{ width: '80vw' }}
        >
            <Nav onClose={()=>setVisible(false)}/>
        </Popup>
    </nav>
}

export default HeaderPlx;
