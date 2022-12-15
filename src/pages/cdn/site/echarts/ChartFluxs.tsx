import React, { useEffect, useState } from 'react';
import EchartLoader from "./components/echarts-Loader";
import { FC } from 'react';
import { shiftChange } from "./components/commonFC";
import { colorCombine } from "./types"
import isMobile from "@/app/isMobile";
import moment from "moment";
interface PropsIp {
    data: any;
    TwoData: any;
    title?: string;
    style?: React.CSSProperties;
}
const ChartFluxs: FC<PropsIp> = (props) => {
    const [chartDatas, setData] = useState<any[][]>([]);
    const [time, setTime] = useState<string>("");
    useEffect(() => {
        if (props.data && props.TwoData) {
            getList(props.data, props.TwoData);
        }
    }, [props])
    const getList = (result: any[], result2: any[]) => {
        const r: any[] = result;
        const r1: any[] = result2;
        const rrr = [r, r1];
        setData(rrr);
        if (r.length > 1) {
            setTime(TimeDifference(r[0][0], r[1][0]));
        }
    };
    let option: any;
    option = {
        title: {
            text: props.title,
        },
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'axis',
            formatter: (
                params: any,
            ) => {
                let show = ''
                let fms: any[]

                if (params instanceof Array) {
                    fms = params
                } else {
                    fms = [params]
                }
                let date = new Date(fms[0].data[0])

                let min: string | number = date.getMinutes()
                if (min < 10) {
                    min = '0' + min
                }
                let hour: string | number = date.getHours()
                if (hour < 10) {
                    hour = '0' + hour
                }
                show += date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hour + ':' + min + '<br>'

                fms.forEach(item => {
                    let marker = item as { marker: string }
                    let value = item.value as [number, number]
                    show += marker.marker + "" + item.seriesName + ':' + shiftChange(value[1]) + "<br/>"
                }
                )
                return show;
            }
        },
        legend: {
        },
        grid: {
            left: isMobile?'4px':'30px',
            right: '20px',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            axisLabel: {
                rotate: 0,
            },
            splitNumber: isMobile?5:20,
            splitLine: {
                show: true
            },
        },
        yAxis: {
            name: `单位流量/${time}`,
            nameTextStyle: {
                fontSize: 12,
                color: "#666"
            },
            type: 'value',
            axisLabel: {
                formatter: function (value: number) {
                    return shiftChange(value)
                }
            },

        },
        series: [{
            type: 'line',
            showSymbol: false,
            // smooth: true,
            symbol: 'none',
            animation: true,
            lineStyle: {
                width: 1
            },
            areaStyle: {},
            itemStyle: {
                color: colorCombine[0]
            },
            name: "边缘节点",
            data: chartDatas[0],
        },
        {
            name: "回源",
            type: 'line',
            showSymbol: false,
            // smooth: true,
            symbol: 'none',
            animation: true,
            lineStyle: {
                width: 1
            },
            areaStyle: {},
            itemStyle: {
                color: colorCombine[1]
            },
            data: chartDatas[1],

        }]
    }
    return (
        <div>
            <EchartLoader style={props.style} config={option} />
        </div>
    );
};
export default ChartFluxs;

/**
 * 计算两个时间之差：传入参数可以为字符串、时间对象、时间戳均可
 * @param startTime 初始时间
 * @param endTime 结束时间
 */
export const TimeDifference = (
    startTime: string | number,
    endTime: string | number
) => {
    if (startTime && endTime) {
        const _start: number = moment(startTime).valueOf();
        const _end: number = moment(endTime).valueOf();
        return _end > _start
            ? ComputingTime(_end - _start)
            : ComputingTime(_start - _end);
    }
    return "0";
};

//时间间隔处理子函数
const ComputingTime = (_time: number) => {
    const seconds = _time / 1000;
    if (seconds) {
        if (seconds > 0 && seconds < 60) {
            return `${Math.floor(seconds)}秒`;
        } else if (seconds >= 60 && seconds < 3600) {
            return `${Math.floor(seconds / 60)}分钟`;
        } else if (seconds >= 3600 && seconds < 3600 * 24) {
            return `${Math.floor(seconds / 3600)}小时`;
        } else if (seconds >= 3600 * 24) {
            return `${Math.floor(seconds / 3600 / 24)}天`;
        }
    }
    return "0";
};