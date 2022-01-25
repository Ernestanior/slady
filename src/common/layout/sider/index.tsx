import { FC } from "react";
import {Layout, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom"

const AntSide = Layout.Sider

const Side:FC = () => {
    return <AntSide width={200} className="cdn-ly-side cdn-scroll">
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/customer">
                    客户管理
                </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/sale">
                    销售部门
                </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                <Link to="/statistics">
                    统计报表
                </Link>
            </Menu.Item>
        </Menu>
    </AntSide>
}

export default Side;
