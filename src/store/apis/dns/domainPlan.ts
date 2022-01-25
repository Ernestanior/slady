/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IDnsPlanForm,
    IDomainPlanForm,
    IDomainPlanListForm,
} from "./common.interface";

/**
 * @class DomainPlanAPI
 * @description 域名套餐管理API
 * @return 返回request的config
 */
class DomainPlanAPI {
    
        /**
         * createDomainPlan
         * 生成请求参数
         */
        CreateDomainPlan = (params: ICreateDomainPlanParams, data: IDnsPlanForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain-plan/create/by-customer',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        DomainPlanListAvailable = (params: IDomainPlanAvailableParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain-plan/list/available-plan',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * modifyDomainPlan
         * 生成请求参数
         */
        ModifyDomainPlan = (params: IModifyDomainPlanParams, data: IDomainPlanForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain-plan/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * modifyDomainPlan
         * 生成请求参数
         */
        ModifyDomainPlanByCustomer = (params: IModifyDomainPlanParams, data: IDnsPlanForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain-plan/modify/by-customer',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findPlanByCustomer
         * 生成请求参数
         */
        FindPlanByCustomer = (params: IFindPlanByCustomerParams, data: IDomainPlanListForm) => {
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
         * findPlanUsage
         * 生成请求参数
         */
        FindPlanUsage = (params: IFindPlanUsageParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain-plan/usage',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
}
export default DomainPlanAPI;


/** createDomainPlan的请求参数*/
interface ICreateDomainPlanParams{
}

/** modifyDomainPlan的请求参数*/
interface IModifyDomainPlanParams{
}

/** modifyDomainPlan的请求参数*/
interface IModifyDomainPlanParams{
}

/** findPlanByCustomer的请求参数*/
interface IFindPlanByCustomerParams{
}

/** findPlanUsage的请求参数*/
interface IFindPlanUsageParams{
    customerId: number;
}

interface IDomainPlanAvailableParams{
    customerId: number;
}