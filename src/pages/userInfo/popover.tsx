import {FC} from "react";
import {Popover} from "antd";
import UserInfo from "@/pages/userInfo/index";
import IconFont from "@/common/icon";

const UserPopover:FC = () => {
    return <Popover zIndex={1000} style={{ position: "relative", right: "-5px" }} content={<UserInfo />} placement="bottomRight">
        <div style={{display: "inline-block", paddingRight: 12}}>
            <IconFont style={{ fontSize: 24 }} type="icon-customer-bussinessman"/>
        </div>
    </Popover>
}

export default UserPopover;
