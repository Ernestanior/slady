import { EChartsOption } from "echarts-for-react"
import {xAxisFormatterGenerate} from "@/common/utils";

export const option: EChartsOption = (chartDatas: any, title: string) => {
    let _opt: any = {
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
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
                    show += marker.marker + "" + item.seriesName + ': ' + value[1] + "<br>"
                }
                )
                return show;
            }
        },
        legend: {
            data: ['解析量统计']
        },
        grid: {
            left: '30px',
            right: '20px',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            axisLabel: {
                rotate: 0,
                formatter: xAxisFormatterGenerate(chartDatas)
            },
            splitNumber: 20,
            splitLine: {
                show: true
            },
        },
        yAxis: {
            type: 'value',
            nameTextStyle: {
                fontSize: 12,
                padding: [0, 0, 0, 95],
                color: "#666"
            },
            axisLabel: {
                formatter: (v: any) => {
                    return v;
                },
            },
            axisTick: {
                show: false,
            },
        },
        series: {
            name: '',
            datasetId: '',
            type: 'line',
            showSymbol: false,
            symbol: 'none',
            animation: true,
            data: chartDatas.map((v: any) => {
                return [new Date(v.time).getTime(), v.count]
            }),
            lineStyle: {
                width: 1
            },
            areaStyle: {},
            itemStyle: {},
        }
    }
    if (title) {
        _opt = { ..._opt, title: { text: title } }
    }
    return _opt
}