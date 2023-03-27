/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {ISearchPage} from "./common.interface";

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class StreamAPI {
    StreamList = (params: {}, data: IStreamList) => {
        const config: AxiosRequestConfig = {
            url: '/api/stream/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    StreamModify = (params: {}, data: IStreamModify) => {
        const config: AxiosRequestConfig = {
            url: '/api/stream/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    StreamDelete = (params: {}, data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/api/stream/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    StreamCreate = (params: {}, data: IStream) => {
        const config: AxiosRequestConfig = {
            url: '/api/stream/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }
}
export default StreamAPI;


/** batchDelete的请求参数*/
interface IStreamList{
    keyWord?:string;
    searchPage:ISearchPage;
}

/** batchDelete的请求参数*/
export interface IStream{
    file:any;
    image?:any;
    streamForm:IStreamForm;
}
interface IStreamModify extends IStream{
    id:number;
}
interface IStreamForm {

}
