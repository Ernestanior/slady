import SelectP from "@/common/select";
import StatAPI from "@/store/apis/stat/stat";
import { Col, Empty, Row } from "antd";
import ReactEcharts from "echarts-for-react";
import React, { FC, useEffect, useState, useMemo } from "react";
import {from} from "rxjs";
import req from "@/store/request";
import SummaryTablePagination from "@/pages/cdn/site/summaryTable/SummaryTablePagination";

const keyvaluePair: string[] = ["key", "value"];
const statService = new StatAPI();

const PerformanceStatusChart: FC<IProps> = ({ dateTimeData, siteInfo }) => {
  // 边缘
  const [edgeData, setEdgeData] = useState<any[]>([]);
  // 回源
  const [originData, setOriginData] = useState<any[]>([]);
  // 小列表数据
  const [statusSummary, setStatusSummary] = useState<any[][]>([]);
  // 状态码列表
  const [statusCodeList, setStatusCodeList] = useState<string[]>([]);
  // 选择的下拉
  const [code, setCode] = useState<string>("");
  const paramsData = useMemo(() => {
    if (!siteInfo || !dateTimeData) {
      return null;
    }
    return {
      customerId: siteInfo.customerId,
      siteIds: [siteInfo.id],
      ...dateTimeData,
    };
  }, [siteInfo, dateTimeData]);
  /** 获取状态码list*/
  useEffect(() => {
    if (paramsData) {
      const config = statService.DistinctState({}, paramsData);
      // reqAndRunCallback(config, (res) => {
      //   if (Array.isArray(res)) {
      //     setCode(res[0] ? res[0] : "");
      //     setStatusCodeList(res);
      //   }
      // });
      const sub = from(req(config)).subscribe(res => {
          if (Array.isArray(res)) {
            setCode(res[0] ? res[0] : "");
            setStatusCodeList(res);
          }
      })
      return ()=>sub.unsubscribe()
    }
  }, [paramsData]);
  //计算小列表数据
  useEffect(() => {
    //在statusCodeList为空的时候不执行
    if (paramsData && Array.isArray(statusCodeList) && statusCodeList.length) {
      const _paramsData = Object.assign(
        {},
        { statForm: paramsData, fields: statusCodeList }
      );
      const config = statService.StatStateList({}, _paramsData);
      // reqAndRunCallback(config, (res) => {
      //   if (res) {
      //     const _stsMap = valueSumCal(res.stsMap);
      //     const _sts0Map = valueSumCal(res.sts0Map);
      //     const sumData = statusCodeList.map((item) => [
      //       item,
      //       ..._stsMap[item],
      //       ..._sts0Map[item],
      //     ]);
      //     if (sumData) {
      //       setStatusSummary(sumData);
      //     }
      //   }
      // });
      const sub = from(req(config)).subscribe((res:any) => {
        if (res) {
          const _stsMap = valueSumCal(res.stsMap);
          const _sts0Map = valueSumCal(res.sts0Map);
          const sumData = statusCodeList.map((item) => [
            item,
            ..._stsMap[item],
            ..._sts0Map[item],
          ]);
          if (sumData) {
            setStatusSummary(sumData);
          }
        }
      })
      return ()=>sub.unsubscribe()
    }
  }, [statusCodeList, paramsData]);

  //获取统计数据
  useEffect(() => {
    if (statusCodeList.length && paramsData && code) {
      const _paramsData = Object.assign(
        {},
        { statForm: paramsData, fields: [code] }
      );
      const config = statService.StatStateList({}, _paramsData);
      // reqAndRunCallback(config, (res) => {
      //   if (res) {
      //     const _stsMap = Object.values(res.stsMap).map((t) =>
      //       removeKeyAndValue(t, keyvaluePair)
      //     );
      //     const _sts0Map = Object.values(res.sts0Map).map((t) =>
      //       removeKeyAndValue(t, keyvaluePair)
      //     );
      //     setEdgeData(_stsMap);
      //     setOriginData(_sts0Map);
      //   }
      // });
      const sub = from(req(config)).subscribe((res:any) => {
        if (res) {
          const _stsMap = Object.values(res.stsMap).map((t) =>
              removeKeyAndValue(t, keyvaluePair)
          );
          const _sts0Map = Object.values(res.sts0Map).map((t) =>
              removeKeyAndValue(t, keyvaluePair)
          );
          setEdgeData(_stsMap);
          setOriginData(_sts0Map);
        }
      })
      return ()=>sub.unsubscribe()
    }
  }, [paramsData, code, statusCodeList]);
  // options生成
  const statusCodeDetail = useMemo(() => {
    return {
      ...COMBINE_STATUS_CODE,
      title: {
        left: COMBINE_STATUS_CODE.title.left,
        text: "状态码统计",
      },
      series: [
        {
          ...COMBINE_STATUS_CODE.series[0],
          name: "边缘节点",
          data: edgeData[0] ? edgeData[0] : [],
        },
        {
          ...COMBINE_STATUS_CODE.series[1],
          name: "回源",
          data: originData[0] ? originData[0] : [],
        },
      ],
    };
  }, [originData, edgeData]);
  /**状态码统计 - 展示数据 */
  const formatStatusFinal = Object.assign({}, statusCodeDetail);
  return (
    <section>
      {statusCodeList.length > 0 && (
        <SelectP
          style={{ minWidth: 200, marginBottom: 20, marginLeft: "58%" }}
          data={statusCodeList}
          onChange={setCode}
          value={code}
        />
      )}
      <Row gutter={16}>
        <Col flex={1}>
          {statusCodeList.length ? (
            <ReactEcharts style={{ height: 390 }} option={formatStatusFinal} />
          ) : (
            <>
              <p
                className="cdn-page-row"
                style={{ fontSize: "1.25rem", fontWeight: "bold" }}
              >
                状态码统计
              </p>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </>
          )}
        </Col>
        <Col style={{ marginTop: 57 }}>
          <SummaryTablePagination
            columns={["边缘节点", "回源"]}
            data={statusCodeList.length ? statusSummary : []}
            isCountry={true}
          />
        </Col>
      </Row>
    </section>
  );
};
export default PerformanceStatusChart;

interface IProps {
  dateTimeData: any;
  siteInfo: ISiteInfo;
}
const valueSumCal = (data: any) => {
  if (data) {
    const statusCodekeys = Object.keys(data);
    const formatResult: any = {};
    statusCodekeys.forEach((i: string | number) => {
      formatResult[i] = [data[i].reduce((s: number, n: any) => s + n.value, 0)];
    });
    return formatResult;
  }
};

export const colorCombine = ["#4b92c5", "#254985"];

/**
 * @description -  [ { name: "t1", value: 1 }, { name: "t2", value": 2 } ] => [ [ t1, 1 ], [ t2, 2 ] ]
 */
const removeKeyAndValue = (data: any, keyValue: string[]) => {
  if (!Array.isArray(data) || keyValue.length !== 2) {
    return;
  }
  const newFormatted: any[] = []
  Object.values(data).forEach((t) => {
    newFormatted.push([t[keyValue[0]], t[keyValue[1]]])
  })
  return newFormatted
}

export const COMBINE_STATUS_CODE = {
  backgroundColor: '#ffffff',
  title: {
    text: "状态码",
    left: "25px"
  },
  tooltip: {
    trigger: 'axis',
    formatter: (
        params: any,
        ticket: string,
        callback: (ticket: string, html: string) => void,
    ) => {
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
      // show += hour+ ':' + min + " " + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '<br>'
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
    },
    splitNumber: 20,
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
  // dataZoom: [{
  //     type: 'inside'
  // }],
  series: [{
    name: "边缘节点",
    type: 'bar',
    stack: '1',
    showSymbol: false,
    itemStyle: {
      // normal:{
      //     lineStyle:{
      //         width:1
      //     }
      // }
      color: colorCombine[0]
    },
  },
    {
      name: "回源",
      type: 'bar',
      stack: '1',
      showSymbol: false,
      itemStyle: {
        // normal:{
        //     lineStyle:{
        //         width:1
        //     }
        // }
        color: colorCombine[1]
      },
    }]
}

export interface ISiteInfo {
  backup: number;
  brandId: number;
  cloneId: number;
  customerId: number;
  customerName: string;
  dnsValue: string;
  domains: number;
  id: number;
  middle: number;
  name: string;
  portAreaId: number;
  records: number;
  type: any;
  uniqueName: string;
  upstream: string;
  upstreamBalance: string;
  upstreamKeepalive: number;
  upstreamPortFlag: number;
  upstreamProtocol: string;
  websocketFlag:number;
}

