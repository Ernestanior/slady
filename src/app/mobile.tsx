import {FC} from "react";
import {useLanguage} from "@/locale";
import {IntlProvider} from "react-intl";
import Routers from "@/router";

const Mobile:FC = () => {
    const languagePackage = useLanguage();

    if (!languagePackage) {
        return null;
    }

    return (
        <IntlProvider messages={languagePackage} locale="en">
            <Routers />
        </IntlProvider>
    );
}

export default Mobile;
