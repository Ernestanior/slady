import {useLanguage} from "@/locale";
import {IntlProvider} from "react-intl";
import ModalX from "@/common/modal";
import Routers from "@/router";

function PC() {
    const languagePackage = useLanguage();

    if (!languagePackage) {
        return null;
    }

    return (
        <IntlProvider messages={languagePackage} locale="en">
            <ModalX />
            <Routers />
        </IntlProvider>
    );
}

export default PC;
