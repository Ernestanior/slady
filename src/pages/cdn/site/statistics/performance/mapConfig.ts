import {colorCombine} from "@/pages/cdn/site/echarts/types";

export const COUNTRY_OPTIONS = {
    title: {
        show: true,
    },

    tooltip: {
        trigger: "item",
        formatter: (data: any) => {
            if (!isNaN(data.value)) {
                return data.name + ":" + data.value;
            }
            return data.name + " : " + 0;
        },
    },

    visualMap: [
        {
            min: 0,
            max: 100,
            realtime: false,
            calculable: true,
            inRange: {
                color: ["#d1e0e4", "#1783c7"],
            },
            bottom: 20,
            left: 40,
        },
    ],
    series: [
        {
            name: "world",
            type: "map",
            roam: false,
            map: "world",
            itemStyle: {
                normal: {
                    areaColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#99bdd0",
                },
                emphasis: {
                    areaColor: "#ffffff",
                    label: { show: true },
                },
            },
        },
    ],
}

export const COMBINE_STATUS_CODE = {
    backgroundColor: '#ffffff',
    title: {
        text: "状态码",
        left: "25px"
    },
    tooltip: {
        trigger: 'axis',
        formatter: (
            params: any,
            ticket: string,
            callback: (ticket: string, html: string) => void,
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
            // show += hour+ ':' + min + " " + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '<br>'
            show += date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hour + ':' + min + '<br>'

            fms.forEach(item => {
                let marker = item as { marker: string }
                let value = item.value as [number, number]

                show += marker.marker + "" + item.seriesName + ':' + value[1] + "<br>"
            }
            )
            return show;
        }
    },
    legend: {
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
        },
        splitNumber: 20,
        splitLine: {
            show: true
        },
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: function (value: number) {
                return value
            }
        },

    },
    // dataZoom: [{
    //     type: 'inside'
    // }],
    series: [{
        name: "边缘节点",
        type: 'bar',
        stack: '1',
        showSymbol: false,
        itemStyle: {
            // normal:{
            //     lineStyle:{
            //         width:1
            //     }
            // }
            color: colorCombine[0]
        },
    },
    {
        name: "回源",
        type: 'bar',
        stack: '1',
        showSymbol: false,
        itemStyle: {
            // normal:{
            //     lineStyle:{
            //         width:1
            //     }
            // }
            color: colorCombine[1]
        },
    }]
}
