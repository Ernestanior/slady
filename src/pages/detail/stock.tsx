import React, {FC} from "react";
import item1 from '../../assets/1.jpg'
import {Col, Row, Tabs} from "antd";
import Sl from "@/pages/detail/store/sl";
import Slady from "@/pages/detail/store/slady";

const { TabPane } = Tabs;

const Stock: FC = () => {
    return (
        <section>
            <Tabs defaultActiveKey="1">
                <TabPane tab="SL一店" key="1">
                    <Sl></Sl>
                </TabPane>
                <TabPane tab="Slady二店" key="2">
                    <Slady></Slady>
                </TabPane>
            </Tabs>

        </section>
    );
};

export default Stock;


