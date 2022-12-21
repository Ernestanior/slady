import React, { FC, useEffect, useMemo, useState } from "react"
import StatAPI from "@/store/apis/stat/stat";
import { from } from "rxjs";
import { Col, Row } from "antd";
import ReactEcharts from "echarts-for-react";
import { BlackList_Chart_Option } from "./optionConfig";
import { DefensiveKeys } from "../defense.interfase";
import { ObjectNumComp, ObjectToArray } from "../defense.util";
import req from "@/store/request";
import SummaryTable from "@/pages/cdn/site/summaryTable/summaryTable";

const statService = new StatAPI();

const CONF_CODE = [
    DefensiveKeys.CONSOLEBLACKLIST,//ip黑名单
    DefensiveKeys.UABLACKLIST,//ua黑名单
    DefensiveKeys.COUNTRYBLACKLIST,
    DefensiveKeys.REQUESTMETHODBLACKLIST,
    DefensiveKeys.DOMAINBLACKLIST,
    DefensiveKeys.REFERERBLACKLIST,
    DefensiveKeys.REFERERANTILEECH,
    DefensiveKeys.URIBLACKLIST,
  ];

  const intlKeywords = [
    "总拦截量",
    "黑名单IP拦截",
    "黑名单UA拦截",
    "区域黑名单拦截",
    "请求方式黑名单拦截",
    "Domain黑名单拦截",
    "Referrer黑名单拦截",
    "防盗链拦截",
    "URI黑名单拦截",
  ];

interface Iprops {
    siteInfo: any;
    filterData: any;
    title?: string;
}
const StatusChart: FC<Iprops> = ({  siteInfo, filterData, ...props }) => {
    const [SummaryTableData, setSummaryTableData] = useState<any[]>([]);
    const [numFun] = useState<any>({
        current: 0,
        max: 0,
        min: 0,
        avg: 0
    });
    const [blackListGather, setblackListGather] = useState({
        [DefensiveKeys.UABLACKLIST + "List"]: [],//黑名单UA
        [DefensiveKeys.COUNTRYBLACKLIST + "List"]: [],//区域黑名单
        [DefensiveKeys.REQUESTMETHODBLACKLIST + "List"]: [],//请求方式黑名单
        [DefensiveKeys.DOMAINBLACKLIST + "List"]: [],//Domain黑名单
        [DefensiveKeys.REFERERBLACKLIST + "List"]: [],//referer黑名单
        [DefensiveKeys.REFERERANTILEECH + "List"]: [],//防盗链
        [DefensiveKeys.URIBLACKLIST + "List"]: [],//uri 黑名单
        [DefensiveKeys.CONSOLEBLACKLIST + "List"]: []//iP黑名单
    });

    // const BlackListQuery = useCallback((params) => {
    //     const blacklistConfig = statService.StatDefense({}, { ...params });
    //     from(reqService(blacklistConfig)).subscribe((res: any) => {
    //         if (res) {
    //             if (res.statNodes) {
    //                 setblackListGather(res.statNodes);
    //             }
    //             if (res.statInfos) {
    //                 const statInfo = res.statInfos;
    //                 setSummaryTableData([
    //                     ['TOTAL_AMOUNT_INTERCEPT', ...ObjectNumComp(statInfo.totalStatInfo ? statInfo.totalStatInfo : numFun)],
    //                     ['BLACKLIST_IP_BLOCK', ...ObjectNumComp(statInfo[DefensiveKeys.CONSOLEBLACKLIST + "Info"] ? statInfo[DefensiveKeys.CONSOLEBLACKLIST + "Info"] : numFun)],
    //                     ['BLACKLIST_UA_INTERCEPTING', ...ObjectNumComp(statInfo[DefensiveKeys.UABLACKLIST + "Info"] ? statInfo[DefensiveKeys.UABLACKLIST + "Info"] : numFun)],
    //                     ['COUNTRY_BLACKLIST_INTERCEPTION', ...ObjectNumComp(statInfo[DefensiveKeys.COUNTRYBLACKLIST + "Info"] ? statInfo[DefensiveKeys.COUNTRYBLACKLIST + "Info"] : numFun)],
    //                     ['REQUEST_MODE_BLACKLIST_INTERCEPT', ...ObjectNumComp(statInfo[DefensiveKeys.REQUESTMETHODBLACKLIST + "Info"] ? statInfo[DefensiveKeys.REQUESTMETHODBLACKLIST + "Info"] : numFun)],
    //                     ['DOIMAIN_BLACKLIST_INTERCEPT', ...ObjectNumComp(statInfo[DefensiveKeys.DOMAINBLACKLIST + "Info"] ? statInfo[DefensiveKeys.DOMAINBLACKLIST + "Info"] : numFun)],
    //                     ['REFERRER_BLACKLIST_INTERCEPT', ...ObjectNumComp(statInfo[DefensiveKeys.REFERERBLACKLIST + "Info"] ? statInfo[DefensiveKeys.REFERERBLACKLIST + "Info"] : numFun)],
    //                     ['DEFEND_HOTLINK_INTERCEPT', ...ObjectNumComp(statInfo[DefensiveKeys.REFERERANTILEECH + "Info"] ? statInfo[DefensiveKeys.REFERERANTILEECH + "Info"] : numFun)],
    //                     ['URI_BLACKLIST_INTERCEPT', ...ObjectNumComp(statInfo[DefensiveKeys.CONSOLEBLACKLIST + "Info"] ? statInfo[DefensiveKeys.CONSOLEBLACKLIST + "Info"] : numFun)],
    //                 ]);
    //             }
    //
    //         }
    //     });
    // }, [numFun, setSummaryTableData]);
    useEffect(() => {
        if (siteInfo) {
            const paramsData:any = {
                codes: CONF_CODE,
                statForm: {
                    customerId: siteInfo.customerId,
                    siteIds: [
                        siteInfo.id
                    ],
                    ...filterData
                }
            }
            // BlackListQuery(paramsData)
            const blacklistConfig = statService.StatDefense({}, { ...paramsData });
            const sub = from(req(blacklistConfig)).subscribe((res: any) => {
                if (res) {
                    if (res.result.statNodes) {
                        setblackListGather(res.result.statNodes);
                    }
                    if (res.result.statInfos) {
                        const statInfo = res.result.statInfos;
                        setSummaryTableData([
                            ['总拦截量', ...ObjectNumComp(statInfo.totalStatInfo ? statInfo.totalStatInfo : numFun)],
                            ['黑名单IP拦截', ...ObjectNumComp(statInfo[DefensiveKeys.CONSOLEBLACKLIST + "Info"] ? statInfo[DefensiveKeys.CONSOLEBLACKLIST + "Info"] : numFun)],
                            ['黑名单UA拦截', ...ObjectNumComp(statInfo[DefensiveKeys.UABLACKLIST + "Info"] ? statInfo[DefensiveKeys.UABLACKLIST + "Info"] : numFun)],
                            ['区域黑名单拦截', ...ObjectNumComp(statInfo[DefensiveKeys.COUNTRYBLACKLIST + "Info"] ? statInfo[DefensiveKeys.COUNTRYBLACKLIST + "Info"] : numFun)],
                            ['请求方式黑名单拦截', ...ObjectNumComp(statInfo[DefensiveKeys.REQUESTMETHODBLACKLIST + "Info"] ? statInfo[DefensiveKeys.REQUESTMETHODBLACKLIST + "Info"] : numFun)],
                            ['Domain黑名单拦截', ...ObjectNumComp(statInfo[DefensiveKeys.DOMAINBLACKLIST + "Info"] ? statInfo[DefensiveKeys.DOMAINBLACKLIST + "Info"] : numFun)],
                            ['Referrer黑名单拦截', ...ObjectNumComp(statInfo[DefensiveKeys.REFERERBLACKLIST + "Info"] ? statInfo[DefensiveKeys.REFERERBLACKLIST + "Info"] : numFun)],
                            ['防盗链拦截', ...ObjectNumComp(statInfo[DefensiveKeys.REFERERANTILEECH + "Info"] ? statInfo[DefensiveKeys.REFERERANTILEECH + "Info"] : numFun)],
                            ['URI黑名单拦截', ...ObjectNumComp(statInfo[DefensiveKeys.URIBLACKLIST + "Info"] ? statInfo[DefensiveKeys.URIBLACKLIST + "Info"] : numFun)],
                        ]);
                    }

                }
            });
            return ()=>sub.unsubscribe()
        }
    }, [siteInfo, filterData, numFun, setSummaryTableData]);
    const showChartStatusOptions = useMemo(() => {
        const statusCodeDetail = {
            ...BlackList_Chart_Option,
            title: {
                text: props.title,
            },
            series: Object.keys(blackListGather).map((_, i) => {
               return {
                   ...BlackList_Chart_Option.series[i],
                   data: ObjectToArray(blackListGather[CONF_CODE[i] + "List"]),
                   name: intlKeywords.slice(1, intlKeywords.length)[i],
               }
            })
        };
        return Object.assign({}, ...[statusCodeDetail]);
    }, [blackListGather, props.title]);

    // if(isMobile){
    //     return <section>
    //         <ReactEcharts style={{marginBottom:20,height:370}} option={showChartStatusOptions} />
    //         <SummaryTable
    //             align="left"
    //             columns={["CURRENT", "BIGGEST", "SMALLEST"]}
    //             data={SummaryTableData}
    //         />
    //     </section>
    // }

    return <section>
        <Row gutter={16}>
            <Col flex={1} >
                <ReactEcharts style={{height:500}} option={showChartStatusOptions} />
            </Col>
            <Col style={{marginTop:30}}>
                <SummaryTable
                    align="left"
                    columns={["CURRENT", "BIGGEST", "SMALLEST"]}
                    data={SummaryTableData}
                />
            </Col>
        </Row>
    </section>
}
export default StatusChart;

