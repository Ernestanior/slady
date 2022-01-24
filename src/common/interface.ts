/**
 * 无参数触发事件
 */
import {ReactNode} from "react";
import {E_USER_TYPE} from "@/store/account/interface";
import {IPageResult} from "@/store/apis/account/common.interface";
import {AxiosRequestConfig} from "axios";
import {XOR} from "ts-xor";

export type ITrigger = () => void;


export type ICallback = (rep?: any) => void

export type ISubmit = (data: any) => void;

export interface IFilerModule{
    filter?: ReactNode;
}

export interface IPrimaryModule{
    primary?: boolean;
}

export interface IRoleLimitModule{
    role?: E_USER_TYPE[]
}

export interface INormalEvent extends IPrimaryModule, IRoleLimitModule{
    text: string;
    icon?: ReactNode;
    event: ICallback;
}

export interface IEventListModule{
    event?: INormalEvent[]
}

export interface ISubmitModule{
    submit?: ISubmit
}

/**
 * 将queryConfig和queryFunc合并
 *
 */
export interface IQueryConfig {
    /** 多次调用不建议使用queryData */
    queryData: (data: any) => AxiosRequestConfig | null;
}

export interface IQueryFunction {
    /**
     * 使用一个异步的promise函数获取到数据
     * 可以在这个函数中使用async await
     * 可以使用多个async await 以达到请求多个接口，最后将数据合并 retunr
     * queryDataFunction
     * */
    queryDataFunction: (data: any) => Promise<IPageResult<any> | null>;
}

/**
 * 数据获取模块
 */
export type IQueryModule = XOR<IQueryConfig, IQueryFunction>;


export interface ISelectItem {
    id: string | number;
    [key: string]: any;
}

export interface ISelectOptionConfig {
    /** 提交属性 */
    idKey: string;
    /** 展示属性 */
    textKey: string;
}