/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    ILineRangeForm,
    ILineRangeListForm,
} from "./common.interface";

/**
 * @class LineRangeAPI
 * @description 自定义线路管理API
 * @return 返回request的config
 */
class LineRangeAPI {
    
        /**
         * createLineRange
         * 生成请求参数
         */
        CreateLineRange = (params: ICreateLineRangeParams, data: ILineRangeForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line-range/create',
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
                url: '/dns/line-range/delete',
                method: 'delete',
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
        BatchDelete = (params: IDeleteParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line-range/delete/batch',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * modifyLineRange
         * 生成请求参数
         */
        ModifyLineRange = (params: IModifyLineRangeParams, data: ILineRangeForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line-range/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findLineRange
         * 生成请求参数
         */
        FindLineRange = (params: IFindLineRangeParams, data: ILineRangeListForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line-range/page',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
}
export default LineRangeAPI;


/** createLineRange的请求参数*/
interface ICreateLineRangeParams{
}

/** delete的请求参数*/
interface IDeleteParams{
    id: number;
}

/** delete的请求参数*/
interface IDeleteParams{
}

/** modifyLineRange的请求参数*/
interface IModifyLineRangeParams{
}

/** findLineRange的请求参数*/
interface IFindLineRangeParams{
}
