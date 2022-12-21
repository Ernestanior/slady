import React, { FC, useEffect, useMemo, useState } from "react"
import StatAPI from "@/store/apis/stat/stat";
import { from } from "rxjs";
import { Col, Row } from "antd";
import SummaryTable from "@/pages/cdn/site/summaryTable/summaryTable";
import req from "@/store/request";
import ReactEcharts from "echarts-for-react";
import { Malicious_access_count } from "./optionConfig";
import { defenseChartDispose, ObjectToArray } from "../defense.util";
import { DefensiveKeys } from "../defense.interfase";
const statService = new StatAPI();
interface Iprops {
    siteInfo: any;
    filterData: any;
    title?: string;
}
const StatusChart: FC<Iprops> = ({siteInfo, filterData, ...props }) => {
    const [maliciousAccessTable, setmaliciousAccessTable] = useState<any[]>([]);
    const [numFun] = useState<any>({
        current: 0,
        max: 0,
        min: 0,
        avg: 0
    });
    const [accessControlGather, setaccessControlGather] = useState({
        [DefensiveKeys.FORBIDX_FORWARDED_FOR + "List"]: [],
    });
    // const BlackListQuery = useCallback((params) => {
    //     const maliciousAccessConfig = statService.StatDefense({}, { ...params });
    //     from(reqService(maliciousAccessConfig)).subscribe((res: any) => {
    //         if (res) {
    //             if (res.statNodes) {
    //                 setaccessControlGather(res.statNodes);
    //             }
    //             if (res.statInfos) {
    //                 const statInfo = res.statInfos;
    //                 const maliciousAccessTable = defenseChartDispose(
    //                     statInfo[DefensiveKeys.FORBIDX_FORWARDED_FOR + "Info"] ? statInfo[DefensiveKeys.FORBIDX_FORWARDED_FOR + "Info"] : numFun
    //                 );
    //                 if (maliciousAccessTable) {
    //                     setmaliciousAccessTable(maliciousAccessTable);
    //                 }
    //             }
    //
    //         }
    //     });
    // }, [numFun]);
    useEffect(() => {
        if (siteInfo) {
            const paramsData = {
                codes: [
                    DefensiveKeys.FORBIDX_FORWARDED_FOR,
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
            const maliciousAccessConfig = statService.StatDefense({}, { ...paramsData });
            const sub = from(req(maliciousAccessConfig)).subscribe((res: any) => {
                if (res) {
                    console.log(res)
                    if (res.result.statNodes) {
                        setaccessControlGather(res.result.statNodes);
                    }
                    if (res.result.statInfos) {
                        const statInfo = res.result.statInfos;
                        const maliciousAccessTable = defenseChartDispose(
                            statInfo[DefensiveKeys.FORBIDX_FORWARDED_FOR + "Info"] ? statInfo[DefensiveKeys.FORBIDX_FORWARDED_FOR + "Info"] : numFun
                        );
                        if (maliciousAccessTable) {
                            setmaliciousAccessTable(maliciousAccessTable);
                        }
                    }

                }
            });
            return ()=>sub.unsubscribe()
        }
    }, [siteInfo, filterData, numFun]);
    const showChartStatusOptions = useMemo(() => {
        const statusCodeDetail = {
            ...Malicious_access_count,
            title: {
                text: props.title,
            },
            series: [
                {
                    ...Malicious_access_count.series[0],
                    data: ObjectToArray(accessControlGather[DefensiveKeys.FORBIDX_FORWARDED_FOR + "List"]),
                },
            ],
        };
        return Object.assign({}, ...[statusCodeDetail]);
    }, [
        accessControlGather,
        props.title,
    ]);

    // if (isMobile){
    //     return <section>
    //         <ReactEcharts style={{marginBottom:10,height:370}} option={showChartStatusOptions} />
    //         <SummaryTable
    //             data={maliciousAccessTable}
    //         />
    //     </section>
    // }

    return <section>
        <Row gutter={16}>
            <Col flex={1}>
                <ReactEcharts style={{height:370}} option={showChartStatusOptions} />
            </Col>
            <Col>
                <SummaryTable
                    data={maliciousAccessTable}
                />
            </Col>
        </Row>
    </section>
}
export default StatusChart;
