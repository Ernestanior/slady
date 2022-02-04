import {FC, useMemo} from "react";
import {IDataModule} from "@/common/interface";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";
import {transformBindWidth, transformFlow, xAxisFormatterGenerate} from "@/common/utils";

export interface IBindWidth{
    bindWidth95: number;
    bindWidthList: any[] | null
}

const BindWidth:FC<IDataModule<IBindWidth>> = ({data}) => {

    const options = useMemo(() => {
        if(!data || !data.bindWidthList){
            return null
        }
        if(data.bindWidthList.length < 2){
            return null;
        }

         return {
             backgroundColor: '#ffffff',
             title: {
                 text: "带宽"
             },
             tooltip: {
                 trigger: 'axis',
                 formatter(params: any){
                     let show = ''
                     const fms = Array.isArray(params) ? params : [params];
                     const date = moment(fms[0].data[0])
                     const time = date.format("YYYY-MM-DD HH:mm");
                     show += time + '<br>'
                     const circleBgc = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color: #63b0ba;"></span>`
                     fms.forEach(item => {
                             // let marker = item as { marker: string }
                             let value = item.value as [number, number]
                             show += circleBgc + "带宽:" + transformBindWidth(value[1] ? value[1] : 0)
                         }
                     )
                     return show;
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
                    // rotate: 45,
                    // interval: 2,
                    formatter: xAxisFormatterGenerate(data.bindWidthList)
                },
                splitNumber: 20,
                splitLine: {
                    show: true
                },
            },
            yAxis: {
                type: 'value',
                name: "带宽",
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
                    showSymbol: false,
                    symbol: 'none',
                    animation: true,
                    data: data.bindWidthList,
                    lineStyle: {
                        type: 'solid',
                        color: "#63b0ba"
                    },
                    areaStyle: {},
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: "#ffffff"
                            }, {
                                offset: 1, color: "#63b0ba"
                            }]
                        )
                    },
                    markLine:  {
                        data: [{
                            type: "average",
                            lineStyle: {
                                color: "#254985",
                            },
                            yAxis: data.bindWidth95 as any
                        }],
                        label: {
                            position: "middle",
                            formatter: (e: any) => {
                                return "95带宽：" + transformBindWidth(data.bindWidth95);
                            },
                        },
                    },
                }
            ]
        }
    }, [data])

    if(!data || !data.bindWidthList){
        return null
    }

    if(!options){
        return null;
    }

    return <section className="cdn-block">
        <div>
            <ReactECharts
                lazyUpdate={true}
                notMerge={true}
                option={options}
            />
        </div>
    </section>
}

export default BindWidth;
