/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {ISearchPage} from "./common.interface";

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class ItemAPI {

    ItemList = (params: {}, data: IItemList) => {
        const config: AxiosRequestConfig = {
            url: '/item/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    ItemModifyStock = (params: IItemModifyStock, data:{} ) => {
        const config: AxiosRequestConfig = {
            url: '/item/modify-stock',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    ItemDelete = (params: {}, data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/item/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    ItemDeleteByDesign = (params: {}, data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/item/delete-by-design',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    ItemCreate = (params: {}, data: {  }) => {
        const config: AxiosRequestConfig = {
            url: '/item/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    FileUpload = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/file/upload',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    FileList = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/file/list',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    FileModify = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/file/modify',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    FileDownload = (params: {filePath:string}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/file/download',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
}
export default ItemAPI;


/** batchDelete的请求参数*/
interface IItemList{
    designId:any;
    type?:string;
    name?:string;
    warehouseName?:string;
    searchPage:ISearchPage;
}

interface IItemModifyStock {
    id:number;
    stock:number;
}
