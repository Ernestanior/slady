import React, {FC} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import historyService from "@/store/history"
import LayoutPlx from "../common/layout";
import CustomerList from "@/pages/admin";
import ResetPwd from "@/pages/resetPwd";
import SaleList from "@/pages/customer";
import ClassificationPage from "@/pages/content/classifications";
import VideoPage from "@/pages/content/video";
import StreamPage from "@/pages/content/stream";

import Profile from '@/pages/profile/index'
/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ModuleRouter:FC = () => {

    return <Router history={historyService}>
        <LayoutPlx>
            <Switch>
                <Route exact path="/admin/resetPwd/:name/:id">
                    <ResetPwd />
                </Route>
                <Route path="/admin">
                    <CustomerList />
                </Route>
                <Route exact path="/customer/resetPwd/:name/:id">
                    <ResetPwd />
                </Route>
                <Route path="/customer">
                    <SaleList />
                </Route>
                <Route path="/contents/video">
                    <VideoPage />
                </Route>
                <Route path="/contents/classifications">
                    <ClassificationPage />
                </Route>
                <Route path="/contents/stream">
                    <StreamPage />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Redirect to="/admin" />
            </Switch>
        </LayoutPlx>
    </Router>
}

export default ModuleRouter
