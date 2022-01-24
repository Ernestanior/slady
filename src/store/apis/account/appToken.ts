/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IAppTokenForm,
    IAppTokenListForm,
} from "./common.interface";

/**
 * @class AppTokenAPI
 * @description Token管理API
 * @return 返回request的config
 */
class AppTokenAPI {
    
        /**
         * createAppToken
         * 生成请求参数
         */
        CreateAppToken = (params: ICreateAppTokenParams, data: IAppTokenForm) => {
            const config: AxiosRequestConfig = {
                url: '/app-token/create',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * delete
         * 生成请求参数
         */
        Delete = (params: IDeleteParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/app-token/delete',
                method: 'delete',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findAppToken
         * 生成请求参数
         */
        FindAppToken = (params: IFindAppTokenParams, data: IAppTokenListForm) => {
            const config: AxiosRequestConfig = {
                url: '/app-token/list',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * modifyAppToken
         * 生成请求参数
         */
        ModifyAppToken = (params: IModifyAppTokenParams, data: IAppTokenForm) => {
            const config: AxiosRequestConfig = {
                url: '/app-token/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
}
export default AppTokenAPI;


/** createAppToken的请求参数*/
interface ICreateAppTokenParams{
    customerId: number;
}

/** delete的请求参数*/
interface IDeleteParams{
    id: string;
}

/** findAppToken的请求参数*/
interface IFindAppTokenParams{
}

/** modifyAppToken的请求参数*/
interface IModifyAppTokenParams{
}
