/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IDomainGroupForm,
    IDomainGroupListForm,
} from "./common.interface";

/**
 * @class DomainGroupAPI
 * @description 域名组管理API
 * @return 返回request的config
 */
class DomainGroupAPI {

    /**
     * createDomainGroup
     * 生成请求参数
     */
    CreateDomainGroup = (params: ICreateDomainGroupParams, data: IDomainGroupForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/domain-group/create',
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
            url: '/dns/domain-group/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findDomainGroupList
     * 生成请求参数
     * 就获取某个客户下的所有域名组 客户端不传customerId, 管理员端传
     */
    FindDomainGroupListByCustomer = (params: IFindDomainGroupListParams, data: IDomainGroupListForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/domain-group/list/by-customer',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }


    FindDomainList = (params: {}, data: IDomainGroupListForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/domain-group/list/domain/by-customer',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }


    /**
     * modifyDomainGroup
     * 生成请求参数
     */
    ModifyDomainGroup = (params: IModifyDomainGroupParams, data: IDomainGroupForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/domain-group/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findDomainGroupPage
     * 生成请求参数
     */
    FindDomainGroupPage = (params: IFindDomainGroupPageParams, data: IDomainGroupListForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns/domain-group/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

}
export default DomainGroupAPI;


/** createDomainGroup的请求参数*/
interface ICreateDomainGroupParams {
}

/** delete的请求参数*/
interface IDeleteParams {
    id: number;
}

/** findDomainGroupList的请求参数*/
interface IFindDomainGroupListParams {
    customerId: number
}

/** findDomainGroupList的请求参数*/
interface IFindDomainGroupListParams {
}

/** modifyDomainGroup的请求参数*/
interface IModifyDomainGroupParams {
}

/** findDomainGroupPage的请求参数*/
interface IFindDomainGroupPageParams {
}
