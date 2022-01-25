/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
} from "./common.interface";

/**
 * @class DailyCustomerAPI
 * @description daily-customer-controllerAPI
 * @return 返回request的config
 */
class DailyCustomerAPI {
    
        /**
         * getByIdAndDate
         * 生成请求参数
         */
        GetByIdAndDate = (params: IGetByIdAndDateParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/daily-customer/find-one',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
}
export default DailyCustomerAPI;


/** getByIdAndDate的请求参数*/
interface IGetByIdAndDateParams{
    customerId: number;
    statDate: string;
}
