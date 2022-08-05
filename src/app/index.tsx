import {Component, FC, lazy, Suspense} from "react";
import ErrorPage from "@/error";
import isMobile from "@/app/isMobile";
import "@/styles/index.less"

const Mobile = lazy(() => import("@/app/mobile"))
const PC = lazy(() => import("@/app/pc"))

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
    return <Suspense fallback={<div>loading</div>}>
        <App />
    </Suspense>
}

export default AppContainer;
