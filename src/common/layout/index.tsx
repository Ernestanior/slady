import { FC } from "react";
import { Layout } from "antd";
import ContentP from "./content";
import HeaderPlx from "./header";
import HeaderMobile from "./headerMobile";
import SideBar from "./sider"
import {useLocation} from "react-router-dom";
import isMobile from "@/app/isMobile";

const LayoutPlx:FC = ({ children }) => {
    const location = useLocation();
    if(isMobile){
        return <Layout className="height-fill">
            <HeaderMobile />
            <Layout>
                <ContentP key={location.pathname}>{children}</ContentP>
            </Layout>
        </Layout>
    }
    return <Layout className="height-fill">
        <HeaderPlx />
        <Layout>
            <SideBar/>
            <ContentP key={location.pathname}>{children}</ContentP>
        </Layout>
    </Layout>
}

export default LayoutPlx
