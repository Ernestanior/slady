import React, {FC} from "react";
import {Tabs} from "antd";
import KoreaSlady from './korea/slady'
import KoreaSl from './korea/sl'
import SingaporeSlady from './singapore/slady'
import SingaporeSl from './singapore/sl'
const { TabPane } = Tabs;

export enum areaType{
    ALL,
    SINGAPORE,
    KOREA,
    CHINA
}
export enum orderType{
    NULL='0',
    PENDING='1',
    DONE='2',
    SEND='3',
    CANCELREQUEST='4',

}
const Order: FC = () => {
    return (
        <section>
                <Tabs defaultActiveKey="1" type={"card"}>
                    <TabPane tab="店内" key="1">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Slady一店" key="1">
                                <SingaporeSlady></SingaporeSlady>
                            </TabPane>
                            <TabPane tab="SL二店" key="2">
                                <SingaporeSl></SingaporeSl>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab="韩国" key="2">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Slady一店" key="1">
                                <KoreaSlady></KoreaSlady>
                            </TabPane>
                            <TabPane tab="SL二店" key="2">
                                <KoreaSl></KoreaSl>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                </Tabs>
        </section>
    );
};

export default Order;

const staticData = {

}
