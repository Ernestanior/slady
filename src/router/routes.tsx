import React, {FC} from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import historyService from "@/store/history"
import LayoutPlx from "../common/layout";
import CustomerList from "@/pages/customerList";
import CreateCustomer from "@/pages/customer/create";
import ModifyCustomerPage from "@/pages/customer/modify";
import ResetPwd from "@/pages/resetPwd";
import SaleList from "@/pages/saleList";
import CreateSale from "@/pages/sale/create";
import ModifySalePage from "@/pages/sale/modify";
import StatisticsList from "@/pages/statistics/list";
import SaleAssignPage from "@/pages/sale/assignCustomer";
import ViewStatistics from "@/pages/statistics/view";
import ArchiveDomains from "@/pages/archive/domains";
import ArchiveCustomer from "@/pages/archive/customers";
import CDNSiteList from "@/pages/cdn/site";
import PerformSta from "@/pages/cdn/site/statistics/performance";

import CDNDomains from "@/pages/cdn/domain";
import NewsList from "@/pages/news/list";
import NewsCreate from "@/pages/news/create";
import NewsUpdate from "@/pages/news/update";
import CustomerService from "@/pages/customerService";
import SendEmail from "@/pages/tool/sendEmail";
import CreateEmail from "@/pages/tool/sendEmail/create";
import DetailEmail from "@/pages/tool/sendEmail/detail";
import SubAccountQuery from "@/pages/tool/subAccountQuery";
import Profile from '@/pages/userInfo/mobilePage'
import OperateLog from "@/pages/cdn/operateLog";
/**
 * 项目路由组件
 * 可以在此根据用户相应的权限组装路由
 * @constructor
 */
const ModuleRouter:FC = () => {

    return <Router history={historyService}>
        <LayoutPlx>
            <Switch>
                <Route exact path="/customer/modify/:type/:id">
                    <ModifyCustomerPage />
                </Route>
                <Route exact path="/customer/resetPwd/:name/:id">
                    <ResetPwd />
                </Route>
                <Route path="/customer/create">
                    <CreateCustomer />
                </Route>
                <Route path="/customer">
                    <CustomerList />
                </Route>
                <Route path="/sale/assign/:id">
                    <SaleAssignPage />
                </Route>
                <Route path="/sale/modify/:id">
                    <ModifySalePage />
                </Route>
                <Route exact path="/sale/resetPwd/:name/:id">
                    <ResetPwd />
                </Route>
                <Route path="/sale/create">
                    <CreateSale />
                </Route>
                <Route path="/sale">
                    <SaleList />
                </Route>
                <Route path="/statistics/:id">
                    <ViewStatistics />
                </Route>
                <Route path="/statistics">
                    <StatisticsList />
                </Route>
                <Route path="/cdn/siteList/defend-sta/:id">
                    <CDNSiteList />
                </Route>
                <Route path="/cdn/siteList/perform-sta/:id">
                    <PerformSta />
                </Route>
                <Route path="/cdn/siteList">
                    <CDNSiteList />
                </Route>

                <Route path="/cdn/record">
                    <CDNDomains />
                </Route>
                <Route path="/cdn/operate-log">
                    <OperateLog />
                </Route>
                <Route path="/archive/domain">
                    <ArchiveDomains />
                </Route>
                <Route path="/archive/customer">
                    <ArchiveCustomer />
                </Route>
                <Route path="/news/create">
                    <NewsCreate />
                </Route>
                <Route path="/news/:id" exact>
                    <NewsUpdate />
                </Route>
                <Route path="/news">
                    <NewsList />
                </Route>
                <Route path="/contact-service">
                    <CustomerService />
                </Route>
                <Route path="/email/create">
                    <CreateEmail />
                </Route>
                <Route path="/email/:id">
                    <DetailEmail />
                </Route>
                <Route path="/email">
                    <SendEmail />
                </Route>
                <Route path="/sub-account-query">
                    <SubAccountQuery />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Redirect to="/customer" />
            </Switch>
        </LayoutPlx>
    </Router>
}

export default ModuleRouter
