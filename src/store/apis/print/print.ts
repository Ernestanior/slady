/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class PrintAPI {
    ReceiptPage = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/receipt/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    ReceiptDelete = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/receipt/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    PrintDailyReport = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/print/daily/report',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    PrintReceipt = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/print/receipt',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    RePrintReceipt = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/print/reprint/receipt',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    PrintLabel = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/print/label',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }


}
export default PrintAPI;
