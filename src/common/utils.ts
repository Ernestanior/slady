/**
 * 字符串转大写
 */
import {AxiosRequestConfig} from "axios";
import {from} from "rxjs";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";
import {ICallback} from "@/common/interface";
import moment from "moment";

export const upperCasePlx = (value: string | number) =>
    typeof value === "string" ? value.toUpperCase() : value;


/**
 * 比对两个对象，数组，简单属性
 * @description 判断a中的所有属性都在b中存在，并且相等
 * true 表示两者属性相等,
 * @param a
 * @param b
 * @param properties
 */
export const compareA_B: <T>(
    a: T,
    b: T,
    properties?: Array<keyof T>
) => boolean = <T>(a: T, b: T, properties?: Array<keyof T>) => {
    if (a === b) {
        return true;
    }
    if (typeof a !== "object") {
        return `${a}` === `${b}`;
    }
    // a, b 有一个为空值
    if (xorCompare(a, b)) {
        const onlyOne = removeEmptyObject(a || b);
        return !onlyOne;
    }
    if (!a && !b) {
        return true;
    }
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) {
            return false;
        }
        if (a.length !== b.length) {
            return false;
        }
        return a.join(",") === b.join(",");
    }
    const aProperties = Object.keys(a) as Array<keyof T>;
    const bProperties = Object.keys(b) as Array<keyof T>;

    // 保证两者至少都有一个属性
    if (aProperties.length * bProperties.length < 1) {
        return false;
    }
    // 普通对象
    const compareProperties: Array<keyof T> =
        properties ||
        (aProperties.length < bProperties.length ? aProperties : bProperties);
    // eslint-disable-next-line eqeqeq
    return compareProperties.every((key) => compareA_B(a[key], b[key]));
};

/**
 * 移除对象值为空的属性
 * @param a 一定不是空值
 */
export const removeEmptyObject = (a: any) => {
    if (!a) {
        return null;
    }
    if (typeof a !== "object") {
        return a;
    }
    let result: any = null;
    const keys = Object.keys(a);
    if (keys.length < 1) {
        return null;
    }
    keys.forEach((key) => {
        const value = removeEmptyObject(a[key]);
        if (value !== null) {
            if (!result) {
                result = {};
            }
            result[key] = value;
        }
    });
    return result;
};

export const xorCompare = (a: any, b: any) => {
    const _a = !!a ? 1 : 0;
    const _b = !!b ? 1 : 0;
    return _a ^ _b;
};

export const queryValue = (a:any, defaultValue:any) => {
    if(typeof a === "undefined"){
        return defaultValue
    }
    return a;
}

export const reqAndReload = (config: AxiosRequestConfig) => {
    from(request(config)).subscribe(res => {
        if(res.isSuccess){
            reloadMainList();
        }
    })
}

export const reqAndCallback = (config: AxiosRequestConfig, cb?: ICallback) => {
    from(request(config)).subscribe(res => {
        if(res.isSuccess){
            cb && cb(res.result)
        }
    })
}

export const queryValueFromListRender = (
    configs: Array<{id: any, name: any}>
) => (value: any) => {
    const item = configs.find(t => t.id === value);
    if (item) {
        return item.name
    }
    return "-";
};

export function toFixed(value: number, len: number){
    if(value%1 === 0){
        return value
    }
    return value.toFixed(len)
}

export const transformFlow = (value: number) => {
    if (value < 1000) {
        return value.toFixed(2) + "B";
    }
    const kb = value / 1000;
    if (kb < 1000) {
        return kb.toFixed(2) + "KB";
    }
    const mb = kb / 1000;
    if (mb < 1000) {
        return mb.toFixed(2) + "MB";
    }
    const gb = mb / 1000;
    return gb.toFixed(2) + "GB";
};

/**
 * 带宽转换
 */
export const transformBindWidth = (value: number) => {
    if (value < 1000) {
        return value.toFixed(2) + "Bps";
    }
    const kb = value / 1000;
    if (kb < 1000) {
        return kb.toFixed(2) + "Kbps";
    }
    const mb = kb / 1000;
    if (mb < 1000) {
        return mb.toFixed(2) + "Mbps";
    }
    const gb = mb / 1000;
    return gb.toFixed(2) + "Gbps";
};


export const xAxisFormatterGenerate = (data: number[][]) => {
    const startDate = moment(data[0][0]);
    const endDate = moment(data[data.length - 1][0]);
    let needYear = false;
    let needHourAndMinute = false;
    if(endDate.diff(startDate, "day") <= 7){
        needHourAndMinute = true;
    }else{
        needYear = true;
    }
    return function(value: any, a: number){
        if((a % 2) === 0){
            return null;
        }
        if(needYear){
            return moment(value).format("MM-DD") + " \n" + moment(value).format("YYYY")
        }
        if(needHourAndMinute){
            return moment(value).format("HH:mm") + " \n" + moment(value).format("MM-DD")
        }
        return moment(value).format("MM-DD");
    }
}

export const trimAndRemoveUndefined = (values: any) => {
    const _value:any = {};
    for (const valueKey in values) {
        if(typeof values[valueKey] !== "undefined"){
            if(typeof values[valueKey] === "string"){
                if(values[valueKey]){
                    _value[valueKey] = values[valueKey].trim();
                }
            }else{
                _value[valueKey] = values[valueKey]
            }
        }
    }
    return _value
}

/**
 * name: string[];
 * value: any
 */
export const getValueFromForm = (a: any) => {
    return {[a.name.join(".")]: a.value}
}

export const validateEmail = (email: any) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
