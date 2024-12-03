import React, {FC, useMemo} from "react";
import {Layout, Menu} from 'antd';
import {Link, useLocation} from "react-router-dom"
import menuList from "@/common/layout/sider/config";
import useAccountInfo from "@/store/account";
import IconFont from "@/common/icon";
import {useTranslation} from "react-i18next";

const AntSide = Layout.Sider

const { SubMenu } = Menu;


const Side:FC = () => {
    const {t} = useTranslation();
    const info = useAccountInfo();
    const _menuList = useMemo(() => {
        return menuList.filter(menu => {
            if(menu.role){
                if(!info){
                    return false
                }
                return menu.role.includes(info.type)
            }
            return true
        })
    }, [info])

    const location = useLocation();
    const url = location.pathname;

    const selectKeys = useMemo(() => {
        const keys: string[] =[]
        _menuList.forEach(menu => {
            if(menu.childs){
                menu.childs.forEach((subMenu:any) => {
                    if(url.indexOf(subMenu.url) === 0){
                        keys.push(subMenu.url)
                    }
                })
                return;
            }
            if(url.indexOf(menu.url) === 0){
                keys.push(menu.url)
            }
        })
        return keys
    }, [url, _menuList])

    return <AntSide width={250} >
        <Menu selectedKeys={selectKeys} mode="inline" style={{fontWeight:550,marginTop:20}}>
            {
                _menuList.map(menu => {
                    if(menu.childs){
                        return <SubMenu key={menu.text} title={t(menu.text)} style={{margin:"15px 0"}} icon={<IconFont type={menu.icon} style={{fontSize:24}}/>}>
                            {
                                menu.childs.map((subMenu:any) => {
                                    return <Menu.Item key={subMenu.url} >
                                        <Link to={subMenu.url}>
                                            {t(subMenu.text)}
                                        </Link>
                                    </Menu.Item>
                                })
                            }
                        </SubMenu>
                    }
                    if (menu.icon){
                        return <Menu.Item key={menu.url} style={{margin:"15px 0"}} icon={<IconFont type={menu.icon} style={{fontSize:24}}/>}>
                            <Link to={menu.url}>
                                {t(menu.text)}
                            </Link>
                        </Menu.Item>
                    }
                    return <Menu.Item key={menu.url} style={{margin:"15px 0"}}>
                        <Link to={menu.url}>
                            {t(menu.text)}
                        </Link>
                    </Menu.Item>
                })
            }
            {/*<div style={{position:"absolute",bottom:20,left:20}}>{ process.env.REACT_APP_VERSION || ""}</div>*/}
        </Menu>

    </AntSide>
}

export default Side;
