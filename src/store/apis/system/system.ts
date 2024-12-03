/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';

/**
 * @class AgentAPI
 * @description 代理管理API
 * @return 返回request的config
 */
class SystemAPI {

        ResetStock = (params: { }, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/item/reset-stock',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        OrderClear = (params: { }, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/order/clear',
                method: 'delete',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

}
export default SystemAPI;

