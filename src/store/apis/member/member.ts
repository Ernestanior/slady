/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class MemberAPI {

    MemberList = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/member/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    MemberDetail = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/member/fetch-by-id',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    MemberModify= (params: {}, data:{} ) => {
        const config: AxiosRequestConfig = {
            url: '/member/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    MemberCreate = (params: {}, data: {  }) => {
        const config: AxiosRequestConfig = {
            url: '/member/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    MemberDelete = (params: {}, data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/member/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    MemberTopUp = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/member/top-up',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
}
export default MemberAPI;
