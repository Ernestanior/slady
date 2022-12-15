import React, { FC, useEffect, useState } from 'react';
import EchartLoader from "./components/echarts-Loader";
// import LoadingD from './components/loadingD';
import isMobile from "@/app/isMobile";
interface PropsIp {
    data: any;
    title?: string;
    style?: React.CSSProperties;
}
const ChartPie: FC<PropsIp> = (props) => {
    const [chartDatas, setData] = useState<any[]>([]);
    useEffect(() => {
        setData(props.data)
    }, [props]);
    let pieD: any[] = []
    let option: any;
    // if (!chartDatas.length) { return <LoadingD /> }
    chartDatas.forEach((v) => {
        pieD.push({ name: v.name, value: v.sumFlow });
    });
    option = option = {
        title: {
            text: "流量前十站",
        },
        tooltip: {
            trigger: 'item',
            formatter: (v: any) => {
                return v.data.name + " " + transformFlow(v.data.value) + " " + v.percent + "%"
            }
        },
        legend: {
            type: 'scroll',
            orient: isMobile?'horizontal':'vertical',
            right: "5%",
            top: "10%",
            bottom: "10%",
            align: "left",
            // center:['30%', '50%'],
            data: pieD.map(i => i.name),
            textStyle: {
                fontSize: 16
            },
            tooltip: {
                show:true,
                formatter: (v: any) => {
                    return v.name
                }
            },
            formatter: (t: string) => {
                if (t && t.length >= 10) {
                    return t.slice(0, 10) as string + "...";
                }
                return t
            }
        },
        series: [
            {
                type: 'pie',
                radius: '58%',
                center: isMobile?['50%', '50%']:['30%', '50%'],
                data: pieD,
                labelLine: {
                    show: false
                },
                avoidLabelOverlap: false,
                label: {
                    show: false,

                },
                emphasis: {
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    }
                },
                itemStyle: {

                }
            }
        ]
    };
    return (
        <div className='white-wrap'>
            <EchartLoader style={props.style} config={option} />
        </div>
    );
}

export default ChartPie;

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
