// import isMobile from "@/common/isMobile";

import isMobile from "@/app/isMobile";

export const colorCombine = ["#4b92c5", "#254985"];
export const BlackList_Chart_Option = {
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
                show += marker.marker + "" + item.seriesName + ': ' + value[1] + "<br>"
            }
            )
            return show;
        }
    },
    legend: {
        // data: ['黑名单IP拦截', '黑名单UA拦截', '区域黑名单拦截', '请求方式黑名单拦截', 'Dimain黑名单拦截', 'Referrer黑名单拦截', '防盗链拦截', 'URI黑名单拦截', '白名单IP拦截', '白名单UA拦截', '区域白名单拦截'],
        left: "center"
    },
    grid: {
        left: isMobile?0:'30px',
        right: isMobile?0:'20px',
        top:isMobile?'150px':'60px',
        bottom: isMobile?0:'3%',
        containLabel: true
    },
    xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
            rotate: 0,
        },
        splitNumber: isMobile?8:20,
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
    series: [
        {
            name: "黑名单IP拦截",
            type: 'bar',
            stack: '1',
            showSymbol: false,
            smooth: true,
            symbol: 'none',
            animation: true,
            lineStyle: {
                width: 1
            },
            areaStyle: {},
            itemStyle: {
                color: colorCombine[0]
            },
        },
        {
            name: "黑名单UA拦截",
            type: 'bar',
            stack: '1',
            showSymbol: false,
            lineStyle: {
                width: 1
            },
            animation: true,
            areaStyle: {},
            smooth: true,
            symbol: 'none',
            itemStyle: {
                color: colorCombine[1]
            },
        },
        {
            name: "区域黑名单拦截",
            type: 'bar',
            stack: '1',
            showSymbol: false,
            lineStyle: {
                width: 1
            },
            animation: true,
            areaStyle: {},
            smooth: true,
            symbol: 'none',
            itemStyle: {
                // color: colorCombine[2]
            },
        },
        {
            name: "请求方式黑名单拦截",
            type: 'bar',
            stack: '1',
            showSymbol: false,
            lineStyle: {
                width: 1
            },
            animation: true,
            areaStyle: {},
            smooth: true,
            symbol: 'none',
            itemStyle: {
                // color: colorCombine[3]
            },
        },
        {
            name: "Dimain黑名单拦截",
            type: 'bar',
            stack: '1',
            showSymbol: false,
            lineStyle: {
                width: 1
            },
            animation: true,
            areaStyle: {},
            smooth: true,
            symbol: 'none',
            itemStyle: {
                // color: colorCombine[4]
            },
        },
        {
            name: "Referrer黑名单拦截",
            type: 'bar',
            stack: '1',
            showSymbol: false,
            lineStyle: {
                width: 1
            },
            animation: true,
            areaStyle: {},
            smooth: true,
            symbol: 'none',
            itemStyle: {
                // color: colorCombine[5]
            },
        },
        {
            name: "防盗链拦截",
            type: 'bar',
            stack: '1',
            showSymbol: false,
            lineStyle: {
                width: 1
            },
            animation: true,
            areaStyle: {},
            smooth: true,
            symbol: 'none',
            itemStyle: {
                // color: colorCombine[6]
            },
        },
        {
            name: "URI黑名单拦截",
            type: 'bar',
            stack: '1',
            showSymbol: false,
            lineStyle: {
                width: 1
            },
            animation: true,
            areaStyle: {},
            smooth: true,
            symbol: 'none',
            itemStyle: {
                // color: colorCombine[7]
            },
        },
    ]
}


export const Speed_Limit_Freeze_Statistics = {
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
                show += marker.marker + "" + item.seriesName + ': ' + value[1] + "<br>"
            }
            )
            return show;
        }
    },
    legend: {
        //data: ["限速拦截", "单链接访问速率限制"],
        left: "center"
    },
    grid: {
        left: '30px',
        right: '20px',
        top:isMobile?"100px":'60px',
        bottom: isMobile?0:'3%',
        containLabel: true
    },
    xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
            rotate: 0,
        },
        splitNumber: isMobile?8:20,
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
    series: [
        {
            name: "限速拦截",
            type: 'line',
            stack: '1',
            showSymbol: false,
            smooth: true,
            symbol: 'none',
            animation: true,
            lineStyle: {
                width: 1
            },
            areaStyle: {},
            itemStyle: {
                color: colorCombine[0]
            },
        },
        {
            name: "单链接访问速率限制",
            type: 'line',
            stack: '1',
            showSymbol: false,
            smooth: true,
            symbol: 'none',
            animation: true,
            lineStyle: {
                width: 1
            },
            areaStyle: {},
            itemStyle: {
                color: colorCombine[1]
            },
        },
    ]
}




export const Malicious_access_count = {
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
            show += date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hour + ': ' + min + '<br>'

            fms.forEach(item => {
                let marker = item as { marker: string }
                let value = item.value as [number, number]
                show += marker.marker + value[1] 
            }
            )
            return show;
        }
    },
    // legend: {
    //     data: [],
    //     left: "center"
    // },
    grid: {
        left: '30px',
        right: '20px',
        top:isMobile?"100px":'60px',
        bottom: isMobile?0:'3%',
        containLabel: true
    },
    xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
            rotate: 0,
        },
        splitNumber: isMobile?8:20,
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
    series: [
        {
            type: 'line',
            stack: '1',
            showSymbol: false,
            smooth: true,
            symbol: 'none',
            animation: true,
            lineStyle: {
                width: 1
            },
            areaStyle: {},
            itemStyle: {
                color: colorCombine[0]
            },
        },
    ]
}

