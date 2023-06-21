import { Layout } from "antd";
import { FC } from "react";
import "./index.less";
import isMobile from "@/app/isMobile";

const ContentP: FC = (props) => {
    if(isMobile){
        return <Layout.Content className="comp-layout-content-mobile">
            <section >
                {props.children}
            </section>
        </Layout.Content>;
    }
    return <Layout.Content className="comp-layout-content" style={{minHeight:800}}>
        <section className="cdn-scroll" style={{paddingRight: 15}}>
            {props.children}
        </section>
    </Layout.Content>;
};

export default ContentP;
