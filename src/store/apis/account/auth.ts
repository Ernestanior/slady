/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    ILoginForm,
} from "./common.interface";

/**
 * @class AuthAPI
 * @description 登录退出API
 * @return 返回request的config
 */
class AuthAPI {

    /**
     * login
     * 生成请求参数
     */
    Login = (params: ILoginParams, data: ILoginForm) => {
        const config: AxiosRequestConfig = {
            url: '/auth/login',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * logout
     * 生成请求参数
     */
    Logout = (params: ILogoutParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/auth/logout',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }
    /**
     * regist
     * 生成请求参数
     */
    Regist = (params: ILogoutParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/auth/regist',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }
    /**
     * 获取二维码
     */
    ViewTwoFactorAuth = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/view/two-factor-auth',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * EnableTwoFactorAuth
     * 生成请求参数
     */
    EnableTwoFactorAuth = (params: {}, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/user/enable/two-factor-auth',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    DisableTwoFactorAuth = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/user/disable/two-factor-auth',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * validateTwoFactorPin
     * 生成请求参数
     */
    validateTwoFactorPin = (params: {}, data: {}) => {
        const config: any = {
            url: '/user/validate/two-factor-pin',
            method: 'put',
            params,
            data,
            __message:{disable:true}
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

}
export default AuthAPI;


/** login的请求参数*/
interface ILoginParams {
}

/** logout的请求参数*/
interface ILogoutParams {
}
