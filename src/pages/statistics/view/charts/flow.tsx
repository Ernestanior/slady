import {FC, useMemo} from "react";
import {IDataModule} from "@/common/interface";
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts"
import moment from "moment";
import {transformFlow, xAxisFormatterGenerate} from "@/common/utils";

export interface IFlowData{
    flowList: any[] | null;
    cdnFlow: number
    originFlow: number
}

const Flow:FC<IDataModule<IFlowData>> = ({data}) => {

    const options = useMemo(() => {
        if(!data || !data.flowList){
            return null
        }

        const _:echarts.EChartsOption = {
            backgroundColor: '#ffffff',
            title: {
                text: "流量"
            },
            tooltip: {
                trigger: 'axis',
                formatter(params: any){
                    const fms = Array.isArray(params) ? params : [params];

                    const date = moment(fms[0].data[0])

                    return transformFlow(fms[0].data[1]) + "<br />" + date.format("YYYY-MM-DD HH:mm")
                }
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'time',
                boundaryGap: false,
                axisLabel: {
                    rotate: 0,
                    formatter: xAxisFormatterGenerate(data.flowList)
                },
                splitNumber: 20,
                splitLine: {
                    show: true
                },
            } as any,
            yAxis: {
                type: 'value',
                name: "流量",
                nameTextStyle: {
                    fontSize: 12,
                    padding: [0, 0, 0, 95],
                    color: "#666"
                },
                axisLabel: {
                    formatter: (v: any) => {
                        return transformFlow(v);
                    },
                },
                axisTick: {
                    show: false,
                },
            },
            series: [
                {
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: "#BD2719"
                    },
                    showSymbol: false,
                    animation: true,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }
                        ])
                    },
                    data: data.flowList
                }
            ]
        }
        return  _
    }, [data])

    if(!data || !data.flowList){
        return null
    }

    if(!options){
        return null;
    }

    return <section className="cdn-block">
        <div>
            <ReactECharts
                option={options}
            />
        </div>
    </section>
}

export default Flow;
