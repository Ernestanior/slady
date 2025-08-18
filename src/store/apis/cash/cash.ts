import { AxiosRequestConfig } from 'axios';

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class CashAPI {
    CashPage = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/cash/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    CashCreate = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/cash/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    CashDelete = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/cash/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    CashDrawerPage = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/cashDrawer/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    CashDrawerCreate = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/cashDrawer/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    CashDrawerDelete = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/cashDrawer/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

}
export default CashAPI;
