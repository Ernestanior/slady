import React, { useEffect, useState } from 'react';
import EchartLoader from "./components/echarts-Loader";
import { FC } from 'react';
import { colorCombine } from "./types"
import isMobile from "@/app/isMobile";
interface PropsIp {
    data: any;
    title?: string;
    style?:React.CSSProperties
}
const ChartCache: FC<PropsIp> = (props) => {
    const [chartDatas, setData] = useState<any[][]>([]);
    useEffect(() => {
        if (props.data) {
            setData(props.data)
        }
    }, [props])
    let xD: any[] = []
    let DKdata: any[] = [];
    chartDatas.forEach((v) => {
        xD.push(v[0]);
        DKdata.push(v[1])
    });
    const option: any = {
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
                    show += marker.marker + "" + value[1] + "%"
                }
                )
                return show;
            }
        },
        grid: {
            left: isMobile?0:'30px',
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
            type: 'value',
            max: 100,
            axisLabel: {
                formatter: (v: any) => {
                    return v + "%";
                }
            },

        },
        series: [{
            type: 'bar',
            data: chartDatas,
            animation: true,
            areaStyle: {},
            itemStyle: {
                color: colorCombine[0]
            },
        }]
    }
    return (
        <div>
            <EchartLoader style={props.style} config={option} />
        </div>
    );
};
export default ChartCache; 