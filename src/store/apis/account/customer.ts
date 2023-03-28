import { AxiosRequestConfig } from 'axios';

/**
 * @class AgentAPI
 * @description 代理管理API
 * @return 返回request的config
 */
class CustomerAPI {

     CustomerList = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/api/customer/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    CustomerCreate = (params: {}, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/api/customer/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    CustomerModify = (params: {}, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/api/customer/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    CustomerDelete = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/api/customer/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    CustomerStatus = (params: any, data: {ids:number[], status:number }) => {
        const config: AxiosRequestConfig = {
            url: '/api/customer/change-status',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    SubsList = (params: {customerId:number}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/api/subscription/customer/list',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    SubsModify = (params: {}, data: ISubsModify) => {
        const config: AxiosRequestConfig = {
            url: '/api/subscription/customer/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

}

export default CustomerAPI;

interface ISubsModify{
    customerId:number;
    subscriptionItemList:ISubscriptionItem[]
}
export interface ISubscriptionItem{
    classificationId:number;
    period:number;
    status:number;
}
