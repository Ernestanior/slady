import { numFunInter } from "./defense.interfase";

const keyFilter = (text: string) => {
    switch (text) {
        case "current":
            return "目前";
        case "max":
            return "最大";
        case "min":
            return "最小";
        default:
            return "平均";
    }
}
export const defenseChartDispose = (data: numFunInter) => {
    if (data) {
        const t1 = Object.entries({ current: data.current, max: data.max, min: data.min, avg: data.avg });
        return t1.map((item: any) => [keyFilter(item[0]), Number(item[1].toFixed(2))])
    }
    return []
}

export const ObjectToArray = (data: any[]) => {
    if (Array.isArray(data) && data.length) {
        return data.map((t: any) => [t.key, t.value])
    };
    return [];
}

export const ObjectNumComp = (obj: numFunInter, AvgFlag: boolean = false) => {
    if (obj && !AvgFlag) {
        return [obj.current, obj.max, obj.min];
    } else if (obj && AvgFlag) {
        return [obj.current, obj.max, obj.min, parseFloat(obj.avg.toFixed(2))];
    }
    return []
}