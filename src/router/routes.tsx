import React, {FC} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import historyService from "@/store/history"
import LayoutPlx from "../common/layout";
import ItemList from "@/pages/design/index";
import Staff from "@/pages/staff";

import Profile from '@/pages/profile/index'
import OperationList from "@/pages/operation";
import Detail from "@/pages/design/detail";
import Order from "@/pages/order";
import Feedback from "@/pages/feedback";
import Rank from "@/pages/rank";
import StorageRecord from "@/pages/storage";
import CreateItem from "@/pages/design/create";
import ImgView from "@/pages/design/imgView";
/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ModuleRouter:FC = () => {

    return <Router history={historyService}>
        <LayoutPlx>
            <Switch>
                <Route path="/item/images/:id">
                    <ImgView />
                </Route>
                <Route path="/item/detail/:design">
                    <Detail />
                </Route>
                <Route path="/item/create">
                    <CreateItem />
                </Route>
                <Route path="/item">
                    <ItemList />
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
                <Route path="/rank">
                    <Rank />
                </Route>
                <Route path="/storageRecord">
                    <StorageRecord />
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
