import { AxiosRequestConfig } from 'axios';

/**
 * @class AgentAPI
 * @description 代理管理API
 * @return 返回request的config
 */
class SaleAPI {

     QueryList = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/sale/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    CreateSale = (params: {}, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/sale/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    ModifySale = (params: {}, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/sale/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    Delete = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/sale/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 全部直属客户
     * @param params
     * @param data
     * @constructor
     */
    QueryAllCustomerCanAssign = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/customer/list-direct',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 已经销售的直属客户
     * @param params
     * @param data
     * @constructor
     */
    QueryCustomerBySaleId = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/customer/find-by-sale',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    AssignCustomer = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/sale/assign-customer-agent',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 被指派的代理
     * @param params
     * @param data
     * @constructor
     */
    QueryAgentBySaleId = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/agent/find-by-sale',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    viewSale = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/sale/view',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
}

export default SaleAPI;

