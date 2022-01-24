/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IAgentForm,
    IAgentListForm,
} from "./common.interface";

/**
 * @class AgentAPI
 * @description 代理管理API
 * @return 返回request的config
 */
class AgentAPI {
    
        /**
         * createAgent
         * 生成请求参数
         */
        CreateAgent = (params: ICreateAgentParams, data: IAgentForm) => {
            const config: AxiosRequestConfig = {
                url: '/agent/create',
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
                url: '/agent/delete',
                method: 'delete',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findAgent
         * 生成请求参数
         */
        FindAgent = (params: IFindAgentParams, data: IAgentListForm) => {
            const config: AxiosRequestConfig = {
                url: '/agent/list',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findAll
         * 生成请求参数
         */
        FindAll = (params: IFindAllParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/agent/list/all',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * modifyAgent
         * 生成请求参数
         */
        ModifyAgent = (params: IModifyAgentParams, data: IAgentForm) => {
            const config: AxiosRequestConfig = {
                url: '/agent/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        FindCustomers = (params: {}, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/agent/customers',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        FindCustomersByUserId = (params: { userId: string }, data:any) => {
            const config: AxiosRequestConfig = {
                url: '/agent/customers-by-user-id',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        AssignCustomers = (params: {userId: number}, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/agent/assign',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
}
export default AgentAPI;


/** createAgent的请求参数*/
interface ICreateAgentParams{
}

/** delete的请求参数*/
interface IDeleteParams{
    id: number;
}

/** findAgent的请求参数*/
interface IFindAgentParams{
}

/** findAll的请求参数*/
interface IFindAllParams{
}

/** modifyAgent的请求参数*/
interface IModifyAgentParams{
}
