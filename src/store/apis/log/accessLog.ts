/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IAccessLogForm,
} from "./common.interface";

/**
 * @class AccessLogAPI
 * @description access-log-controllerAPI
 * @return 返回request的config
 */
class AccessLogAPI {
    /**
     * delete
     * 生成请求参数
     */
    Delete = (params: IDeleteParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/access-log/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findAccessLog
     * 生成请求参数
     */
    FindAccessLog = (params: {}, data: IAccessLogForm) => {
        const config: AxiosRequestConfig = {
            url: '/api/access-log/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
}
export default AccessLogAPI;

/** delete的请求参数*/
interface IDeleteParams {
    id: string;
    index: string;
}

