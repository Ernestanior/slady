/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    INameServerForm,
    INameServerListForm,
} from "./common.interface";

/**
 * @class NameServerAPI
 * @description 域名服务器管理API
 * @return 返回request的config
 */
class NameServerAPI {

    /**
     * createNameServer
     * 生成请求参数
     */
    CreateNameServer = (params: ICreateNameServerParams, data: INameServerForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/name-server/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * deleteNameServer
     * 生成请求参数
     */
    DeleteNameServer = (params: IDeleteNameServerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/name-server/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * list
     * 生成请求参数
     */
    List = (params: IListParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/name-server/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * listByIds
     * 生成请求参数
     */
    ListByIds = (params: IListByIdsParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/dns/name-server/list/by-ids',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyNameServer
     * 生成请求参数
     */
    ModifyNameServer = (params: IModifyNameServerParams, data: INameServerForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/name-server/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findNameServerPage
     * 生成请求参数
     */
    FindNameServerPage = (params: IFindNameServerPageParams, data: INameServerListForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/name-server/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * viewNameServer
     * 生成请求参数
     */
    ViewNameServer = (params: IViewNameServerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/name-server/view/by-customer',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

}
export default NameServerAPI;


/** createNameServer的请求参数*/
interface ICreateNameServerParams {
}

/** deleteNameServer的请求参数*/
interface IDeleteNameServerParams {
    id: number;
}

/** list的请求参数*/
interface IListParams {
}

/** listByIds的请求参数*/
interface IListByIdsParams {
}

/** modifyNameServer的请求参数*/
interface IModifyNameServerParams {
}

/** findNameServerPage的请求参数*/
interface IFindNameServerPageParams {
}

/** viewNameServer的请求参数*/
interface IViewNameServerParams {
    customerId?: number;
}
