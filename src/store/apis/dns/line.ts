/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
} from "./common.interface";

/**
 * @class LineAPI
 * @description 线路管理API
 * @return 返回request的config
 */
class LineAPI {
    
        /**
         * findLineByDomain
         * 生成请求参数
         */
        FindLineByDomain = (params: IFindLineByDomainParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line/list/by-domain',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }

        FindLineByCustomer = (params: IFindLineByCustomerParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/dns/line/list/by-customer',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
}
export default LineAPI;


/** findLineByDomain的请求参数*/
interface IFindLineByDomainParams{
    domainId: number;
}

interface IFindLineByCustomerParams {
    customerId: number | null
}