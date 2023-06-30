/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IUserForm,
    IUserListForm,
    IUserPwdForm,
} from "./common.interface";

/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class UserAPI {

    /**
     * viewUserBasic
     * 生成请求参数
     */
    ViewUserBasic = (params: IViewUserBasicParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/basic',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * createUser
     * 生成请求参数
     */
    CreateUser = (params: ICreateUserParams, data: IUserForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/create',
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
    DeleteUser = (params: {}, data: any[]) => {
        const config: AxiosRequestConfig = {
            url: '/user/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }


    /**
     * findUser
     * 生成请求参数
     */
    FindUser = (params: IFindUserParams, data: IUserListForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyUser
     * 生成请求参数
     */
    ModifyUser = (params: IModifyUserParams, data: IUserForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyPwd
     * 生成请求参数
     */
    ModifyPwd = (params: {}, data: IUserPwdForm) => {
        const config: AxiosRequestConfig = {
            url: '/user/modify-pwd',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }


}
export default UserAPI;

/** viewUserBasic的请求参数*/
interface IViewUserBasicParams {
}

/** createUser的请求参数*/
interface ICreateUserParams {
}

/** findUser的请求参数*/
interface IFindUserParams {
}

/** modifyUser的请求参数*/
interface IModifyUserParams {
}

