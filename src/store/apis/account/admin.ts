/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {ISearchPage,} from "./common.interface";

/**
 * @class AgentAPI
 * @description 代理管理API
 * @return 返回request的config
 */
class AdminAPI {

        /**
         * createAgent
         * 生成请求参数
         */
        UserList = (params: { }, data: IUserList) => {
            const config: AxiosRequestConfig = {
                url: '/api/user/list',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    /**
     * Create
     * 生成请求参数
     */
    UserCreate = (params: {}, data: IUser) => {
        const config: AxiosRequestConfig = {
            url: '/api/user/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }
    /**
     * Modify
     * 生成请求参数
     */
    UserModify = (params: {}, data: IUser) => {
        const config: AxiosRequestConfig = {
            url: '/api/user/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    UserModifyPwd = (params: {}, data: IModifyPwd) => {
        const config: AxiosRequestConfig = {
            url: '/api/user/modify-pwd',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }
        /**
         * delete
         * 生成请求参数
         */
        UserDelete = (params: {}, data: number[]) => {
            const config: AxiosRequestConfig = {
                url: '/api/user/delete',
                method: 'delete',
                params,
                data
            };
            config.headers = {};
            return config;
        }
}
export default AdminAPI;


/** createAgent的请求参数*/
interface IUserList{
    keyWord?:string;
    searchPage:ISearchPage;

}
interface IUser{
    id:number;
    email:string;
    password?:string;
}
interface IModifyPwd{
    id:number;
    oldPassword:string;
    password:string;
}
