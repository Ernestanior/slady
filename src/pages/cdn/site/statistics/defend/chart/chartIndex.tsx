import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Carousel, Menu, Table } from "antd";
import { EChartKeys } from "../defense.interfase";
import BlackListChart from "./blackListChart";
import { ThemeContext } from "../index";
import LimitFreezeChart from "./LimitFreezeChart";
import MaliciousAccessChart from "./maliciousAccessChart";
import API from "@/store/apis/stat/stat";
import {from} from "rxjs";
import {ItemType} from "antd/lib/menu/hooks/useItems";
import req from "@/store/request";

const statService = new API();
const Chart: FC = () => {
  const { siteInfo, filterData } = useContext(ThemeContext);
  const [top30List, setTop30List] = useState<any[]>([]);
  const CarouselRef = useRef<any>(null);
  const changeChartTabs = useCallback((values) => {
    CarouselRef.current.goTo(values.key)
  }, []);
  const columns = [
    {
      key: "ip",
      title:"IP",
      dataIndex: "ip"
    },
    {
      key: "county",
      title: "国家/地区",
      dataIndex: "county",
    },
    {
      key: "area",
      title: "区域",
      dataIndex: "area"
    },
    {
      key: "counts",
      title: "访问量(次)",
      dataIndex: "counts",
    },
  ];
  useEffect(() => {
    if (siteInfo) {
      const config = statService.StatSiteIpTop({}, {
        siteIds: [siteInfo.id],
        ...filterData
      })
      const sub = from(req(config)).subscribe(res => {
          if (Array.isArray(res)) {
            setTop30List(res);
          }
      })
      return () => sub.unsubscribe()
    }
  }, [siteInfo, filterData])
  if (!siteInfo) {
    return null;
  }
  const items:ItemType[]  = [];
    items.push({
      key: EChartKeys.BLACK,
      style: {
        marginLeft: 0
      },
      label: "黑名单拦截统计"
    })
    items.push({
      key: EChartKeys.RSBAC,
      label: "限速冻结统计"
    })
    items.push({
      key: EChartKeys.MALICIOUSACCESS,
      label: "疑似恶意访问通知"
    })
    items.push({
      key: EChartKeys.TOP30IPS,
      label: "访问量前三十IP"
    })
  return (
    <section>
      <Menu defaultSelectedKeys={[`${EChartKeys.BLACK}`]} mode="horizontal" onClick={changeChartTabs} style={{ marginBottom: 15 }} items={items} />
      <Carousel ref={CarouselRef} dots={false} >
        <BlackListChart
            siteInfo={siteInfo}
            filterData={filterData}
        />
        <LimitFreezeChart
            siteInfo={siteInfo}
            filterData={filterData}
        />
        <MaliciousAccessChart
            siteInfo={siteInfo}
            filterData={filterData}
        />
        <div>
          <Table
              scroll={{ y: 350 }}
              pagination={false}
              dataSource={top30List}
              columns={columns}
              rowKey={'ip'}
          />
        </div>
      </Carousel>
    </section>
  );
};

export default Chart;
export const marginTop57 = { marginTop: 57 };
export const marginTop24 = { marginTop: 24 };
