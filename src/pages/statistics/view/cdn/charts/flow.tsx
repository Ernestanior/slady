import {FC, useMemo} from "react";
import {IDataModule} from "@/common/interface";
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts"
import moment from "moment";
import {transformFlow, xAxisFormatterGenerate} from "@/common/utils";
import {Col, Row} from "antd";
import isMobile from "@/app/isMobile";

export interface IFlowData{
    flowList: any[] | null;
    originFlowList: any[] | null;
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

                    let str = "";

                    str = str + `CDN: ${transformFlow(fms[0].data[1])}`;
                    // 回源
                    if(fms[1]){
                        str = str + "<br />";
                        str = str + `源点：${transformFlow(fms[1].data[1])}`;
                    }

                    // date
                    str = str + "<br />" + moment(fms[0].data[0]).format("YYYY-MM-DD HH:mm");

                    return str;
                }
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            grid: isMobile?{
                left: '5px',
                right: '5px',
                bottom: '3%',
                containLabel: true
            }:{
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
                    formatter: xAxisFormatterGenerate(data.flowList)
                },
                splitNumber: isMobile?8:20,
                splitLine: {
                    show: true
                },
            } as any,
            yAxis: {
                type: 'value',
                // name: "流量",
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
                        color: "#4b92c5"
                    },
                    showSymbol: false,
                    animation: true,
                    data: data.flowList
                },
                {
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: "#254985"
                    },
                    showSymbol: false,
                    animation: true,
                    data: data.originFlowList || []
                }
            ],
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
                style={{
                    height: 400
                }}
                option={options}
            />
            <div style={{marginTop: 30}}>
                <Row gutter={[15, 15]}>
                    <Col span={4}>
                        CDN
                    </Col>
                    <Col span={20}>
                        {data && transformFlow(data.cdnFlow)}
                    </Col>
                    <Col span={4}>
                        源点
                    </Col>
                    <Col span={20}>
                        {data && transformFlow(data.originFlow)}
                    </Col>
                </Row>
            </div>
        </div>
    </section>
}

export default Flow;
