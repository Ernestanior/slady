import React, {FC, useCallback} from "react";
import {Button, Tabs} from "antd";

import SingaporeSlady from './singapore/slady'
import SingaporeSl from './singapore/sl'
import {WAREHOUSE} from "@/common/const";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";
import request from "@/store/request";
import { systemService } from "@/store/apis/system";
import { reqAndReload } from "@/common/utils";

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
        </Tabs>
    );
};

export default Order;
