import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import { Carousel, Col, Menu, Row } from "antd";
import { forkJoin } from "rxjs";
import ChartFulx from "@/pages/cdn/site/echarts/ChartFluxs"; //流量统计
import ChartBandwidth from "@/pages/cdn/site/echarts/ChartBandwidth"; //带宽统计
import ChartrequestQuantity from "@/pages/cdn/site/echarts/ChartrequestQuantity"; //请求量统计
import ChartHitRate from "@/pages/cdn/site/echarts/ChartHitRate"; //缓存命中率统计
import ChartCache from "@/pages/cdn/site/echarts/ChartCache"; //数据缓存率统计
import StatAPI from "@/store/apis/stat/stat";
import SummaryTable from "@/pages/cdn/site/summaryTable/summaryTable";
import IconFont from "@/common/icon";
import {
  HitRateChartTips,
  CacheChartTips,
} from "@/pages/cdn/site/echarts/components/ChartTips";
import isMobile from "@/app/isMobile";
import reqServicePlx from "@/store/request/complex";
export const statService = new StatAPI();

interface IProps<T = any> {
  data: T
}

const sumLable: string[] = ["CURRENT", "BIGGEST", "SMALLEST", "95VALUE"];

const BasicChart: FC<IProps> = (props) => {
  const [IVisible, setIVisible] = useState<any>(false);
  const [cacheIVisible, setcacheIVisible] = useState<any>(false);
  const [sumFlow, setSumFlow] = useState<number[]>();
  const [overviewList, setOverviewList] = useState<any>([]);
  const [bandWidthList, setBandWidthList] = useState<any>([]);
  const [reqCountList, setReqCountList] = useState<any>([]);
  const [sumFlowTable, setSumFlowTable] = useState<any>([]);
  const [bandWidthTable, setbandWidthTable] = useState<any>([]);
  const [reqCountTable, setreqCountTable] = useState<any>([]);
  const [cacheTable, setcacheTable] = useState<any>([]);
  const [cacheRatioTable, setcacheRatioTable] = useState<any>([]);
  const [bw95, setBw95] = useState<number | null>(null);
  const [siteID, filterData] = props.data;
  const CarouselRef = useRef<any>(null);

const memuList:any[] =[
    {
      style: {
        marginLeft: 0
      },
      content: "流量统计"
    },
    {
      content: "带宽统计"
    },{
      content: "请求量统计"
    },{
      content: <>
        缓存命中率统计
        <span onClick={() => setIVisible(true)}>
            <IconFont
                style={{ color: "rgb(0, 180, 255)", marginLeft: "14px" }}
                type="icontishi"
            />
          </span>
      </>
    },
    {
      key:4,
      content: <>
        数据缓存率统计
        <span onClick={() => setcacheIVisible(true)}>
            <IconFont
                style={{ color: "rgb(0, 180, 255)", marginLeft: "14px" }}
                type="icontishi"
            />
          </span>
      </>
    }
  ]
  const changeChartTabs = useCallback((values) => {
    CarouselRef.current.goTo(values.key);
  }, []);
  // 95带宽
  // const fetchBandwidth95 = useCallback((params: any) => {
  //   const config = statService.StatBandWith95({}, { ...params });
  //   from(reqService(config)).subscribe((res: any) => {
  //     if (res) {
  //       setBw95(res);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (siteID) {
      const data: any = {
        siteIds: [siteID],
        ...filterData,
      };
      const config = statService.StatBandWith95({}, { ...data });
      const overViewConfig = statService.StatSiteOverview({}, data);
      const bandWidthConfig = statService.StatSiteModelBandwith({}, data);
      const reqCountconfig = statService.StatSiteModelReqCount({}, data);
      const sub = forkJoin([
        reqServicePlx<any>(overViewConfig),
        reqServicePlx<any>(bandWidthConfig),
        reqServicePlx<any>(reqCountconfig),
        reqServicePlx<any>(config),
      ]).subscribe((values:any[]) => {
        if (values[0].isSuccess) {
          if (values[0].result) {
            const _result = values[0].result;
            if (_result.statMap) {
              setOverviewList(_result.statMap);
              //缓存命中率和数据缓存率数据展示
              const cacheSUMcdn = sumEvaluation(
                _result.statMap.dataCacheRateList
              );
              const cacheRatioSUMcdn = sumEvaluation(
                _result.statMap.cacheRatioList
              );
              const cachesumData = fmtEvaluation(sumLable, [
                cacheSUMcdn,
              ] as any);
              const cacheRatiosumData = fmtEvaluation(sumLable, [
                cacheRatioSUMcdn,
              ] as any);
              if (cachesumData || cacheRatiosumData) {
                setcacheTable(cachesumData);
                setcacheRatioTable(cacheRatiosumData);
              }
            }
            setSumFlow([_result.sumCDNFlow, _result.sumOriginFlow]);
            //流量统计列表
            if (_result.sumCDNFlow >= 0 && _result.sumOriginFlow >= 0) {
              setSumFlowTable([
                [
                  "TOTAL",
                  values[0].result.sumCDNFlow, //transformFlow(values[0].result.sumCDNFlow),
                  values[0].result.sumOriginFlow, //transformFlow(values[0].result.sumOriginFlow),
                ],
              ]);
            }
          }
        }
        if (values[1].isSuccess) {
          if (values[1].result) {
            setBandWidthList(values[1].result.cdnBandwidthList);
            if (
              Array.isArray(values[1].result.cdnBandwidthList) &&
              values[1].result.cdnBandwidthList.length
            ) {
              const fmt = summaryOpt([values[1].result.cdnBandwidthList]);
              if (fmt) {
                fmt[0][3] = ["BANDWIDTH95", bw95 || 0];
                setbandWidthTable(fmt[0]);
              }
              // }
            }
          }
        }
        if (values[2].isSuccess) {
          if (values[2].result) {
            setReqCountList(values[2].result);
            //请求量统计战术数据
            if (
              Array.isArray(values[2].result.originReqCountList) &&
              values[2].result.originReqCountList.length
            ) {
              const reqCountSUMorigin = sumEvaluation(
                values[2].result.originReqCountList
              );
              const reqCountSUMcdn = sumEvaluation(
                values[2].result.cdnReqCountList
              );
              const reqcountsumData = fmtEvaluation(sumLable, [
                reqCountSUMorigin,
                reqCountSUMcdn,
              ] as any);
              if (reqcountsumData) {
                setreqCountTable(reqcountsumData);
              }
            }
          }
        }
        if(values[3].isSuccess){
          setBw95(values[3].result);
        }
      });

      return () => {
              sub && sub.unsubscribe();
      };
    }
  }, [siteID, filterData,bw95]);
  if (!siteID) {
    return null;
  }
  return (
    <section
      style={{
        width: "100%",
      }}
    >
      {/*<ConditionShow visible={cacheHitStat}>*/}
      <HitRateChartTips
          visibles={IVisible}
          onClose={() => setIVisible(false)}
      />
      {/*</ConditionShow>*/}
      {/*<ConditionShow visible={cacheStat}>*/}
      <CacheChartTips
          visibles={cacheIVisible}
          onClose={() => setcacheIVisible(false)}
      />
      {/*</ConditionShow>*/}
      {!!memuList.length && <Menu
          defaultSelectedKeys={[`${memuList[0].key}`]}
          mode="horizontal"
          onClick={changeChartTabs}
          style={{marginBottom: 15}}
      >
        {memuList && memuList.map((item: any, index: number) => (<Menu.Item style={item.style} key={index}>
          {item.content}
        </Menu.Item>))
        }
      </Menu>
      }
      <Carousel ref={CarouselRef} dots={false}>
        <div>
          <Row style={isMobile?{flexDirection:"column"}:{}}>
            <Col flex={1}>
              <ChartFulx
                  title="流量统计"
                  data={overviewList.cdnFlowList}
                  TwoData={overviewList.originFlowList}
              />
            </Col>
            <Col style={marginTop57}>
              <SummaryTable
                  columns={["边缘节点", "回源"]}
                  data={sumFlowTable}
                  needOpt="flow"
              />
            </Col>
          </Row>
        </div>

        <div>
          <Row style={isMobile?{flexDirection:"column"}:{}}>
            <Col flex={1}>
              <ChartBandwidth
                  title="带宽统计"
                  data={bandWidthList}
                  sumFlow={sumFlow}
                  bandwidth95={bw95}
              />
            </Col>
            <Col style={marginTop24}>
              <SummaryTable data={bandWidthTable} needOpt="bandwidth" />
            </Col>
          </Row>
        </div>

        <div>
          <Row style={isMobile?{flexDirection:"column"}:{}}>
            <Col flex={1}>
              <ChartrequestQuantity
                  title="请求量统计"
                  data={reqCountList.originReqCountList}
                  TwoData={reqCountList.cdnReqCountList}
              />
            </Col>
            <Col style={marginTop57}>
              <SummaryTable
                  columns={["边缘节点", "回源"]}
                  data={reqCountTable}
              />
            </Col>
          </Row>
        </div>


        <div>
          <Row style={isMobile?{flexDirection:"column"}:{}}>
            <Col flex={1}>
              <ChartHitRate
                  title="缓存率命中统计"
                  data={
                    overviewList && overviewList.cacheRatioList
                        ? overviewList.cacheRatioList
                        : []
                  }
              />
            </Col>
            <Col style={marginTop24}>
              <SummaryTable data={cacheRatioTable} />
            </Col>
          </Row>
        </div>

        <div>
          <Row style={isMobile?{flexDirection:"column"}:{}}>
            <Col flex={1}>
              <ChartCache
                  title="缓存率统计"
                  data={
                    overviewList && overviewList.dataCacheRateList
                        ? overviewList.dataCacheRateList
                        : []
                  }
              />
            </Col>
            <Col style={marginTop24}>
              <SummaryTable data={cacheTable} />
            </Col>
          </Row>
        </div>
      </Carousel>

    </section>
  );
};
export default BasicChart;
export const marginTop57 = { marginTop: 57 };
export const marginTop24 = { marginTop: 24 };

const sumAll = (arr: number[]) => {
  let count: number = 0
  arr.forEach((t) => {
    count += t
  })
  return count
}

/**
 * @description 计算 最大/最小/当前/平均值
 */
const summaryOpt = (data: number[][][]) => {
  if (!Array.isArray(data)) {
    return
  }
  const summaryData: number[][] = []
  Object.values(data).forEach((_, index) => {
    const temp: number[] = []
    const flatten: number[] = data[index].flat()
    flatten.filter((t: number, index: number) => {
      return index % 2 !== 0 ? temp.push(t) : temp
    })
    return summaryData.push(temp)
  })
  const finalSummary: any[][] = summaryData.map((t) => {
    return ([["当前", t[t.length - 1]], ["最大", Math.max(...t)], ["最小", Math.min(...t)], ["平均", parseInt((sumAll(t) / t.length).toFixed(0))]])
  })
  return finalSummary || []
}

/**
 * @param propertyKey 提取需要的key
 * @param index 索引位置
 */
export const sumEvaluation = (data: any) => {
  if (Array.isArray(data) && data.length) {
    const sumArr = Object.values(data).map((t: any) => {
      return t[1]
    })
    const current: number = Number((data[data.length - 1][1]).toFixed(2));
    const MaxValue: number = Number(Math.max.apply(null, sumArr).toFixed(2));//最大值
    const MinValue: number = Number((Math.min.apply(null, sumArr)).toFixed(2));//最小值
    let AVG: number = Number((sumArr.reduce((sum, number) => sum + number) / sumArr.length).toFixed(2));
    return [current, MaxValue, MinValue, AVG]
  }
}
export const fmtEvaluation = (propertyKey: string[], data: any[][]) => {
  if (propertyKey.length !== data[0].length && propertyKey.length !== data.length) {
    return;
  }
  const flatten = data.flat()
  const fmtOuter: any[][] = []
  for (let i = 0; i < propertyKey.length; i++) {
    data[0].length > 1 ? fmtOuter.push([propertyKey[i], flatten[i], flatten[i + propertyKey.length]]) : fmtOuter.push([propertyKey[i], flatten[i]])
  }
  return fmtOuter
}

//将key、value形式的对象数组转换为number[][]
export const ConvertArray: any = (data: object[]) => {
  return data.map(item => {
    return Object.values(item);
  })
}