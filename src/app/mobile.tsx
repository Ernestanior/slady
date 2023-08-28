import {FC} from "react";
import Routers from "@/router";
import {SafeArea} from "antd-mobile";
import ModalX from "@/common/modal";
import PopupX from "@/common/popup";

const Mobile:FC = () => {

    return (
        <>
            <SafeArea position='top' />
            <PopupX />
            <ModalX />
            <Routers />
            <SafeArea position='bottom' />
        </>
    );
}

export default Mobile;
