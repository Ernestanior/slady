/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    ILineGroupForm,
    ILineGroupListForm,
} from "./common.interface";

/**
 * @class LineGroupAPI
 * @description 自定义线路组管理API
 * @return 返回request的config
 */
class LineGroupAPI {
    
        /**
         * createLineGroup
         * 生成请求参数
         */
        CreateLineGroup = (params: ICreateLineGroupParams, data: ILineGroupForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line-group/create',
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
                url: '/dns/line-group/delete',
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
                url: '/dns/line-group/delete/batch',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * modifyLineGroup
         * 生成请求参数
         */
        ModifyLineGroup = (params: IModifyLineGroupParams, data: ILineGroupForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line-group/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findLineGroup
         * 生成请求参数
         */
        FindLineGroup = (params: IFindLineGroupParams, data: ILineGroupListForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line-group/page',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
}
export default LineGroupAPI;


/** createLineGroup的请求参数*/
interface ICreateLineGroupParams{
}

/** delete的请求参数*/
interface IDeleteParams{
    id: number;
}

/** delete的请求参数*/
interface IDeleteParams{
}

/** modifyLineGroup的请求参数*/
interface IModifyLineGroupParams{
}

/** findLineGroup的请求参数*/
interface IFindLineGroupParams{
}
