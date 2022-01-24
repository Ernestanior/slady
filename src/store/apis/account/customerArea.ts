/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
} from "./common.interface";

/**
 * @class CustomerAreaAPI
 * @description 客户区域管理API
 * @return 返回request的config
 */
class CustomerAreaAPI {
    
        /**
         * findAreaIds
         * 生成请求参数
         */
        FindAreaIds = (params: IFindAreaIdsParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/customer-area/find-area-ids',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findAreaByCustomerId
         * 生成请求参数
         */
        FindAreaByCustomerId = (params: IFindAreaByCustomerIdParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/customer-area/find-area-list',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findCustomerIds
         * 生成请求参数
         */
        FindCustomerIds = (params: IFindCustomerIdsParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/customer-area/find-customer-ids',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * modifyCustomerArea
         * 生成请求参数
         */
        ModifyCustomerArea = (params: IModifyCustomerAreaParams, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/customer-area/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
}
export default CustomerAreaAPI;


/** findAreaIds的请求参数*/
interface IFindAreaIdsParams{
    customerId: number;
}

/** findAreaByCustomerId的请求参数*/
interface IFindAreaByCustomerIdParams{
    customerId: number;
}

/** findCustomerIds的请求参数*/
interface IFindCustomerIdsParams{
    areaId: number;
}

/** modifyCustomerArea的请求参数*/
interface IModifyCustomerAreaParams{
    customerId: number;
}
