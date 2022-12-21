import React, { useEffect, useState } from "react";
import EchartLoader from "./components/echarts-Loader";
import { FC } from "react";
import { shiftChange } from "./components/commonFC";
import { colorCombine, bandWidthColorCombine } from "./types"
import isMobile from "@/app/isMobile";
import * as echarts from "echarts";

interface PropsIp {
  /**传入的数据*/
  data: any;
  /**数据中是节点流量和回源流量，注意顺序 */
  sumFlow?: number[];
  title?: string;
  style?: React.CSSProperties;
  bandwidth95: number | null;
}
const ChartBandWidth: FC<PropsIp> = (props) => {
  const [chartDatas, setData] = useState<any[][]>([]);
  const [sumCDNFlow, setsumCDNFlow] = useState<number>(0);
  const [sumOriginFlow, setsumOriginFlow] = useState<number>(0);
  useEffect(() => {
    if (props.data) {
      setData(props.data ? props.data : []);
    }
  }, [props]);
  useEffect(() => {
    if (props.sumFlow?.length) {
      setsumCDNFlow(props.sumFlow[0]);
      setsumOriginFlow(props.sumFlow[1]);
    }
  }, [props]);
  const option: any = {
    backgroundColor: '#ffffff',
    title: {
      text: props.title,
    },
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
        const circleBgc = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${bandWidthColorCombine[0]};"></span>`
        fms.forEach(item => {
          // let marker = item as { marker: string }
          let value = item.value as [number, number]
          show += circleBgc +  "BANDWIDTH :" + transformBindWidth(value[1] ? value[1] : 0)
        }
        )
        return show;
      }
    },
    grid: {
      left: isMobile?'0':'30px',
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
      name: `节点流量${shiftChange(sumCDNFlow)}---回源流量${shiftChange(sumOriginFlow)}`,
      nameTextStyle: {
        fontSize: 12,
        padding: [0, 0, 0, 90],
        color: "#666"
      },
      axisLabel: {
        formatter: (v: any) => {
          return transformBindWidth(v);
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
        {
      name: "带宽",
      type: 'line',
      showSymbol: false,
      symbol: 'none',
      animation: true,
      data: chartDatas,
      lineStyle: {
        width: 1
      },
      areaStyle: {},
      itemStyle: {
        color: bandWidthColorCombine[0],
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: bandWidthColorCombine[1]
          }, {
            offset: 1, color: bandWidthColorCombine[0]
          }]
          ),
          lineStyle: {
            width: 1,
            type: 'solid',
            color: bandWidthColorCombine[0]
          }
        },
      },
      markLine:  {
        data: [{
          type: "average",
          lineStyle: {
            color: colorCombine[1],
          },
          yAxis: props.bandwidth95 ? props.bandwidth95 : 0
        }],
        label: {
          position: "middle",
          formatter: (e: any) => {
            return `95带宽: ${transformBindWidth(props.bandwidth95 ? props.bandwidth95 : 0)}`;
          },
        },
      },
    },
    ]
  }
  return (
    <div className="cdn-block" style={{ marginLeft: 0, marginRight: 0, paddingLeft: 15, paddingRight: 15 }}>
      <EchartLoader style={props.style} config={option} />
    </div>
  );
};

export default ChartBandWidth;



/**
 * 带宽转换
 */
export const transformBindWidth = (value: number) => {
  if (value < 1000) {
    return value.toFixed(2) + "bps";
  }
  const kb = value / 1000;
  if (kb < 1000) {
    return kb.toFixed(2) + "Kbps";
  }
  const mb = kb / 1000;
  if (mb < 1000) {
    return mb.toFixed(2) + "Mbps";
  }
  const gb = mb / 1000;
  return gb.toFixed(2) + "Gbps";
};