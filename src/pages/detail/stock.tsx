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
                <TabPane tab="Slady一店" key="1">
                    <Slady></Slady>
                </TabPane>
                <TabPane tab="SL二店" key="2">
                    <Sl></Sl>
                </TabPane>
            </Tabs>

        </section>
    );
};

export default Stock;


