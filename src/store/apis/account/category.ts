/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {
    ICategoryForm,
    ICategoryListForm,
    ICustomerCateForm,
} from "./common.interface";

/**
 * @class CategoryAPI
 * @description category-controllerAPI
 * @return 返回request的config
 */
class CategoryAPI {
    
        /**
         * createCategory
         * 生成请求参数
         */
        CreateCategory = (params: ICreateCategoryParams, data: ICategoryForm) => {
            const config: AxiosRequestConfig = {
                url: '/category/create',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * deleteCategory
         * 生成请求参数
         */
        DeleteCategory = (params: IDeleteCategoryParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/category/delete',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findPage
         * 生成请求参数
         */
        FindPage = (params: IFindPageParams, data: ICategoryListForm) => {
            const config: AxiosRequestConfig = {
                url: '/category/list',
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
                url: '/category/list/all',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findCategoryListByCustomerId
         * 生成请求参数
         */
        FindCategoryListByCustomerId = (params: IFindCategoryListByCustomerIdParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/category/list/customer',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
        /**
         * findDeepestList
         * 生成请求参数
         */
        FindDeepestList = (params: IFindDeepestListParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/category/list/deepest',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }

    /**
     * findDeepestList
     * 生成请求参数
     */
    FindAPITypeList = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/lookup/find-by-name',
            method: 'get',
            params: {
                name: "resource.type"
            },
            data
        };
        config.headers = {};
        return config;
    }
    
        /**
         * modifyCategory
         * 生成请求参数
         */
        ModifyCategory = (params: IModifyCategoryParams, data: ICategoryForm) => {
            const config: AxiosRequestConfig = {
                url: '/category/modify',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * modifyCategoryByCustomerId
         * 生成请求参数
         */
        ModifyCategoryByCustomerId = (params: IModifyCategoryByCustomerIdParams, data: ICustomerCateForm) => {
            const config: AxiosRequestConfig = {
                url: '/category/modify/customer',
                method: 'put',
                params,
                data
            };
            config.headers = {};
            config.headers['Content-Type'] = 'application/json';
            return config;
        }
    
        /**
         * findOne
         * 生成请求参数
         */
        FindOne = (params: IFindOneParams, data: {}) => {
            const config: AxiosRequestConfig = {
                url: '/category/view',
                method: 'get',
                params,
                data
            };
            config.headers = {};
            return config;
        }
    
}
export default CategoryAPI;


/** createCategory的请求参数*/
interface ICreateCategoryParams{
}

/** deleteCategory的请求参数*/
interface IDeleteCategoryParams{
    id: number;
}

/** findPage的请求参数*/
interface IFindPageParams{
}

/** findAll的请求参数*/
interface IFindAllParams{
}

/** findCategoryListByCustomerId的请求参数*/
interface IFindCategoryListByCustomerIdParams{
    customerId: number;
}

/** findDeepestList的请求参数*/
interface IFindDeepestListParams{
}

/** modifyCategory的请求参数*/
interface IModifyCategoryParams{
}

/** modifyCategoryByCustomerId的请求参数*/
interface IModifyCategoryByCustomerIdParams{
}

/** findOne的请求参数*/
interface IFindOneParams{
}
