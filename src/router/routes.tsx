import React, {FC} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import historyService from "@/store/history"
import LayoutPlx from "../common/layout";
import ItemList from "@/pages/design/index";
import Staff from "@/pages/staff";

import Profile from '@/pages/profile/index'
import OperationList from "@/pages/operation";
import Order from "@/pages/order";
import OrderHistory from "@/pages/orderHistory";
import Feedback from "@/pages/feedback";
import Rank from "@/pages/rank";
import StorageRecord from "@/pages/storage";
import CreateItem from "@/pages/design/create";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";

/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ModuleRouter:FC = () => {
    const userInfo = useAccountInfo()
    if (!userInfo){
        return null
    }
    if (userInfo?.type===E_USER_TYPE.SUPERADMIN){
        return <Router history={historyService}>
            <LayoutPlx>
                <Switch>
                    <Route path="/staff">
                        <Staff />
                    </Route>
                    <Redirect to="/staff" />
                </Switch>
            </LayoutPlx>
        </Router>
    }
    if (userInfo?.type===E_USER_TYPE.SALER){
        return <Router history={historyService}>
            <LayoutPlx>
                <Switch>
                    {/*<Route path="/item/images/:id">*/}
                    {/*    <ImgView />*/}
                    {/*</Route>*/}
                    {/*<Route path="/item/detail/:id">*/}
                    {/*    <Detail />*/}
                    {/*</Route>*/}
                    <Route path="/item/create">
                        <CreateItem />
                    </Route>
                    <Route path="/item">
                        <ItemList />
                    </Route>
                    <Route path="/order">
                        <Order />
                    </Route>
                    <Route path="/historyOrder">
                        <OrderHistory />
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
                    <Redirect to="/item" />
                </Switch>
            </LayoutPlx>
        </Router>
    }
    if (userInfo?.type===E_USER_TYPE.LOGISTICS){
        return <Router history={historyService}>
            <LayoutPlx>
                <Switch>
                    <Route path="/order">
                        <Order />
                    </Route>
                    <Route path="/feedback">
                        <Feedback />
                    </Route>
                    <Redirect to="/order" />
                </Switch>
            </LayoutPlx>
        </Router>
    }
    if (userInfo?.type===E_USER_TYPE.FINANCE){
        return <Router history={historyService}>
            <LayoutPlx>
                <Switch>
                    <Route path="/feedback">
                        <Feedback />
                    </Route>
                    <Redirect to="/feedback" />
                </Switch>
            </LayoutPlx>
        </Router>
    }
    if (userInfo?.type===E_USER_TYPE.PRODUCTMANAGEMENT){
        return <Router history={historyService}>
            <LayoutPlx>
                <Switch>
                    {/*<Route path="/item/images/:id">*/}
                    {/*    <ImgView />*/}
                    {/*</Route>*/}
                    {/*<Route path="/item/detail/:id">*/}
                    {/*    <Detail />*/}
                    {/*</Route>*/}
                    <Route path="/item/create">
                        <CreateItem />
                    </Route>
                    <Route path="/item">
                        <ItemList />
                    </Route>
                    <Route path="/rank">
                        <Rank />
                    </Route>
                    <Redirect to="/item" />
                </Switch>
            </LayoutPlx>
        </Router>
    }
    return <Router history={historyService}>
        <LayoutPlx>
            <Switch>
                {/*<Route path="/item/images/:id">*/}
                {/*    <ImgView />*/}
                {/*</Route>*/}
                {/*<Route path="/item/detail/:id">*/}
                {/*    <Detail />*/}
                {/*</Route>*/}
                <Route path="/item/create">
                    <CreateItem />
                </Route>
                <Route path="/item">
                    <ItemList />
                </Route>

                <Route path="/order">
                    <Order />
                </Route>
                <Route path="/historyOrder">
                    <OrderHistory />
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
