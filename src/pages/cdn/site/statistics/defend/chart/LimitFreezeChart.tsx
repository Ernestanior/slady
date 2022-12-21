import React, { FC, useEffect, useMemo, useState } from "react"
import StatAPI from "@/store/apis/stat/stat";
import { from } from "rxjs";
import SummaryTable from "@/pages/cdn/site/summaryTable/summaryTable";
import req from "@/store/request";
import { Col, Row } from "antd";
import ReactEcharts from "echarts-for-react";
import { Speed_Limit_Freeze_Statistics } from "./optionConfig";
import { ObjectNumComp, ObjectToArray } from "../defense.util";
import { DefensiveKeys } from "../defense.interfase";
const statService = new StatAPI();
interface Iprops {
    siteInfo: any;
    filterData: any;
    title?: string;
}
const StatusChart: FC<Iprops> = ({ siteInfo, filterData, ...props }) => {
    const [SummaryTableData, setSummaryTableData] = useState<any[]>([]);
    const [numFun] = useState<any>({
        current: 0,
        max: 0,
        min: 0,
        avg: 0
    });
    const [accessControlGather, setaccessControlGather] = useState({
        [DefensiveKeys.SPEEDLIMITBLACKLIST + "List"]: [],//限速拦截
        [DefensiveKeys.SINGLELINKACCESSRETE + "List"]: [],//单链接访问速率限制
    });
    // const BlackListQuery = useCallback((params) => {
    //     const accessControlConfig = statService.StatDefense({}, { ...params });
    //     from(reqService(accessControlConfig)).subscribe((res: any) => {
    //         if (res) {
    //             if (res.statNodes) {
    //                 setaccessControlGather(res.statNodes);
    //             }
    //             if (res.statInfos) {
    //                 const statInfo = res.statInfos;
    //                 setSummaryTableData([
    //                     ['TOTAL_AMOUNT_INTERCEPT', ...ObjectNumComp(statInfo.totalStatInfo ? statInfo.totalStatInfo : numFun, true)],
    //                     ['RATE_LIMIT_INTERCEPTION', ...ObjectNumComp(statInfo[DefensiveKeys.SPEEDLIMITBLACKLIST + "Info"] ? statInfo[DefensiveKeys.SPEEDLIMITBLACKLIST + "Info"] : numFun, true)],
    //                     ['SINGLE_LINK_ACCESS_RATE_LIMIT', ...ObjectNumComp(statInfo[DefensiveKeys.SINGLELINKACCESSRETE + "Info"] ? statInfo[DefensiveKeys.SINGLELINKACCESSRETE + "Info"] : numFun, true)],
    //                 ])
    //             }
    //         }
    //     });
    // }, [numFun, setSummaryTableData]);
    useEffect(() => {
        if (siteInfo ) {
            const paramsData = {
                codes: [
                    DefensiveKeys.SPEEDLIMITBLACKLIST,
                    DefensiveKeys.SINGLELINKACCESSRETE,
                ],
                type: "requestCount",
                statForm: {
                    customerId: siteInfo.customerId,
                    siteIds: [
                        siteInfo.id
                    ],
                    ...filterData
                }

            }
            // BlackListQuery(paramsData)
            const accessControlConfig = statService.StatDefense({}, { ...paramsData });
            const sub = from(req(accessControlConfig)).subscribe((res: any) => {
                if (res) {
                    if (res.result.statNodes) {
                        setaccessControlGather(res.result.statNodes);
                    }
                    if (res.result.statInfos) {
                        const statInfo = res.result.statInfos;
                        setSummaryTableData([
                            ['总拦截量', ...ObjectNumComp(statInfo.totalStatInfo ? statInfo.totalStatInfo : numFun, true)],
                            ['限速拦截', ...ObjectNumComp(statInfo[DefensiveKeys.SPEEDLIMITBLACKLIST + "Info"] ? statInfo[DefensiveKeys.SPEEDLIMITBLACKLIST + "Info"] : numFun, true)],
                            ['单链接访问速率限制', ...ObjectNumComp(statInfo[DefensiveKeys.SINGLELINKACCESSRETE + "Info"] ? statInfo[DefensiveKeys.SINGLELINKACCESSRETE + "Info"] : numFun, true)],
                        ])
                    }
                }
            });
            return ()=>sub.unsubscribe()
        }
    }, [siteInfo, filterData,numFun, setSummaryTableData]);
    const showChartStatusOptions = useMemo(() => {
        const statusCodeDetail = {
            ...Speed_Limit_Freeze_Statistics,
            title: {
                text: props.title,
            },
            series: [
                {
                    ...Speed_Limit_Freeze_Statistics.series[0],
                    data: ObjectToArray(accessControlGather[DefensiveKeys.SPEEDLIMITBLACKLIST + "List"]),
                },
                {
                    ...Speed_Limit_Freeze_Statistics.series[1],
                    data: ObjectToArray(accessControlGather[DefensiveKeys.SINGLELINKACCESSRETE + "List"]),
                },
            ],
        };
        return Object.assign({}, ...[statusCodeDetail]);
    }, [accessControlGather, props.title]);

    // if (isMobile){
    //     return <section>
    //         <ReactEcharts style={{marginBottom:10,height:370}} option={showChartStatusOptions} />
    //         <SummaryTable
    //             align="left"
    //             columns={["CURRENT", "BIGGEST", "SMALLEST", "AVERAGE"]}
    //             data={SummaryTableData}
    //         />
    //     </section>
    // }

    return <section>
        <Row gutter={16}>
            <Col flex={1} >
                <ReactEcharts style={{height:370}} option={showChartStatusOptions} />
            </Col>
            <Col>
                <SummaryTable
                    align="left"
                    columns={["CURRENT", "BIGGEST", "SMALLEST", "AVERAGE"]}
                    data={SummaryTableData}
                />
            </Col>
        </Row>
    </section>
}
export default StatusChart;
