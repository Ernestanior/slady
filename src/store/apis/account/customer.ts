/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    ICustomerForm,
    ICustomerListForm,
    ICustomerInfoForm,
    ISwitchForm,
    ICustomerQuarantineParamsForm,
} from "./common.interface";

/**
 * @class CustomerAPI
 * @description 客户管理API
 * @return 返回request的config
 */
class CustomerAPI {

    /**
     * createCustomer
     * 生成请求参数
     */
    CreateCustomer = (params: ICreateCustomerParams, data: ICustomerForm) => {
        const config: AxiosRequestConfig = {
            url: '/customer/create',
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
            url: '/customer/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * disableCustomer
     * 生成请求参数
     */
    DisableCustomer = (params: IDisableCustomerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/disable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * enableCustomer
     * 生成请求参数
     */
    EnableCustomer = (params: IEnableCustomerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/enable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * 根据当前登录用户返回客户列表
     * 生成请求参数
     */
    FindCustomerList = (params: IFindCustomerListParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/find-customer-list',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * 根据客户ids查看客户列表
     * 生成请求参数
     */
    FindCustomerListByIds = (params: IFindCustomerListByIdsParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/customer/find-customers-ids',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findCustomer
     * 生成请求参数
     */
    FindCustomer = (params: IFindCustomerParams, data: ICustomerListForm) => {
        const config: AxiosRequestConfig = {
            url: '/customer/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyCustomer
     * 生成请求参数
     */
    ModifyCustomer = (params: IModifyCustomerParams, data: ICustomerForm) => {
        const config: AxiosRequestConfig = {
            url: '/customer/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 修改客户配置
     * 生成请求参数
     */
    ModifyCustomerInfo = (params: IModifyCustomerInfoParams, data: ICustomerInfoForm) => {
        const config: AxiosRequestConfig = {
            url: '/customer/modify/config',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 修改隔离设置
     * 生成请求参数
     */
    ModifyCustomerQuarantine = (params: IModifyCustomerQuarantineParams, data: ICustomerQuarantineParamsForm) => {
        const config: AxiosRequestConfig = {
            url: '/dns-customer/update-customer-dns-type',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * toggleNoticeStatus
     * 生成请求参数
     */
    ToggleNoticeStatus = (params: IToggleNoticeStatusParams, data: ISwitchForm) => {
        const config: AxiosRequestConfig = {
            url: '/customer/notice/toggle-status',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * refreshCache
     * 生成请求参数
     */
    RefreshCache = (params: IRefreshCacheParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/refresh-cache',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * 重置每日api证书申请次数限制
     * 生成请求参数
     */
    RestCertApiLimit = (params: IRestCertApiLimitParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/reset-cert-api-limit',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 切换客户种类
     * 生成请求参数
     */
    SwitchCustomerCategory = (params: ISwitchCustomerCategoryParams, data: ICustomerForm) => {
        const config: AxiosRequestConfig = {
            url: '/customer/switch-internal-category',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 查看客户
     * 生成请求参数
     */
    FindOne = (params: IFindOneParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/view',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    viewMiddleUpstream = (params: IViewMiddleUpstream, data: any) => {
        const config: AxiosRequestConfig = {
            url: "/customer/view-middle-upstream",
            method: "get",
            params,
            data
        }
        config.headers = {};
        return config
    }

    updateMiddleUpstream = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: "/customer/update-middle-upstream",
            method: "put",
            params,
            data
        }
        config.headers = {};
        return config
    }

    /**
     * 为客户的所有站点启用中间回源
     */
    enableAllSiteMiddleUpstream = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: "/customer/enable-middle-upstream",
            method: "put",
            params,
            data
        }
        config.headers = {};
        return config
    }

    /**
     * 为客户的所有站点启用中间回源
     */
    disableAllSiteMiddleUpstream = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: "/customer/disable-middle-upstream",
            method: "put",
            params,
            data
        }
        config.headers = {};
        return config
    }

    /**
     * 查看客户配置
     * 生成请求参数
     */
    FindInfo = (params: IFindInfoParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/view/config',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * 查看客户套餐
     * 生成请求参数
     */
    GetCustomerPackage = (params: IGetCustomerPackageParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/view/package',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * enableMiddleUpstream
     * 生成请求参数
     */
    EnableMiddleUpstream = (params: ICustomerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/enable-middle-upstream',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * DisableMiddleUpstream
     * 生成请求参数
     */
    DisableMiddleUpstream = (params: ICustomerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/customer/disable-middle-upstream',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }
}
export default CustomerAPI;

interface ICustomerParams {
    customerId: number
}

/** createCustomer的请求参数*/
interface ICreateCustomerParams {
}

/** delete的请求参数*/
interface IDeleteParams {
    id: number;
}

/** disableCustomer的请求参数*/
interface IDisableCustomerParams {
    id: number;
}

/** enableCustomer的请求参数*/
interface IEnableCustomerParams {
    id: number;
}

/** 根据当前登录用户返回客户列表的请求参数*/
interface IFindCustomerListParams {
}

/** 根据客户ids查看客户列表的请求参数*/
interface IFindCustomerListByIdsParams {
}

/** findCustomer的请求参数*/
interface IFindCustomerParams {
}

/** modifyCustomer的请求参数*/
interface IModifyCustomerParams {
}

/** 修改客户配置的请求参数*/
interface IModifyCustomerInfoParams {
}

/** 修改隔离设置的请求参数*/
interface IModifyCustomerQuarantineParams {
}

/** toggleNoticeStatus的请求参数*/
interface IToggleNoticeStatusParams {
}

/** refreshCache的请求参数*/
interface IRefreshCacheParams {
}

/** 重置每日api证书申请次数限制的请求参数*/
interface IRestCertApiLimitParams {
    id: number;
}

/** 切换客户种类的请求参数*/
interface ISwitchCustomerCategoryParams {
}

/** 查看客户的请求参数*/
interface IFindOneParams {
    id: number;
}

interface IViewMiddleUpstream {
    customerId: number;
}

/** 查看客户配置的请求参数*/
interface IFindInfoParams {
    id: number;
}

/** 查看客户套餐的请求参数*/
interface IGetCustomerPackageParams {
    id: number;
}
