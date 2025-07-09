import React, {FC} from "react";
import {Tabs} from "antd";

import SingaporeSlady from './singapore/slady'
import SingaporeSl from './singapore/sl'
import SingaporeLive from './singapore/live'
import {WAREHOUSE} from "@/common/const";
import useAccountInfo from "@/store/account";


const { TabPane } = Tabs;

export enum areaType{
    ALL,
    SINGAPORE,
    KOREA,
    CHINA
}
export enum orderType{
    PENDING='0',
    SENT='1',
    OK='2',
    STOCKOUT='3',
    DAMAGED='4'
}
const Order: FC = () => {
    const userInfo = useAccountInfo()


    
    if (!userInfo) return null;


    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab={WAREHOUSE.SLADY} key="1">
                <SingaporeSlady></SingaporeSlady>
            </TabPane>
            <TabPane tab={WAREHOUSE.SL} key="2">
                <SingaporeSl></SingaporeSl>
            </TabPane>
            <TabPane tab={WAREHOUSE.LIVE} key="3">
                <SingaporeLive></SingaporeLive>
            </TabPane>
        </Tabs>
    );
};

export default Order;
