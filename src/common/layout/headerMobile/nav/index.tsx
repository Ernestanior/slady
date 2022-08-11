import {FC, useMemo} from "react";
import { Menu} from 'antd';
import {Link, useLocation} from "react-router-dom"
import menuList from "@/common/layout/sider/config";
import useAccountInfo from "@/store/account";
import Logo from "@/pages/login/images/logo.png";
import './index.less'
import accountService from "@/store/account/service";
import ConfirmInfo from "@/common/confirm";

const { SubMenu } = Menu;

interface IProps{
    onClose:()=>void;
}
const Side:FC<IProps> = ({onClose}) => {
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
                menu.childs.forEach(subMenu => {
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

    return <div className="mobile-nav">
        <section className="mobile-nav-body">
            <img className="logo" src={Logo} alt="logo" />
            <Menu selectedKeys={selectKeys} className="mobile-menu-list" mode="inline">
                {
                    _menuList.map(menu => {
                        if(menu.childs){
                            return <SubMenu key={menu.text} title={menu.text} className="mobile-menu-item">
                                {
                                    menu.childs.map(subMenu => {
                                        return <Menu.Item key={subMenu.url} className="mobile-menu-item">
                                            <Link to={subMenu.url} onClick={onClose}>
                                                {subMenu.text}
                                            </Link>
                                        </Menu.Item>
                                    })
                                }
                            </SubMenu>
                        }
                        return <Menu.Item key={menu.url} className="mobile-menu-item">
                            <Link to={menu.url} onClick={onClose}>
                                {menu.text}
                            </Link>
                        </Menu.Item>
                    })
                }
            </Menu>
        </section>

        <section className="mobile-nav-footer">
            <div className="mobile-footer-list">
                {
                    footList.map(item=><Link to={item.url} onClick={onClose} className="footer-item">{item.label}</Link>)
                }
            </div>

            <ConfirmInfo info="确定退出登录？" submit={() => { accountService.autoLogout() }}>
                <div className="logout">Log out</div>
            </ConfirmInfo>
        </section>
    </div>
}

export default Side;

const footList = [
    { label:"个人中心",url:""},
    { label:"我的工单",url:""},
    { label:"用户操作手册",url:""},
    { label:"创建工单",url:""},
    { label:"API文档",url:""},
]