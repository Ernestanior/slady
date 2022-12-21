import { Key } from "react";

export enum ChartType {
    LineArea,
    ColumnarStackDiagram,
    Histogram,
    Pie
}
export interface ChartConfig {
    // type图表类型 - LineArea折线面积、ColumnarStackDiagram柱状堆叠图、Histogram柱状图、Pie饼图
    type?: ChartType,
    width?: string;
    height?: string;
    // 纵轴方向的label单位
    yAxisLabel?: string;
    // 纵轴名称
    yAxisName?: string;
    // 标题
    title?: string;
    /**option */
    config?: any;
}

export type ChartData = {
    name?: string;
    list: number[][] | { [key: string]: Key }[],
    // 饼图格式化的数据
    formatPieData?: FormatPie
}

export interface FormatPie {
    value: Key;
    name: string
}

export const colorCombine = ["#4b92c5", "#254985"];

export const bandWidthColorCombine = ["#63b0ba","#ffffff"];