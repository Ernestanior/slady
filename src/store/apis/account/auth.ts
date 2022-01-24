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

}
export default AuthAPI;


/** login的请求参数*/
interface ILoginParams {
}

/** logout的请求参数*/
interface ILogoutParams {
}