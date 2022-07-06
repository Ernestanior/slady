/**
 * 无参数触发事件
 */
import React, {ReactNode} from "react";
import {E_USER_TYPE} from "@/store/account/interface";
import {IPageResult} from "@/store/apis/account/common.interface";
import {AxiosRequestConfig} from "axios";
import {XOR} from "ts-xor";
import {FormInstance} from "antd";
import moment from "moment";
import {SelectProps} from "antd/lib/select";
import {BehaviorSubject, Subject} from "rxjs";

export type ITrigger = () => void;

export type ICallback = (rep?: any) => void

export type IChangeModule = (value:any, totalSelectConfig?:any) => void

export type ISubmit = (data: any) => void;

export type ISubmitPromise = (data: any) => Promise<{isSuccess: boolean}>;

export interface IFilerModule{
    filter?: ReactNode;
}

export interface IPrimaryModule{
    primary?: boolean;
}

export interface IRoleLimitModule{
    role?: E_USER_TYPE[]
}

export interface ILabelModule{
    text: string
}

export interface INormalEvent extends IPrimaryModule, IRoleLimitModule{
    text: string;
    icon?: ReactNode;
    event: ICallback;
}

export interface IBatchEvent extends IPrimaryModule, IRoleLimitModule{
    text: string;
    hide?:boolean;
    icon?: ReactNode;
    event: ICallback;
}

export interface IEventListModule{
    event?: INormalEvent[]
}
export interface IBatchEventListModule{
    batchEvent?:IBatchEvent[]
    selectItems?:any[];
}
export interface ISubmitModule{
    submit: ISubmit
}

export interface ISubmitAsyncModule{
    submit: ISubmitPromise
}

export interface ICancelModule{
    cancel?: ICallback
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

export interface IFormComponent<T=any>{
    value?: T;
    onChange?: IChangeModule;
    disable?: boolean;
}

export interface ISwitchValue{
    trueValue?: any;
    falseValue?: any;
}

export interface IFormModule{
    form: FormInstance;
}

export interface ITitleModule{
    title?: ReactNode
}

export interface IEventModule{
    event$: Subject<boolean>
}

export interface IDisableModule{
    disableProperty?: {
        [key: string]: boolean;
    }
}

export interface IAsyncModule{
    query: () => AxiosRequestConfig;
    loader?: (data: any) => any
}

export interface ISelectProps extends SelectProps{
    size?: "small" | "large";
    onChange?: IChangeModule;
    placeholder?: string;
    /** 空白选项 */
    emptyOption?: boolean;
    /** 下拉列表的展示和提交配置 */
    config?: ISelectOptionConfig
    /** 默认值 */
    defaultValue?: any;
    /** 样式 */
    style?: React.CSSProperties;
    /** 禁用 */
    disabled?: boolean;
    /** 提供函数确定初始选中值 */
    selectedFunction?: (data: any) => boolean;
}

export interface ILoadTrigger{
    loadTrigger?: ICallback
}

export interface IConfirmModule extends ISubmitModule{
    info: string;
}

export interface ITableDataModule<T=any>{
    content: T[];
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface IIDModule{
    id?: number
}

/**
 * 时间筛选
 */
export enum ETimeFilter{
    TODAY="today",
    YESTERDAY="yesterday",
    LAST7DAY="last7day",
    LAST30DAY="last30day",
    CURRENT_MONTH="currentMonth",
    CUSTOM="custom"
}

export interface ITimeFilter{
    startDate?: moment.Moment;
    endDate?: moment.Moment;
    reportType: ETimeFilter
}

export interface ITimeFilterModule{
    timeFilter?: ITimeFilter
}

export interface IDefaultValue{
    defaultValue?: any
}

export interface IDataModule<T = any>{
    data: T | null
}

export type IEvent = BehaviorSubject<any> | Subject<any>;

export interface IAsyncEventModule{
    event$?: IEvent
}