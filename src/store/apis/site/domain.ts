/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IDomainDelForm,
    IDomainForm,
    IDomainListForm,
    ICheckDomainDuplicate
} from "./common.interface";

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class DomainAPI {
    
        /**
         * batchDelete
         * 生成请求参数
         */
        BatchDelete = (params: IBatchDeleteParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/domain/batch-delete',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * batchDelete
         * 生成请求参数
         */
        BatchDeleteAdmin = (params: IBatchDeleteParams, data: IDomainDelForm) => {
            const config: AxiosRequestConfig = {
                url: '/domain/batch-delete/admin',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * batchDisableSslDomain
         * 生成请求参数
         */
        BatchDisableSslDomain = (params: IBatchDisableSslDomainParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/domain/batch-disable-ssl',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * batchEnableSslDomain
         * 生成请求参数
         */
        BatchEnableSslDomain = (params: IBatchEnableSslDomainParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/domain/batch-enable-ssl',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * batchRefreshDns
         * 生成请求参数
         */
        BatchRefreshDns = (params: IBatchRefreshDnsParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/domain/batch-refresh-dns',
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
                url: '/domain/create',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        /**
         * checkDomainDuplicate
         */
        CheckDomainDuplicate = (params: ICheckDomainDuplicateParams  , data: ICheckDomainDuplicate ) => {
            const config: AxiosRequestConfig = {
                url: '/domain/create/check-domain-duplicate',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        /**
         * create validate domain ownership
         */
        CreateValidateDomainOwnerhsip = (params: ICreateDomainOwnership , data: any) => {
            const config: AxiosRequestConfig = {
                url: '/domain/create/validate-domain-ownership',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        /** view validate domain info */
        ViewValidateDomainInfo = (params: IViewValidateParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: `/domain/view/validate-domain-dns-info?id=${params}`,
                method: 'get',
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        /** domain validate domain ownership */
        DomainValidateOwnership = (params: IDomainValidateOwnership , data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/domain/validate-domain-ownership',
                method: 'post',
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
                url: '/domain/delete',
                method: 'delete',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * exportFileString
         * 生成请求参数
         */
        ExportFileString = (params: IExportFileStringParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/domain/export',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * exportCustomer
         * 生成请求参数
         */
        ExportCustomer = (params: IExportCustomerParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/domain/export-customer',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * importFile
         * 生成请求参数
         */
        ImportFile = (params: IImportFileParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/domain/import',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'multipart/form-data';
            return config;
        }
    
        /**
         * findDomain
         * 生成请求参数
         */
        FindDomain = (params: IFindDomainParams, data: IDomainListForm) => {
            const config: AxiosRequestConfig = {
                url: '/domain/list',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findMasterDomain
         * 生成请求参数
         */
        FindMasterDomain = (params: IFindMasterDomainParams, data: IDomainListForm) => {
            const config: AxiosRequestConfig = {
                url: '/domain/list/master-domain',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findDomainMgntList
         * 生成请求参数
         */
        FindDomainMgntList = (params: IFindDomainMgntListParams, data: IDomainListForm) => {
            const config: AxiosRequestConfig = {
                url: '/domain/list/mgnt-domain',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findDisplayNamesBySite
         * 生成请求参数
         */
        FindDisplayNamesBySite = (params: IFindDisplayNamesBySiteParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/domain/find-display-names-by-site',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }

        /**
         * findTopDomain
         * 生成请求参数
         */
        FindTopDomain = (params: IFindTopDomainParams, data: IDomainListForm) => {
            const config: AxiosRequestConfig = {
                url: '/domain/list/top-domain',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * refreshDns
         * 生成请求参数
         */
        RefreshDns = (params: IRefreshDnsParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/domain/refresh-dns',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        /**
         * getDomainsCount
         */
        getCustomerDomainsCount = (params: IDomainsCountParams, data: {})  => {
            const config: AxiosRequestConfig = {
                url: "/domain/query/domain-count/by-customer",
                method: 'post',
                params,
                data
            }
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
        

    
}
export default DomainAPI;


/** batchDelete的请求参数*/
interface IBatchDeleteParams{
}

/** batchDelete的请求参数*/
interface IBatchDeleteParams{
}

/** batchDisableSslDomain的请求参数*/
interface IBatchDisableSslDomainParams{
}

/** batchEnableSslDomain的请求参数*/
interface IBatchEnableSslDomainParams{
}

/** batchRefreshDns的请求参数*/
interface IBatchRefreshDnsParams{
}

/** createDomain的请求参数*/
interface ICreateDomainParams{
}

/** delete的请求参数*/
interface IDeleteParams{
    id: number;
}

/** exportFileString的请求参数*/
interface IExportFileStringParams{
    siteId: number;
}

/** exportCustomer的请求参数*/
interface IExportCustomerParams{
    customerId: number;
}

/** importFile的请求参数*/
interface IImportFileParams{
    customerId: number;
}

/** findDomain的请求参数*/
interface IFindDomainParams{
}

/** findMasterDomain的请求参数*/
interface IFindMasterDomainParams{
}

/** findDomainMgntList的请求参数*/
interface IFindDomainMgntListParams{
}

/** findDisplayNamesBySite的请求参数*/
interface IFindDisplayNamesBySiteParams{
    siteId: number;
}

/** findTopDomain的请求参数*/
interface IFindTopDomainParams{
}

/** refreshDns的请求参数*/
interface IRefreshDnsParams{
    id: number;
}

/** getDomainsCount的请求参数 */
interface IDomainsCountParams {
}

/** checkDomainDuplicate的请求参数  */
interface ICheckDomainDuplicateParams {

}

/** createDomainDuplicate的请求参数*/
interface ICreateDomainOwnership {

}

/** viewValidateDomainInfo的参数 */
interface IViewValidateParams {
    id: number;
}

/** domainValidateOwnership的参数 */
interface IDomainValidateOwnership {

}