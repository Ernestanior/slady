/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IResourceForm,
    IResourceListForm,
} from "./common.interface";

/**
 * @class ResourceAPI
 * @description 资源管理API
 * @return 返回request的config
 */
class ResourceAPI {
    
        /**
         * createResource
         * 生成请求参数
         */
        CreateResource = (params: ICreateResourceParams, data: IResourceForm) => {
            const config: AxiosRequestConfig = {
                url: '/resource/create',
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
                url: '/resource/delete',
                method: 'delete',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findByUriAndMethod
         * 生成请求参数
         */
        FindByUriAndMethod = (params: IFindByUriAndMethodParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/resource/find-by-uri-and-method',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findResource
         * 生成请求参数
         */
        FindResource = (params: IFindResourceParams, data: IResourceListForm) => {
            const config: AxiosRequestConfig = {
                url: '/resource/list',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * modifyResource
         * 生成请求参数
         */
        ModifyResource = (params: IModifyResourceParams, data: IResourceForm) => {
            const config: AxiosRequestConfig = {
                url: '/resource/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findOne
         * 生成请求参数
         */
        FindOne = (params: IFindOneParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/resource/view',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }


    /**
     * findOne
     * 生成请求参数
     */
    FindAll = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/resource/list-all',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        return config;
    }
    
}
export default ResourceAPI;


/** createResource的请求参数*/
interface ICreateResourceParams{
}

/** delete的请求参数*/
interface IDeleteParams{
    id: number;
}

/** findByUriAndMethod的请求参数*/
interface IFindByUriAndMethodParams{
    method: string;
    uri: string;
}

/** findResource的请求参数*/
interface IFindResourceParams{
}

/** modifyResource的请求参数*/
interface IModifyResourceParams{
}

/** findOne的请求参数*/
interface IFindOneParams{
    id: number;
}
