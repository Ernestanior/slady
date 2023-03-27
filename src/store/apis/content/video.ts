/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {ISearchPage} from "./common.interface";

/**
 * @class DomainAPI
 * @description 域名管理API
 * @return 返回request的config
 */
class VideoAPI {

    VideoList = (params: {}, data: IVideoList) => {
        const config: AxiosRequestConfig = {
            url: '/api/video/page',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    VideoModify = (params: {}, data: IVideoModify) => {
        const config: AxiosRequestConfig = {
            url: '/api/video/modify',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    VideoDelete = (params: {}, data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/api/video/delete',
            method: 'delete',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    VideoCreate = (params: {}, data: IVideo) => {
        const config: AxiosRequestConfig = {
            url: '/api/video/create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        return config;
    }
    VideoTestCreate = (params: {}, data: IVideo) => {
        const config: AxiosRequestConfig = {
            url: '/api/video/test-create',
            method: 'put',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    }
}
export default VideoAPI;


/** batchDelete的请求参数*/
interface IVideoList{
    keyWord?:string;
    searchPage:ISearchPage;
}

/** batchDelete的请求参数*/
export interface IVideo{
    file:any;
    image?:any;
    videoForm:IVideoForm;
}
interface IVideoModify extends IVideo{
    id:number;
}
interface IVideoForm {

}
