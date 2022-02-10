import { FC } from "react";
import { Layout } from "antd";
import ContentP from "./content";
import HeaderPlx from "./header";
import SideBar from "./sider"
import {useLocation} from "react-router-dom";

const LayoutPlx:FC = ({ children }) => {
    const location = useLocation();
    return <Layout className="height-fill">
        <HeaderPlx />
        <Layout>
            <SideBar/>
            <ContentP key={location.pathname}>{children}</ContentP>
        </Layout>
    </Layout>
}

export default LayoutPlx
