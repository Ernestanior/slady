/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IDomainCloneForm,
    IDomainForm,
    IDomainListForm,
    IModifyDomainForm
} from "./common.interface";

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class DomainAPI {
    
        /**
         * cloneDomain
         * 生成请求参数
         */
        CloneDomain = (params: ICloneDomainParams, data: IDomainCloneForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/clone',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        ModifyDomain = (params: IModifyParams, data: IModifyDomainForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * createDomain
         * 生成请求参数
         */
        CreateDomain = (params: ICreateDomainParams, data: IDomainForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/create',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * deleteDomain
         * 生成请求参数
         */
        DeleteDomain = (params: IDeleteDomainParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/delete',
                method: 'delete',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * deleteDomainByIds
         * 生成请求参数
         */
        DeleteDomainByIds = (params: IDeleteDomainByIdsParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/delete/batch',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * disableDomain
         * 生成请求参数
         */
        DisableDomain = (params: IDisableDomainParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/disable',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * disableDomainByIds
         * 生成请求参数
         */
        DisableDomainByIds = (params: IDisableDomainByIdsParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/disable/batch',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * enableDomain
         * 生成请求参数
         */
        EnableDomain = (params: IEnableDomainParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/enable',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * enableDomainByIds
         * 生成请求参数
         */
        EnableDomainByIds = (params: IEnableDomainByIdsParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/enable/batch',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findDomainPage
         * 生成请求参数
         */
        FindDomainPage = (params: IFindDomainPageParams, data: IDomainListForm) => {
            const config: AxiosRequestConfig = {
                url: '/dns/domain/page',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
}
export default DomainAPI;


/** cloneDomain的请求参数*/
interface ICloneDomainParams{
}

/** createDomain的请求参数*/
interface ICreateDomainParams{
}

/** deleteDomain的请求参数*/
interface IDeleteDomainParams{
    id: number;
}

/** deleteDomainByIds的请求参数*/
interface IDeleteDomainByIdsParams{
}

/** disableDomain的请求参数*/
interface IDisableDomainParams{
    id: number;
}

/** disableDomainByIds的请求参数*/
interface IDisableDomainByIdsParams{
}

/** enableDomain的请求参数*/
interface IEnableDomainParams{
    id: number;
}

/** enableDomainByIds的请求参数*/
interface IEnableDomainByIdsParams{
}

/** findDomainPage的请求参数*/
interface IFindDomainPageParams{
}

interface IModifyParams {

}