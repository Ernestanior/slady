import React, { useEffect, useState } from 'react';
import EchartLoader from "./components/echarts-Loader";
import { FC } from 'react';
import { colorCombine } from "./types";
import isMobile from "@/app/isMobile";
interface PropsIp {
  data: any;
  TwoData:any;
  title?: string;
  style?: any;
}
const Chartquestquantity: FC<PropsIp> = (props) => {
  const [chartDatas, setData] = useState<any[][]>([]);
  useEffect(() => {
    if(props.data && props.TwoData){
      getList(props.data,props.TwoData);
  }
  }, [props]);
  const getList = (result: any[],result2:any[]) => {
    const r: any[] = result;
    const r1: any[] = result2;
    const rrr = [r, r1];
    setData(rrr);
  };
  const option:any = {
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
            if (params instanceof Array) {fms = params} else {fms = [params]}
            let date = new Date(fms[0].data[0]);
            let min: string | number = date.getMinutes()
            if (min < 10) {min = '0' + min}
            let hour: string | number = date.getHours()
            if (hour < 10) {hour = '0' + hour}
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
        axisLabel: {
            formatter: function (value: number) {
                return value
            }
        },

    },
    series: [{
        name:'边缘节点',
        type: 'bar',
        stack: '1',
        data:chartDatas[0],
        animation: true,
        itemStyle: {
            color: colorCombine[0]
        },
    },
    {
        name: "回源",
        type: 'bar',
        stack: '1',
        data: chartDatas[1],
        itemStyle: {
            color: colorCombine[1]
        },
    }]
  }
  return (
    <div>
      <EchartLoader style={props.style} config={option} />
    </div>
  );
};
export default Chartquestquantity;