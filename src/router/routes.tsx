import React, {FC} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import historyService from "@/store/history"
import LayoutPlx from "../common/layout";
import ItemList from "@/pages/items/index";
import ResetPwd from "@/pages/resetPwd";
import Staff from "@/pages/staff";
import ClassificationPage from "@/pages/content/classifications";
import VideoPage from "@/pages/content/video";

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
                <Route path="/item">
                    <ItemList />
                </Route>
                <Route exact path="/staff/resetPwd/:name/:id">
                    <ResetPwd />
                </Route>
                <Route path="/staff">
                    <Staff />
                </Route>
                <Route path="/contents/slady">
                    <VideoPage />
                </Route>
                <Route path="/contents/sl">
                    <ClassificationPage />
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
