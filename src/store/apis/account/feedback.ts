/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IFeedbackForm,
    IFeedbackListForm,
} from "./common.interface";

/**
 * @class FeedbackAPI
 * @description 用户反馈API
 * @return 返回request的config
 */
class FeedbackAPI {
    
        /**
         * 更改反馈信息状态
         * 生成请求参数
         */
        ModifyFeedbackStatus = (params: IModifyFeedbackStatusParams, data: IFeedbackForm) => {
            const config: AxiosRequestConfig = {
                url: '/feedback/change-status',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * 填写反馈信息
         * 生成请求参数
         */
        CreateFeedback = (params: ICreateFeedbackParams, data: IFeedbackForm) => {
            const config: AxiosRequestConfig = {
                url: '/feedback/create',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * 用户反馈信息列表
         * 生成请求参数
         */
        FindFeedbackList = (params: IFindFeedbackListParams, data: IFeedbackListForm) => {
            const config: AxiosRequestConfig = {
                url: '/feedback/list',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * 查看反馈信息
         * 生成请求参数
         */
        FindOne = (params: IFindOneParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/feedback/view',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
}
export default FeedbackAPI;


/** 更改反馈信息状态的请求参数*/
interface IModifyFeedbackStatusParams{
}

/** 填写反馈信息的请求参数*/
interface ICreateFeedbackParams{
}

/** 用户反馈信息列表的请求参数*/
interface IFindFeedbackListParams{
}

/** 查看反馈信息的请求参数*/
interface IFindOneParams{
    id: number;
}
