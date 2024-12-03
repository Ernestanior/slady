/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class MemberRecordAPI {

    MemberRecordList = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/memberPurchaseHistory/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    MemberRecordModify= (params: {}, data:{} ) => {
        const config: AxiosRequestConfig = {
            url: '/memberPurchaseHistory/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    MemberRecordCreate = (params: {}, data: {  }) => {
        const config: AxiosRequestConfig = {
            url: '/memberPurchaseHistory/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    MemberRecordDelete = (params: {}, data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/memberPurchaseHistory/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }


}
export default MemberRecordAPI;
