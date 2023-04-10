import React, {FC, lazy, useEffect, Suspense} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import historyService from "@/store/history"
import Login from "@/pages/login";
import SignUp from "@/pages/signUp";
import accountService, {E_LOGIN_STATE} from "@/store/account/service";
import useLoginState from "@/store/account/useLoginState";
import LoadContext from "@/common/loading/context";
const ModuleProject = lazy(() => import("@/router/routes"));

/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ProjectRouter:FC = () => {
    const loginState = useLoginState();
    /** 二级验证有效状态 */
    // const user2FAuthInfo = use2FAuthInfo();
    useEffect(() => {
        accountService.autoLogin()
    }, [])
    if(loginState === E_LOGIN_STATE.pending){
        // accountService.autoLogin()
        return <div>Pending</div>;

    }
    if(loginState === E_LOGIN_STATE.fail){
        return <Router history={historyService}>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Redirect to="/login" />
            </Switch>
        </Router>;
    }

    // if (!user2FAuthInfo) {
    //     return (
    //         <Router history={historyService}>
    //             <Switch>
    //                 <Route path="/verify-2fa">
    //                     <DualAuth2FAGuide />
    //                 </Route>
    //                 <Redirect to="/verify-2fa" />
    //             </Switch>
    //         </Router>
    //     )
    // }

    return <Suspense fallback={<LoadContext />}>
        <ModuleProject />
    </Suspense>
}

export default ProjectRouter
