import React, {FC} from "react";
import {Tabs} from "antd";
import KoreaSlady from './korea/slady'
import KoreaSl from './korea/sl'
import SingaporeSlady from './singapore/slady'
import SingaporeSl from './singapore/sl'
const { TabPane } = Tabs;
const Feedback: FC = () => {
    return (
        <section>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Slady一店" key="1">
                    <KoreaSlady></KoreaSlady>
                </TabPane>
                <TabPane tab="SL二店" key="2">
                    <KoreaSl></KoreaSl>
                </TabPane>
            </Tabs>
        </section>
    );
};

export default Feedback;

const staticData = {

}
