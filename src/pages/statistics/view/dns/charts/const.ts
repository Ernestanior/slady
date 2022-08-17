import { EChartsOption } from "echarts-for-react"
import isMobile from "@/app/isMobile";

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
            right: 10,
            orient: 'vertical',
            top: 20,
            type: "scroll"
        },
        grid: isMobile?{
            left: '1px',
            right: '1px',
            bottom: '3%',
            containLabel: true
        }:{
            left: '30px',
            right: '250px',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            axisLabel: {
                rotate: 0,
            },
            splitNumber: isMobile?8:15,
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
        series: chartDatas.map((item:any) =>({
            name: item.domain,
            type: 'line',
            showSymbol: false,
            symbol: 'none',
            animation: true,
            data: item.dataList.map((_item:any) => [_item.time, _item.count]),
            stack: 'Total',
            areaStyle: {},
            lineStyle: {
                width: 1
            }
        }))
    }
    if (title) {
        _opt = { ..._opt, title: { text: title } }
    }
    return _opt
}