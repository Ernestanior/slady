/**
 * 字符串转大写
 */
import {AxiosRequestConfig} from "axios";
import {from} from "rxjs";
import request from "@/store/request";
import {reloadMainList} from "@/common/template";

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
        return a.every((at) => b.some((bt) => compareA_B(at, bt)));
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
