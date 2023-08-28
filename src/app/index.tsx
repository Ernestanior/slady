import {Component, FC, lazy, Suspense, useEffect} from "react";
import ErrorPage from "@/error";
import isMobile from "@/app/isMobile";
import "@/styles/index.less"
import en_US from '../locale/en_US';
import zh_CN from '../locale/zh_CN';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import useStore from "@/store/store";
const Mobile = lazy(() => import("@/app/mobile"))
const PC = lazy(() => import("@/app/pc"))

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en_US: {translation: en_US},
        zh_CN: {translation: zh_CN},
    },
    lng: 'en_US', // 默认语言
    fallbackLng: 'en_US', // 未找到翻译时的回退语言
    interpolation: {
        escapeValue: false,
    },
});
class App extends Component {
    state = {
        isError: false
    };

    render() {
        if (this.state.isError) {
            return <ErrorPage />;
        }
        if(isMobile){
            return <Mobile />
        }
        return <PC />;
    }
    componentDidCatch() {
        this.setState({
            isError: true,
        });
    }
}

const AppContainer:FC = () => {
    const {language} = useStore()

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return <Suspense fallback={<div>loading</div>}>
        <App />
    </Suspense>
}

export default AppContainer;
