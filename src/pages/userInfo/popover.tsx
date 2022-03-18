import {FC} from "react";
import {UserOutlined} from "@ant-design/icons";
import {Popover} from "antd";
import UserInfo from "@/pages/userInfo/index";

const UserPopover:FC = () => {
    return <Popover zIndex={1000} style={{ position: "relative", right: "-5px" }} content={<UserInfo />} placement="bottomRight">
        <div style={{display: "inline-block", paddingRight: 12}}><UserOutlined style={{ cursor: "pointer" }} /></div>
    </Popover>
}

export default UserPopover;
