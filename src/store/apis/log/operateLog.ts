/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IOperateLogForm,
} from "./common.interface";

/**
 * @class OperateLogAPI
 * @description operate-log-controllerAPI
 * @return 返回request的config
 */
class OperateLogAPI {

        /**
         * findAccessLog
         * 生成请求参数
         */
        FindAccessLog = (params: IFindAccessLogParams, data: IOperateLogForm) => {
            const config: AxiosRequestConfig = {
                url: '/operation-log/list',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

}
export default OperateLogAPI;


/** findAccessLog的请求参数*/
interface IFindAccessLogParams{
}
