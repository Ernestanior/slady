/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from 'axios';
import {ISearchPage} from "@/store/apis/account/common.interface";


/**
 * @class StatAPI
 * @description stat-controllerAPI
 * @return 返回request的config
 */
class EmailAPI {

    EmailDelete = ( data: number[]) => {
        const config: AxiosRequestConfig = {
            url: '/email/delete-email-record',
            method: 'put',
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    EmailList = (data: IEmailList) => {
        const config: AxiosRequestConfig = {
            url: '/email/list-email-record',
            method: 'post',
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    EmailListSender = (params: {}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/email/list-sender',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    EmailSend = (params: { }, data: any) => {
        const config: AxiosRequestConfig = {
            url: '/email/send-email',
            method: 'post',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    EmailDetail = (params: {emailRecordId:number}, data: {}) => {
        const config: AxiosRequestConfig = {
            url: '/email/find-by-id',
            method: 'get',
            params,
            data
        };
        config.headers = {};
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
}
export default EmailAPI;

export interface IEmailList{
    endDate: string,
    keyWord: string,
    saleId: number,
    searchPage: ISearchPage,
    startDate: string,
    statusOfCDN: number,
    title: string
}
export interface IEmail{
    createDate:string;
    id:number;
    bccList:string[];
    ccList:string[];
    toList:string[];
    sender:string;
    title:string;
    detail:string;
}
export interface IEmailSend{
    bccAddress?:string;
    ccAddress?:string;
    content?:string;
    sender:string;
    title?:string;
    toAddress:string;
}