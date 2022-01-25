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

    QueryCustomerBySaleId = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/sale/list-customers',
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

