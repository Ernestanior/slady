/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IBlockLogListForm,
    IStatForm,
    ICustomerFrozenIpListFrom,
    IDefenceStatForm,
    IListSiteStatForm,
    IStatSpeedLimitTimeForm,
    IStatStateListForm,
} from "./common.interface";

/**
 * @class StatAPI
 * @description stat-controllerAPI
 * @return 返回request的config
 */
class StatAPI {

    /**
     * blockLogList
     * 生成请求参数
     */
    BlockLogList = (params: IBlockLogListParams, data: IBlockLogListForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/block-log-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statCountryDataByBrandId
     * 生成请求参数
     */
    StatCountryDataByBrandId = (params: IStatCountryDataByBrandIdParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/brand-country',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statBrandOverview
     * 生成请求参数
     */
    StatBrandOverview = (params: IStatBrandOverviewParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/brand-overview',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statBrandStatus
     * 生成请求参数
     */
    StatBrandStatus = (params: IStatBrandStatusParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/brand-status',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statCountryData
     * 生成请求参数
     */
    StatCountryData = (params: IStatCountryDataParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/country',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statCountryData
     * 生成请求参数
     */
    StatCustomerbandwidth95 = (params: IStatCustomerbandwidth95Params, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/customer-bandwidth-95',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statCustomerFrozenIpList
     * 生成请求参数
     */
    StatCustomerFrozenIpList = (params: IStatCustomerFrozenIpListParams, data: ICustomerFrozenIpListFrom) => {
        const config: AxiosRequestConfig = {
            url: '/stat/customer-frozen-ip-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * customerListCurrentMonthBandwidth
     * 生成请求参数
     */
    customerListCurrentMonthBandwidth = (params: ICustomerListBandwidthParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/stat/customer-list-current-bandwidth',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * customerListBandwidth
     * 生成请求参数
     */
    CustomerListBandwidth = (params: ICustomerListBandwidthParams, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/stat/customer-list-bandwidth',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statCustomerModelBandwith
     * 生成请求参数
     */
    StatCustomerModelBandwith = (params: IStatCustomerModelBandwithParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/customer-model-bandwith',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statCustomerOverBandWith
     * 生成请求参数
     */
    StatCustomerOverBandWith = (params: IStatCustomerOverBandWithParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/stat/customer-over-bandwidth',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * customerStatOverview
     * 生成请求参数
     */
    CustomerStatOverview = (params: ICustomerStatOverviewParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/customer-overview',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statDefense
     * 生成请求参数
     */
    StatDefense = (params: IStatDefenseParams, data: IDefenceStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/defense-stat',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * distinctState
     * 生成请求参数
     */
    DistinctState = (params: IDistinctStateParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/distinct-state',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * exportBlackIpByCustomer
     * 生成请求参数
     */
    ExportBlackIpByCustomer = (params: IExportBlackIpByCustomerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/stat/export-black-ip-customer',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    ExportBlackIPLogTime = (params: IExportBlackIPLog, data: IExportLogTime) => {
        const config: AxiosRequestConfig = {
            url: 'stat/export-black-ip-customer',
            method: 'put',
            params, 
            data
        }
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * exportCustomerFrozenIpList
     * 生成请求参数
     */
    ExportCustomerFrozenIpList = (params: IExportCustomerFrozenIpListParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/export-customer-frozen-ip-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * exportSpeedLimitTime
     * 生成请求参数
     */
    ExportSpeedLimitTime = (params: IExportSpeedLimitTimeParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/export-speed-limit-time',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * listSiteStat
     * 生成请求参数
     */
    ListSiteStat = (params: IListSiteStatParams, data: IListSiteStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/list-site-stat',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statRegionData
     * 生成请求参数
     */
    StatRegionData = (params: IStatRegionDataParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/region',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statBandWith95
     * 生成请求参数
     */
    StatBandWith95 = (params: IStatBandWith95Params, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-bandwidth-95',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
    * StatSiteIpTop
    * 生成请求参数
    */
    StatSiteIpTop = (params: IStatSiteIpTopParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-ip-top',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }


    /**
     * statSiteList
     * 生成请求参数
     */
    StatSiteList = (params: IStatSiteListParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statSiteModelBandwith
     * 生成请求参数
     */
    StatSiteModelBandwith = (params: IStatSiteModelBandwithParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-model-bandwith',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statSiteModelReqCount
     * 生成请求参数
     */
    StatSiteModelReqCount = (params: IStatSiteModelReqCountParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-model-req-count',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statSiteOverview
     * 生成请求参数
     */
    StatSiteOverview = (params: IStatSiteOverviewParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-overview',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statSiteReqcount
     * 生成请求参数
     */
    StatSiteReqcount = (params: IStatSiteReqcountParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-reqcount',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statStatus
     * 生成请求参数
     */
    StatStatus = (params: IStatStatusParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-status',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statStatus0
     * 生成请求参数
     */
    StatStatus0 = (params: IStatStatus0Params, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/site-status0',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statSpeedLimitTimeLog
     * 生成请求参数
     */
    StatSpeedLimitTimeLog = (params: IStatSpeedLimitTimeLogParams, data: IStatSpeedLimitTimeForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/speed-limit-time',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * statStateList
     * 生成请求参数
     */
    StatStateList = (params: IStatStateListParams, data: IStatStateListForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/state-list',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    /**
     * summaryAgent
     * 生成请求参数
     */
    SummaryAgent = (params: ISummaryAgentParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/stat/summary-agent',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * summaryCustomer
     * 生成请求参数
     */
    SummaryCustomer = (params: ISummaryCustomerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/stat/summary-customer',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * summaryMcn
     * 生成请求参数
     */
    SummaryMcn = (params: ISummaryMcnParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/stat/summary-mcn',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * statTopFlowCustomer
     * 生成请求参数
     */
    StatTopFlowCustomer = (params: IStatTopFlowCustomerParams, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/stat/top-flow-customer',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        return config;
    }

    /**
     * statTopFlowSites
     * 生成请求参数
     */
    StatTopFlowSites = (params: IStatTopFlowSitesParams, data: IStatForm) => {
        const config: AxiosRequestConfig = {
            url: '/stat/top-flow-sites',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

    SaleStatCustomer = (data: any) => {
        const config: AxiosRequestConfig = {
            url: '/stat/sale/stat-customer',
            method: 'post',
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }

}
export default StatAPI;


/** blockLogList的请求参数*/
interface IBlockLogListParams {
}

/** statCountryDataByBrandId的请求参数*/
interface IStatCountryDataByBrandIdParams {
    brandId: number;
}

/** statBrandOverview的请求参数*/
interface IStatBrandOverviewParams {
    brandId: number;
}

/** statBrandStatus的请求参数*/
interface IStatBrandStatusParams {
    brandId: number;
}

/** statCountryData的请求参数*/
interface IStatCountryDataParams {
}

/** StatCustomerbandwidth95的请求参数*/
interface IStatCustomerbandwidth95Params {
}

/** statCustomerFrozenIpList的请求参数*/
interface IStatCustomerFrozenIpListParams {
}

/** customerListBandwidth的请求参数*/
interface ICustomerListBandwidthParams {
}

/** statCustomerModelBandwith的请求参数*/
interface IStatCustomerModelBandwithParams {
}

/** statCustomerOverBandWith的请求参数*/
interface IStatCustomerOverBandWithParams {
}

/** customerStatOverview的请求参数*/
interface ICustomerStatOverviewParams {
}

/** statDefense的请求参数*/
interface IStatDefenseParams {
}

/** distinctState的请求参数*/
interface IDistinctStateParams {
}

/** exportBlackIpByCustomer的请求参数*/
interface IExportBlackIpByCustomerParams {
    customerId: number;
}

/** exportCustomerFrozenIpList的请求参数*/
interface IExportCustomerFrozenIpListParams {
}

/** exportSpeedLimitTime的请求参数*/
interface IExportSpeedLimitTimeParams {
}

/** listSiteStat的请求参数*/
interface IListSiteStatParams {
}

/** statRegionData的请求参数*/
interface IStatRegionDataParams {
}

/** statBandWith95的请求参数*/
interface IStatBandWith95Params {
}

/** statSiteList的请求参数*/
interface IStatSiteListParams {
}

/** statSiteModelBandwith的请求参数*/
interface IStatSiteModelBandwithParams {
}

/** statSiteModelReqCount的请求参数*/
interface IStatSiteModelReqCountParams {
}

/** statSiteOverview的请求参数*/
interface IStatSiteOverviewParams {
}

/** statSiteReqcount的请求参数*/
interface IStatSiteReqcountParams {
}

/** statStatus的请求参数*/
interface IStatStatusParams {
}

/** statStatus0的请求参数*/
interface IStatStatus0Params {
}

/** statSpeedLimitTimeLog的请求参数*/
interface IStatSpeedLimitTimeLogParams {
}

/** statStateList的请求参数*/
interface IStatStateListParams {
}

/** summaryAgent的请求参数*/
interface ISummaryAgentParams {
}

/** StatSiteIpTop的请求参数*/
interface IStatSiteIpTopParams {
    siteId: number
}

/** summaryCustomer的请求参数*/
interface ISummaryCustomerParams {
    customerId: number;
}

/** summaryMcn的请求参数*/
interface ISummaryMcnParams {
    customerId: number;
}

/** statTopFlowCustomer的请求参数*/
interface IStatTopFlowCustomerParams {
}

/** statTopFlowSites的请求参数*/
interface IStatTopFlowSitesParams {
}

interface IExportBlackIPLog {

}
interface IExportLogTime {
    customerId: number;
    startDate?: string;
    endDate?: string;
}
