/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    INoticeForm,
} from "./common.interface";

/**
 * @class UserNoticeAPI
 * @description 用户通知管理API
 * @return 返回request的config
 */
class UserNoticeAPI {
    
        /**
         * createUserNotice
         * 生成请求参数
         */
        CreateUserNotice = (params: ICreateUserNoticeParams, data: INoticeForm) => {
            const config: AxiosRequestConfig = {
                url: '/user-notice/create',
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
        Delete = (params: IDeleteParams, data: INoticeForm) => {
            const config: AxiosRequestConfig = {
                url: '/user-notice/delete',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findUserNotice
         * 生成请求参数
         */
        FindUserNotice = (params: IFindUserNoticeParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/user-notice/list',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findEnableNoticeList
         * 生成请求参数
         */
        FindEnableNoticeList = (params: IFindEnableNoticeListParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/user-notice/list/enable',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * modifyUserNotice
         * 生成请求参数
         */
        ModifyUserNotice = (params: IModifyUserNoticeParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/user-notice/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
}
export default UserNoticeAPI;


/** createUserNotice的请求参数*/
interface ICreateUserNoticeParams{
    userId: number;
}

/** delete的请求参数*/
interface IDeleteParams{
    userId: number;
}

/** findUserNotice的请求参数*/
interface IFindUserNoticeParams{
    userId: number;
}

/** findEnableNoticeList的请求参数*/
interface IFindEnableNoticeListParams{
    customerId: number;
    noticeCol: string;
}

/** modifyUserNotice的请求参数*/
interface IModifyUserNoticeParams{
    userId: number;
}
