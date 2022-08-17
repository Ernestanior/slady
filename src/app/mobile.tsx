import {FC} from "react";
import {useLanguage} from "@/locale";
import {IntlProvider} from "react-intl";
import Routers from "@/router";
import {SafeArea} from "antd-mobile";
import ModalX from "@/common/modal";
import PopupX from "@/common/popup";

const Mobile:FC = () => {
    const languagePackage = useLanguage();

    if (!languagePackage) {
        return null;
    }

    return (
        <IntlProvider messages={languagePackage} locale="en">
            <SafeArea position='top' />
            <PopupX />
            <ModalX />
            <Routers />
            <SafeArea position='bottom' />
        </IntlProvider>
    );
}

export default Mobile;
