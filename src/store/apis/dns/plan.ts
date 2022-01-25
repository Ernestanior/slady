/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IPlanListForm,
    IQuotaForm,
} from "./common.interface";

/**
 * @class PlanAPI
 * @description plan-controllerAPI
 * @return 返回request的config
 */
class PlanAPI {

    /**
     * findPlan
     * 生成请求参数
     */
    FindPlan = (params: IFindPlanParams, data: IPlanListForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/plan/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * increasePlanQuota
     * 生成请求参数
     */
    IncreasePlanQuota = (params: IIncreasePlanQuotaParams, data: IQuotaForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/plan/quota/increase',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * requestPlanUpgrade
     * 生成请求参数
     */
    RequestPlanUpgrade = (params: IRequestPlanUpgradeParams, data: IQuotaForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/plan/quota/request-upgrade',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    queryCustomerDnsService = (params: { id: number }, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/customer/view/dns/package',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    FindCustomerPlane = (params: IFindPlanParams, data: IPlanListForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/domain-plan/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * dns plane domain list
     */
    FindPlaneDomain = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/domain/list',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }
    /**
     * modify dns plane
     */
    ModifyPlane = (params: {}, data: { domainId: number, planId: number }) => {
        const config: AxiosRequestConfig = {
            url: '/dns/domain-plan/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    dnsQuotaModify = (params: {}, data: { customerId: number | null, planList: any[] }) => {
        const config: AxiosRequestConfig = {
            url: '/dns/plan/quota/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }



}
export default PlanAPI;


/** findPlan的请求参数*/
interface IFindPlanParams {
}

/** increasePlanQuota的请求参数*/
interface IIncreasePlanQuotaParams {
}

/** requestPlanUpgrade的请求参数*/
interface IRequestPlanUpgradeParams {
}
