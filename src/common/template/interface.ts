import React, {ReactNode} from "react";
import { ITrigger } from "../interface";

/**
 * 字典
 */
export interface IMap {
    [key: string]: string;
}

/**
 * 字典T
 */
export interface IDict {
    name: string;
    value: string;
}


/**
 * 表格行的配置
 * @url https://ant.design/components/table-cn/#Column
 */
export interface IColumnsTypeP<T = {}> {
    key: string;
    /** 列标题 */
    title: string;
    /** 属性名-不传的话，就是操作列 */
    dataIndex?: keyof T;
    /** 是否支持排序 */
    sorter?: boolean;
    /** 宽度 */
    width?: number;
    /** 
     * 自定义渲染 
     * text 当前的值
     * data 当前行的值
     * index，第几行
     * modifyEvent 编辑事件 
     * - 使用前请检查组件是否拥有此功能
     * - 目前仅formtable拥有此功能
     * */
    render?: (text: any, data: any, index: number, modifyEvent?: any) => React.ReactNode;
    fixed?: "left" | "right";
    onCell?: () => {
        style: React.CSSProperties
    }
}

export type IOperationConfig = Array<IOperation<any> | IOperation<any>[]>

/**
 * 此词条无需翻译
 */
export interface IDisableIntl{
    //此词条无需翻译
    disableIntl?: boolean;
}

/**
 * 表格操作下拉框
 */
export interface IOperation<T> extends IDisableIntl{
    icon?: string;
    text: string;
    textValue?: IMap;
    event: (data: T, totalData?: any) => void | ITrigger;
    /** 根据当前数据渲染, 返回true表示隐藏 */
    hide?: (data: T) => boolean;
    disabled?:(data: T) => boolean;
    label?:ReactNode;
    [x: string]: any;
}







export type IBindIDEvent<T> = (id: number) => T;



export interface ILimitQuery{
    filter: (params: any) => boolean;
    message: (params: any) => string;
}

/**
 * 表格限定查找条件，必须输入相应的数据才能执行查找功能
 */
export interface ILimitQueryModule{
    queryLimit?: ILimitQuery
}
