import React, {FC, useEffect} from "react";
import { Redirect, Router, Switch, Route } from "react-router-dom";
import useAccountInfo from "@/store/account";
import historyService from "@/store/history"
import Login from "@/pages/login";
import LayoutPlx from "../common/layout";
import accountService from "@/store/account/service";
import CustomerList from "@/pages/customerList";

/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ProjectRouter:FC = () => {
    const accountInfo = useAccountInfo();

    useEffect(() => {
        accountService.autoLogin();
    }, [])

    if(!accountInfo){
        return <Login />;
    }

    return <Router history={historyService}>
        <LayoutPlx>
            <Switch>
                <Route path="/customer">
                    <CustomerList />
                </Route>
                <Redirect to="/customer" />
            </Switch>
        </LayoutPlx>
    </Router>
}

export default ProjectRouter
