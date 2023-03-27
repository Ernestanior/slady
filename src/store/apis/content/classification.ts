/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {ISearchPage} from "./common.interface";

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class ClassificationAPI {

    ClassList = (params: {}, data: IClassList) => {
        const config: AxiosRequestConfig = {
            url: '/api/classification/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    ClassModify = (params: {}, data: IClassModify) => {
        const config: AxiosRequestConfig = {
            url: '/api/classification/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    ClassDelete = (params: {}, data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/api/classification/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    ClassCreate = (params: {}, data: IClass) => {
        const config: AxiosRequestConfig = {
            url: '/api/classification/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
}
export default ClassificationAPI;


/** batchDelete的请求参数*/
interface IClassList{
    keyWord?:string;
    searchPage:ISearchPage;
}

/** batchDelete的请求参数*/
interface IClass{
    name:string;
}
interface IClassModify extends IClass{
    id:number;
}
