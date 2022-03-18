/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IClearFrozenIpFrom,
    ISiteForm,
    ICustomerFrozenIpListForm,
    ISiteFirewallListForm,
    IFrozenIpListForm,
    ISiteListForm,
    IUpstreamListForm,
    IUpstreamBatchForm,
    ISiteDnsForm,
    ISiteSwitchForm,
    IUpstreamForm,
    ISiteFirewallForm,
    IAdminListForm,
    IOperateAdminForm,
    IUpstreamKeepAliveForm,
} from "./common.interface";

/**
 * @class SiteAPI
 * @description 站点管理API
 * @return 返回request的config
 */
class SiteAPI {

    /**
     *  站点查询接口
     */
    FindSiteSearchList = (data: IFindSiteSearchListData) => {
        const config: AxiosRequestConfig = {
            url: '/site/list/search',
            method: 'post',
            params: {},
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * backToSource
     * 生成请求参数
     */
    BackToSource = (params: IBackToSourceParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/back-to-source',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * clearBatchFrozenIp
     * 生成请求参数
     */
    ClearBatchFrozenIp = (params: IClearBatchFrozenIpParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/site/clear-batch-frozen-ip',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * clearCustomerFrozenIp
     * 生成请求参数
     */
    ClearCustomerFrozenIp = (params: IClearCustomerFrozenIpParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/clear-customer-frozen-ip',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * clearFrozenIp
     * 生成请求参数
     */
    ClearFrozenIp = (params: IClearFrozenIpParams, data: IClearFrozenIpFrom) => {
        const config: AxiosRequestConfig = {
            url: '/site/clear-frozen-ip',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * createSite
     * 生成请求参数
     */
    CreateSite = (params: ICreateSiteParams, data: ISiteForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statSpeedLimitListByCustomerId
     * 生成请求参数
     */
    StatSpeedLimitListByCustomerId = (params: IStatSpeedLimitListByCustomerIdParams, data: ICustomerFrozenIpListForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/customer-frozen-ip-list',
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
            url: '/site/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * disableSite
     * 生成请求参数
     */
    DisableSite = (params: IDisableSiteParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/disable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
    * BatchMiddleDisableSite
    * 生成请求参数
    */
    BatchMiddleDisableSite = (params: IBatchMiddleDisableSiteParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/site/disable-batch-middle-upstream',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * enableSite
     * 生成请求参数
     */
    EnableSite = (params: IEnableSiteParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/enable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    /**
    * BatchMiddleEnableSite
    * 生成请求参数
    */
    BatchMiddleEnableSite = (params: IBatchMiddleEnableSiteParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/site/enable-batch-middle-upstream',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * exportCustomerFrozenIpList
     * 生成请求参数
     */
    ExportCustomerFrozenIpList = (params: IExportCustomerFrozenIpListParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/export-customer-frozen-ip-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findByBrand
     * 生成请求参数
     */
    FindByBrand = (params: IFindByBrandParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/find-by-brand',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findByCustomer
     * 生成请求参数
     */
    FindByCustomer = (params: IFindByCustomerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/find-by-customer',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findFirewall
     * 生成请求参数
     */
    FindFirewall = (params: IFindFirewallParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/find-firewall',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findGrecordCustomers
     * 生成请求参数
     */
    FindGrecordCustomers = (params: IFindGrecordCustomersParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/site/find-grecord-customers',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findListByGnames
     * 生成请求参数
     */
    FindListByGnames = (params: IFindListByGnamesParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/site/find-list-gnames',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findGNamesByCustomerId
     * 生成请求参数
     */
    FindGNamesByCustomerId = (params: IFindGNamesByCustomerIdParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/find-list-gnames/by-customer',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findNotInBrand
     * 生成请求参数
     */
    FindNotInBrand = (params: IFindNotInBrandParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/find-not-in-brand',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * getSiteById
     * 生成请求参数
     */
    GetSiteById = (params: IGetSiteByIdParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/find-one',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    disableBatchSiteFirewall = (params: IDisableBatchSiteFirewall, data: any) => {
        const config: AxiosRequestConfig = {
            url: "/site/firewall-batch-disable",
            method: "put",
            params,
            data
        }
        config.headers = {}
        config.headers['Content-Type'] = 'application/json';
        return config
    }

    enableBatchSiteFirewall = (params: IEnableBatchSiteFirewall, data: any) => {
        const config: AxiosRequestConfig = {
            url: "/site/firewall-batch-enable",
            method: "put",
            params,
            data
        }
        config.headers = {}
        config.headers['Content-Type'] = 'application/json';
        return config
    }

    /**
     * disableSiteFirewall
     * 生成请求参数
     */
    DisableSiteFirewall = (params: IDisableSiteFirewallParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/firewall-disable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * enableSiteFirewall
     * 生成请求参数
     */
    EnableSiteFirewall = (params: IEnableSiteFirewallParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/firewall-enable',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findFirewallList
     * 生成请求参数
     */
    FindFirewallList = (params: IFindFirewallListParams, data: ISiteFirewallListForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/firewall-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findFrozenIpList
     * 生成请求参数
     */
    FindFrozenIpList = (params: IFindFrozenIpListParams, data: IFrozenIpListForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/frozen-ip-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * findSite
     * 生成请求参数
     */
    FindSite = (params: IFindSiteParams, data: ISiteListForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * listDomainDns
     * 生成请求参数
     */
    ListDomainDns = (params: IListDomainDnsParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/list-domain-dns',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * listUpstream
     * 生成请求参数
     */
    ListUpstream = (params: IListUpstreamParams, data: IUpstreamListForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/list-upstream',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * listUpstream
     * 生成请求参数
     */
    ListAdmin = (params: IListAdminParams, data: IAdminListForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/list/admin',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }


    /**
   * SiteAllList
   * 生成请求参数
   */
    FindSiteAllList = (params: ISiteAllListParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/list/all',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * modifySite
     * 生成请求参数
     */
    ModifySite = (params: IModifySiteParams, data: ISiteForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyBatchUpstream
     * 生成请求参数
     */
    ModifyBatchUpstream = (params: IModifyBatchUpstreamParams, data: IUpstreamBatchForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/modify-batch-upstream',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyDnsValue
     * 生成请求参数
     */
    ModifyDnsValue = (params: IModifyDnsValueParams, data: ISiteDnsForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/modify-dns-value',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifySwitchStatus
     * 生成请求参数
     */
    ModifySwitchStatus = (params: IModifySwitchStatusParams, data: ISiteSwitchForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/modify-switch',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * modifyUpstream
     * 生成请求参数
     */
    ModifyUpstream = (params: IModifyUpstreamParams, data: IUpstreamForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/modify-upstream',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    /**
  * modifyUpstreamKeepalive
  * 生成请求参数
  */
    ModifyUpstreamKeepalive = (params: IModifyUpstreamKeepaliveParams, data: IUpstreamKeepAliveForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/modify-upstream-keepalive',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
        * operateAdmin
        * 生成请求参数
        */
    OperateAdmin = (params: IOperateAdminParams, data: IOperateAdminForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/operate/admin',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 批量根据站点列表检查源点可用性
     */
    batchCheckUpstream = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: "/site/site-batch-check-upstream",
            method: "post",
            params,
            data
        }
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * 批量 查询 检查源点可用性
     */
    batchUpstreamView = (params: any, data: any) => {
        const config: AxiosRequestConfig = {
            url: "/site/site-batch-upstream-view",
            method: "post",
            params,
            data
        }
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * siteCheckUpstream
     * 生成请求参数
     */
    SiteCheckUpstream = (params: ISiteCheckUpstreamParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/site-check-upstream',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * statSpeedLimitListBySiteId
     * 生成请求参数
     */
    StatSpeedLimitListBySiteId = (params: IStatSpeedLimitListBySiteIdParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/site-frozen-ip-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * updateFirewall
     * 生成请求参数
     */
    UpdateFirewall = (params: IUpdateFirewallParams, data: ISiteFirewallForm) => {
        const config: AxiosRequestConfig = {
            url: '/site/update-firewall',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * UpstreamConfig
     * 生成请求参数
     */
    UpstreamConfig = (params: IUpstreamConfigParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/upstream-config',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * updateFirewall
     * 生成请求参数
     */
    SiteUpstreamConfigView = (params: ISiteUpstreamConfigViewParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/upstream-config-view',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * checkUpstream
     * 生成请求参数
     */
    CheckUpstream = (params: ICheckUpstreamParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/upstream-health-check',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findUpstreamList
     * 生成请求参数
     */
    FindUpstreamList = (params: IFindUpstreamListParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/upstream-health-view',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * findUpstreamView
     * 生成请求参数
     */
    FindUpstreamView = (params: IFindUpstreamViewParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/upstream-view',
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
    FindOne = (params: IFindOneParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/view',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * ViewCustomerInfoBySiteId
     * 生成请求参数
     */
    ViewCustomerInfoBySiteId = (params: IFindUpstreamListParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/view-customer-info/by-site',
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
    EnableMiddleUpstream = (params: IFindFirewallParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/enable-middle-upstream',
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
    DisableMiddleUpstream = (params: IFindFirewallParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/disable-middle-upstream',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * 根据站点查看dnsIP
     * 生成请求参数
     */
    viewDnsIP = (params: IListDomainDnsParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/site/view-dns-ip',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

}
export default SiteAPI;


/** backToSource的请求参数*/
interface IBackToSourceParams {
    id: number;
}

/** clearBatchFrozenIp的请求参数*/
interface IClearBatchFrozenIpParams {
}

/** clearCustomerFrozenIp的请求参数*/
interface IClearCustomerFrozenIpParams {
    customerId: number;
}

/** clearFrozenIp的请求参数*/
interface IClearFrozenIpParams {
}

/** createSite的请求参数*/
interface ICreateSiteParams {
}

/** statSpeedLimitListByCustomerId的请求参数*/
interface IStatSpeedLimitListByCustomerIdParams {
}

/** delete的请求参数*/
interface IDeleteParams {
    id: number;
}

/** disableSite的请求参数*/
interface IDisableSiteParams {
    id: number;
}

/** enableSite的请求参数*/
interface IEnableSiteParams {
    id: number;
}
/** BatchMiddleEnableSite的请求参数*/
interface IBatchMiddleEnableSiteParams {
}
/** IBatchMiddleDisableSiteParams的请求参数*/
interface IBatchMiddleDisableSiteParams {
}

/** exportCustomerFrozenIpList的请求参数*/
interface IExportCustomerFrozenIpListParams {
    customerId: number;
}

/** findByBrand的请求参数*/
interface IFindByBrandParams {
    brandId: number;
}

/** findByCustomer的请求参数*/
interface IFindByCustomerParams {
    customerId: number;
}

/** findFirewall的请求参数*/
interface IFindFirewallParams {
    siteId: number;
}

/** findGrecordCustomers的请求参数*/
interface IFindGrecordCustomersParams {
}

/** findListByGnames的请求参数*/
interface IFindListByGnamesParams {
}

/** findGNamesByCustomerId的请求参数*/
interface IFindGNamesByCustomerIdParams {
    customerId: number;
}

/** findNotInBrand的请求参数*/
interface IFindNotInBrandParams {
}

/** getSiteById的请求参数*/
interface IGetSiteByIdParams {
    id: number;
}

/** disableSiteFirewall的请求参数*/
interface IDisableSiteFirewallParams {
    siteId: number;
}

/** enableSiteFirewall的请求参数*/
interface IEnableSiteFirewallParams {
    siteId: number;
}

/** findFirewallList的请求参数*/
interface IFindFirewallListParams {
}

/** findFrozenIpList的请求参数*/
interface IFindFrozenIpListParams {
}

/** findSite的请求参数*/
interface IFindSiteParams {
}

/** listDomainDns的请求参数*/
interface IListDomainDnsParams {
    siteId: number;
}

/** listUpstream的请求参数*/
interface IListUpstreamParams {
}
/** listAdmin的请求参数*/
interface IListAdminParams {
}
/** sitealllist的请求参数*/
interface ISiteAllListParams {
}

/** modifySite的请求参数*/
interface IModifySiteParams {
}

/** modifyBatchUpstream的请求参数*/
interface IModifyBatchUpstreamParams {
}

/** modifyDnsValue的请求参数*/
interface IModifyDnsValueParams {
}

/** modifySwitchStatus的请求参数*/
interface IModifySwitchStatusParams {
}

/** modifyUpstream的请求参数*/
interface IModifyUpstreamParams {
}

/** ModifyUpstreamKeepalive的请求参数*/
interface IModifyUpstreamKeepaliveParams {
}

/** operateAdmin*/
interface IOperateAdminParams {
}

/** siteCheckUpstream的请求参数*/
interface ISiteCheckUpstreamParams {
    siteId: number;
}

/** SiteUpstreamConfigView的请求参数*/
interface ISiteUpstreamConfigViewParams {
    siteId: number;
}

/** statSpeedLimitListBySiteId的请求参数*/
interface IStatSpeedLimitListBySiteIdParams {
    siteId: number;
}

/** updateFirewall的请求参数*/
interface IUpdateFirewallParams {
}

/** upstreamConfig*/
interface IUpstreamConfigParams {
}

/** checkUpstream的请求参数*/
interface ICheckUpstreamParams {
    // upstream: string;
}

/** findUpstreamList的请求参数*/
interface IFindUpstreamListParams {
    siteId: number;
}

/** findUpstreamView的请求参数*/
interface IFindUpstreamViewParams {
    id: number;
}

/** findOne的请求参数*/
interface IFindOneParams {
    id: number;
}

/** disableBatchSiteFirewall */
interface IDisableBatchSiteFirewall {
}

/** enableBatchSiteFirewall */
interface IEnableBatchSiteFirewall {
}


interface IFindSiteSearchListData {
    customerId?: number,
    customerName?: string,
    keyWord?: string,
    siteName?: string,
    status?: 0,
    type?: string,
    uniqueName?: string,
    upstream?: string
}