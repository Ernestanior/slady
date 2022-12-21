import {Carousel, Col, Menu, Row} from "antd";
import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import EchartLoader from "@/common/echarts/components/echarts-Loader";
import * as echarts from "echarts";
import statAPI from "@/store/apis/stat/stat";
import {COUNTRY_OPTIONS} from "./mapConfig";
import {from} from "rxjs";
import worldJson from "./json/world.json";
import chinaJson from "./json/china.json";
import useMapLang, {TMap} from "@/hooks/useMapDetail";
import req from "@/store/request";


import "./performance.less";
import SummaryTable from "@/pages/cdn/site/summaryTable/summaryTable";
import isMobile from "@/app/isMobile";
import {ISiteInfo} from "@/pages/cdn/site/statistics/performance/performanceStatus";

const summaryHeader = ["访问来源地", "访问次数"];

echarts.registerMap("world", worldJson as any);
echarts.registerMap("china", chinaJson as any);

interface IProps {
    filterData: any;
    siteInfo: ISiteInfo;
}

const statService = new statAPI();
const SourceChart: FC<IProps> = (props) => {
    const {siteInfo, filterData} = props;
    const [fmtTrans, getMapPkgLang] = useMapLang();
    const [worldData, setWorldData] = useState<any>([]);
    const [chinaData, setChinaData] = useState<any>([]);
    const CarouselRef = useRef<any>(null);
    const changeChartTabs = useCallback((values) => {
        CarouselRef.current.goTo(values.key);
    }, []);
    // 访问来源统计 - 全球
    // const accessCountryFetch = useCallback(
    //   (params) => {
    //     echarts.registerMap("world", worldJson);
    //     const config = statService.StatCountryData(
    //       {},
    //       {
    //         ...params,
    //       }
    //     );
    //     from(reqService(config)).subscribe((res: any) => {
    //       if (res) {
    //         const sortResult: any = sortProperty(res);
    //         if (sortResult) {
    //           setWorldData(fmtTrans(sortResult, TMap.MAP_DETAIL_WORLD));
    //         }
    //       }
    //     });
    //   },
    //   [fmtTrans]
    // );
    // 访问来源统计 - 中国
    // const fetchStats = useCallback(
    //   (params) => {
    //     echarts.registerMap("china", chinaJson);
    //     const config = statService.StatRegionData(
    //       {},
    //       {
    //         ...params,
    //       }
    //     );
    //     from(reqService(config)).subscribe((res: any) => {
    //       if (res) {
    //         // 计算前10
    //         const sortResult: any = sortProperty(res);
    //         setChinaData(fmtTrans(sortResult, TMap.MAP_DETAIL_CHINA));
    //       }
    //     });
    //   },
    //   [fmtTrans]
    // );

    const formatWorldData = useMemo(() => {
        if (!Array.isArray(worldData)) {
            return [];
        }
        return worldData.map((t) => ({name: t[0], value: t[1]}));
    }, [worldData]);

    const formatChinaData = useMemo(() => {
        if (!Array.isArray(chinaData)) {
            return [];
        }
        return chinaData.map((t) => ({name: t[0], value: t[1]}));
    }, [chinaData]);

    /**访问来源统计 - 展示数据 */
    const worldDetail = {
        ...COUNTRY_OPTIONS,
        series: [
            {
                ...COUNTRY_OPTIONS.series[0],
                data: formatWorldData,
                map: "world",
                nameMap: getMapPkgLang(TMap.MAP_DETAIL_WORLD),
            },
        ],
    };
    const chinaDetail = {
        ...COUNTRY_OPTIONS,
        series: [
            {
                ...COUNTRY_OPTIONS.series[0],
                data: formatChinaData,
                map: "china",
                nameMap: getMapPkgLang(TMap.MAP_DETAIL_CHINA),
            },
        ],
    };
    const worldDetailformatMapFinal = Object.assign({}, ...[worldDetail]);
    const chinaDetailformatMapFinal = Object.assign({}, ...[chinaDetail]);
    useEffect(() => {
        if(siteInfo){
            const defaultParams =siteInfo &&{siteIds: [siteInfo.id], ...filterData};
            const paramsData = siteInfo && siteInfo.customerId ? {
                ...defaultParams,
                customerId: siteInfo.customerId
            } : defaultParams;

            const countryConfig = statService.StatCountryData({}, {...paramsData,});
            const regionConfig = statService.StatRegionData({}, {...paramsData,});
            const subCountry = from(req(countryConfig)).subscribe((res: any) => {
                if (res.result) {
                    const _data = res.result.filter((item: any) => {
                        return Object.keys(item).some(key => item[key] > 0);
                    })
                    const sortResult: any = sortProperty(_data, false, 999);
                    if (sortResult) {
                        setWorldData(fmtTrans(sortResult, TMap.MAP_DETAIL_WORLD));
                    }
                }
            });
            const subRegion = from(req(regionConfig)).subscribe((res: any) => {
                if (res.result) {
                    const _data = res.result.filter((item: any) => {
                        return Object.keys(item).some(key => item[key] > 0);
                    })
                    const sortResult: any = sortProperty(_data, false, 999);
                    setChinaData(fmtTrans(sortResult, TMap.MAP_DETAIL_CHINA));
                }
            });
            return () => {
                subCountry.unsubscribe();
                subRegion.unsubscribe()
            }
        }
    }, [fmtTrans, props, siteInfo, filterData]);
    return (
        <section className="cdn-page-row">
            <Menu
                defaultSelectedKeys={[`0`]}
                mode="horizontal"
                onClick={changeChartTabs}
                style={{marginBottom: 15}}
            >
                <Menu.Item style={{marginLeft: 0}} key="0">
                    全球范围
                </Menu.Item>
                <Menu.Item key="1">
                    中国大陆
                </Menu.Item>
            </Menu>
            {isMobile ? <Carousel ref={CarouselRef} dots={false}>
                <div>
                    <Row>
                        <h3 className="cust-chart-h3name">
                            访问来源统计
                        </h3>
                    </Row>
                    <Row gutter={16}>
                        <EchartLoader
                            style={{marginBottom: 20, height: 389, background: "#e0eaec"}}
                            config={worldDetailformatMapFinal}
                        />
                    </Row>
                    <Row gutter={16}>
                        <SummaryTable
                            isCountry
                            columns={summaryHeader}
                            data={worldData.slice(0, 10)}
                        />
                    </Row>
                </div>
                <div>
                    <Row>
                        <h3 className="cust-chart-h3name">
                            访问来源统计
                        </h3>
                    </Row>
                    <Row gutter={16}>
                        <EchartLoader
                            style={{marginBottom: 20, height: 389, background: "#e0eaec"}}
                            config={chinaDetailformatMapFinal}
                        />
                    </Row>
                    <Row gutter={16}>
                        <SummaryTable
                            isCountry
                            columns={summaryHeader}
                            data={chinaData.slice(0, 10)}
                        />
                    </Row>
                </div>
            </Carousel> : <Carousel ref={CarouselRef} dots={false}>
                <div>
                    <Row>
                        <h3 className="cust-chart-h3name">
                            访问来源统计
                        </h3>
                    </Row>
                    <Row gutter={16}>
                        <Col flex={1}>
                            <EchartLoader
                                style={{height: 389, background: "#e0eaec"}}
                                config={worldDetailformatMapFinal}
                            />
                        </Col>
                        <Col>
                            <SummaryTable
                                isCountry
                                columns={summaryHeader}
                                data={worldData.slice(0, 10)}
                            />
                        </Col>
                    </Row>

                </div>
                <div>
                    <Row>
                        <h3 className="cust-chart-h3name">
                            访问来源统计
                        </h3>
                    </Row>
                    <Row gutter={16}>
                        <Col flex={1}>
                            <EchartLoader
                                style={{height: 389, background: "#e0eaec"}}
                                config={chinaDetailformatMapFinal}
                            />
                        </Col>
                        <Col>
                            <SummaryTable
                                isCountry
                                columns={summaryHeader}
                                data={chinaData.slice(0, 10)}
                            />
                        </Col>
                    </Row>
                </div>
            </Carousel>}
        </section>

    );
};
export default SourceChart;

function compare(a: any, b: any) {
    let [a1, b1]: any = [Object.entries(a)[0][1], Object.entries(b)[0][1]]
    if (b1 < a1) {
        return -1;
    }
    if (b1 > a1) {
        return 1;
    }
    return 0;
}


/**
 * [ {zk1: zv1}, {ak2, : av2}, {bk1: bv1} ] => [ {ak1: av2}, {bk1: bk2}, {zk1: zv1} ]
 */
const sortProperty = (data: any, needFmt: boolean = false, max: number = 10) => {
    if (!Array.isArray(data)) {
        return;
    }
    const sortTotal: any = data.sort(compare).slice(0, max)
    if (!needFmt) {
        return sortTotal
    }
    const kvSort: { name: string, value: number }[] = []
    if (needFmt) {
        Object.values(sortTotal).forEach((t: any) => {
            Object.entries(t).forEach((t: any) => {
                return kvSort.push({ name: t[0], value: t[1] })
            })
            return kvSort
        })
        return kvSort
    }
    return kvSort
}