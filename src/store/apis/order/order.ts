/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class OrderAPI {

    OrderList = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/order/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    OrderModify= (params: {}, data:{} ) => {
        const config: AxiosRequestConfig = {
            url: '/order/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    OrderModifyStatus= (params: {}, data:[] ) => {
        const config: AxiosRequestConfig = {
            url: '/order/modify-payment-status',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    OrderDelete = (params: {}, data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/order/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    OrderCreate = (params: {}, data: {  }) => {
        const config: AxiosRequestConfig = {
            url: '/order/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    OrderCount = (params: {}, data: {  }) => {
        const config: AxiosRequestConfig = {
            url: '/order/count',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    OrderExport = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/order/export',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }


}
export default OrderAPI;
