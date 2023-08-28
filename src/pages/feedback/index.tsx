import React, {FC, useState} from "react";
import {Button, Tabs} from "antd";
import KoreaSlady from './korea/slady'
import KoreaSl from './korea/sl'
import HistorySlady from "@/pages/feedback/history/slady";
import HistorySl from "@/pages/feedback/history/sl";
import {WAREHOUSE} from "@/common/const";
import {useTranslation} from "react-i18next";
const { TabPane } = Tabs;
const Feedback: FC = () => {
    const [t]=useTranslation()
    const [payStatus,setPayStatus]=useState<boolean>(false)
    return (
        <section>
            <div style={{marginBottom:30}}>
                <Button type={payStatus?'default':'primary'} onClick={()=>setPayStatus(false)}>{t("UNPAID")}</Button>
                <Button type={payStatus?'primary':'default'} onClick={()=>setPayStatus(true)} style={{marginLeft:10}}>{t("PAID")}</Button>
            </div>
            {payStatus?<Tabs defaultActiveKey="1">
                <TabPane tab={WAREHOUSE.SLADY} key="1">
                    <HistorySlady></HistorySlady>
                </TabPane>
                <TabPane tab={WAREHOUSE.SL} key="2">
                    <HistorySl></HistorySl>
                </TabPane>
            </Tabs>:<Tabs defaultActiveKey="1">
                <TabPane tab={WAREHOUSE.SLADY} key="1">
                    <KoreaSlady></KoreaSlady>
                </TabPane>
                <TabPane tab={WAREHOUSE.SL} key="2">
                    <KoreaSl></KoreaSl>
                </TabPane>
            </Tabs>}

        </section>
    );
};

export default Feedback;


