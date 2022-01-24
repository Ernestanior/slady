import { FC } from "react";
import {Layout, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const AntSide = Layout.Sider

const Side:FC = () => {
    return <AntSide width={200} className="cdn-ly-side cdn-scroll">
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
                客户管理
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                销售部门
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                统计报表
            </Menu.Item>
        </Menu>
    </AntSide>
}

export default Side;
