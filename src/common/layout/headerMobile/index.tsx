import {FC, useState} from "react";
import {MenuOutlined} from '@ant-design/icons';
import { Row, Col  } from 'antd';
import Logo from "./logo.png";
import "./index.less";
import {Popup} from "antd-mobile";
import Nav from "@/common/layout/headerMobile/nav";
import IconFont from "@/common/icon";
import historyService from "@/store/history";


const HeaderPlx:FC = () => {
    const [visible,setVisible]=useState(false)
    return <nav className='mobile-header'>
        <Row style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} >
            <MenuOutlined style={{fontSize:20,color: '#fff'}} onClick={() => {
                setVisible(true)
            }}/>
            <Col style={{textAlign:"center"}}>
                <span>
                    <img className="logo" src={Logo} alt="logo" />
                </span>
            </Col>
            <IconFont type="icongeren2" onClick={()=>historyService.push('/profile')} style={{fontSize:28,color: '#fff'}}/>
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
