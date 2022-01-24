/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    IRoleForm,
    IRoleListForm,
} from "./common.interface";

/**
 * @class RoleAPI
 * @description 角色管理API
 * @return 返回request的config
 */
class RoleAPI {
    
        /**
         * createRole
         * 生成请求参数
         */
        CreateRole = (params: ICreateRoleParams, data: IRoleForm) => {
            const config: AxiosRequestConfig = {
                url: '/role/create',
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
                url: '/role/delete',
                method: 'delete',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findRole
         * 生成请求参数
         */
        FindRole = (params: IFindRoleParams, data: IRoleListForm) => {
            const config: AxiosRequestConfig = {
                url: '/role/list',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * modifyRole
         * 生成请求参数
         */
        ModifyRole = (params: IModifyRoleParams, data: IRoleForm) => {
            const config: AxiosRequestConfig = {
                url: '/role/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        /**
         * 可以创建role和resource之间的关系
         * @param params
         * @param data
         * @constructor
        */
        InitRoleResourceData = (params: any, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/role/save-role-resource',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }


        InitUserRoleData = (params: any, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/role/init/user-role',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }

        /**
         * viewUsers
         * 生成请求参数
         */
        ViewUsers = (params: IViewUsersParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/role/view-users',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }

        FindResourceByRoleId = (params: any, data: any) => {
            const config: AxiosRequestConfig = {
                url: '/resource/find-by-roleid',
                method: 'post',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
}
export default RoleAPI;


/** createRole的请求参数*/
interface ICreateRoleParams{
}

/** delete的请求参数*/
interface IDeleteParams{
    id: number;
}

/** findRole的请求参数*/
interface IFindRoleParams{
}

/** modifyRole的请求参数*/
interface IModifyRoleParams{
}

/** viewUsers的请求参数*/
interface IViewUsersParams{
    roleId: number;
}
