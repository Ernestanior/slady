import React, {FC} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import historyService from "@/store/history"
import LayoutPlx from "../common/layout";
import ItemList from "@/pages/items/index";
import ResetPwd from "@/pages/resetPwd";
import Staff from "@/pages/staff";

import Profile from '@/pages/profile/index'
import TopSale from "@/pages/topSale";
import BotSale from "@/pages/botSale";
import OperationList from "@/pages/operation";
import Detail from "@/pages/detail";
import Order from "@/pages/order";
import Feedback from "@/pages/feedback";
import Import from "@/pages/import";
import Export from "@/pages/export";
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
                <Route path="/item/detail">
                    <Detail />
                </Route>
                <Route path="/item">
                    <ItemList />
                </Route>
                <Route exact path="/staff/resetPwd/:name/:id">
                    <ResetPwd />
                </Route>
                <Route path="/order">
                    <Order />
                </Route>
                <Route path="/staff">
                    <Staff />
                </Route>
                <Route path="/feedback">
                    <Feedback />
                </Route>
                <Route path="/topsale">
                    <TopSale />
                </Route>
                <Route path="/botsale">
                    <BotSale />
                </Route>
                <Route path="/import">
                    <Import />
                </Route>
                <Route path="/export">
                    <Export />
                </Route>
                <Route path="/operate">
                    <OperationList />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Redirect to="/item" />
            </Switch>
        </LayoutPlx>
    </Router>
}

export default ModuleRouter
