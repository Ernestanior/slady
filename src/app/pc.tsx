import {useLanguage} from "@/locale";
import {IntlProvider} from "react-intl";
import ModalX from "@/common/modal";
import Routers from "@/router";
import ModalF from "@/common/modal/modalF";

function PC() {
    const languagePackage = useLanguage();
    if (!languagePackage) {
        return null;
    }

    return (
        <div style={{minWidth:1400}}>
            <IntlProvider messages={languagePackage} locale="en">
                <ModalX />
                <ModalF/>
                <Routers />
            </IntlProvider>
        </div>
    );
}

export default PC;
