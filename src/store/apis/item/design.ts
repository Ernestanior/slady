/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {ISearchPage} from "./common.interface";

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class DesignAPI {

    DesignList = (params: {}, data: IDesignList) => {
        const config: AxiosRequestConfig = {
            url: '/design/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    DesignPage = (params: {}, data: IDesignList) => {
        const config: AxiosRequestConfig = {
            url: '/design/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    DesignDetail = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/design/detail',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    DesignModify = (params: {}, data: IDesignModify) => {
        const config: AxiosRequestConfig = {
            url: '/design/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    DesignDelete = (params: {}, data: any[]) => {
        const config: AxiosRequestConfig = {
            url: '/design/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    DesignCreate = (params: {}, data: IDesign) => {
        const config: AxiosRequestConfig = {
            url: '/design/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
}
export default DesignAPI;


/** batchDelete的请求参数*/
interface IDesignList{
    type?:string;
    design?:string;
    name?:string;
    searchPage:ISearchPage;
}

/** batchDelete的请求参数*/
interface IDesign{
    name:string;
}
interface IDesignModify extends IDesign{
    id:number;
}
