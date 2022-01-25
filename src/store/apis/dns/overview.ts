/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';

/**
 * @class RecordAPI
 * @description 记录管理API
 * @return 返回request的config
 */
class DnsOverviewAPI {

    /**
     * resolve chart
     * 生成请求参数
     */
    ResolveChart = (params: any, data: ISearchParams) => {
        const config: AxiosRequestConfig = {
            url: '/dns/stat/overview/resolve-chart',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    /**
     * resolve table
     * 生成请求参数
     */
    ResolveTable = (params: any, data: ISearchParams) => {
        const config: AxiosRequestConfig = {
            url: '/dns/stat/overview/resolve-table',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    // /stat/overview/resolve-summary
    ResolveSummary = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/stat/overview/resolve-summary',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        return config;
    }
    // /stat/overview/resolve-summary
    OverviewSummary = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/dns/stat/overview/resolve-summary',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        return config;
    }
}

export default DnsOverviewAPI;

interface ISearchParams {
    reportType: string,
    startDate?: string,
    endDate?: string
}
