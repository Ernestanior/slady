import React from 'react';
import * as echarts from "echarts";
import { FC } from 'react';
import jsonData from './theme.json';
import ReactEcharts from 'echarts-for-react';
interface PropsIp {
    config: any;
    title?: string;
    style?: React.CSSProperties;
    ri?: number
}
echarts.registerTheme('my_theme', jsonData);
const defaultW = '100%';
const defaultJH = "360px";
const ChartFluxs: FC<PropsIp> = (props) => {
    return (
        <>
            <ReactEcharts
                theme="my_theme"
                lazyUpdate={true}
                notMerge={true}
                style={{ width: defaultW, height: defaultJH, position: "relative", ...props.style }}
                option={props.config}
            /> 
            {/* <div
                style={{ width:  defaultW, height: defaultJH ,position:"relative",...props.style}}
                ref={main2}
            /> */}
        </>
    );
};
export default ChartFluxs;