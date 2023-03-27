import {FC} from "react";
import {Tabs} from "antd";
import Preference from "@/pages/profile/comp/preference";
import Authentication from "@/pages/profile/comp/authentication";
import Log from "@/pages/profile/comp/log";

const {TabPane}=Tabs
const UserInfo:FC = () => {
    return <section style={{padding: 15 }}>
        <Tabs type="card" destroyInactiveTabPane>
            <TabPane tab={"Preference"} key={"preference"}>
                <Preference/>
            </TabPane>
            <TabPane tab={"Authentication"} key={"authentication"}>
                <Authentication />
            </TabPane>
            <TabPane tab={"Login History"} key={"history"}>
                <Log/>
            </TabPane>
        </Tabs>
    </section>
}

export default UserInfo
