import { Layout, Row, Spin } from "antd";
import React, {FC, useEffect, useMemo, useState} from "react";
import BasicChart from "./basicChart";
import TimeFilter from "@/common/timeFilter";
import {ETimeFilter} from "@/common/interface";
import PerformanceStatusChart from "@/pages/cdn/site/statistics/performance/performanceStatus";
import { useRouteMatch} from "react-router-dom";
import {siteService} from "@/store/apis/site";
import {from} from "rxjs";
import req from "@/store/request";
import SourceChart from "@/pages/cdn/site/statistics/performance/sourceChart";

const Performance: FC = () => {
  const urlInfo = useRouteMatch<{id:string}>("/cdn/siteList/perform-sta/:id")
  const [filterData, setFilterData] = useState<any>({
    reportType: ETimeFilter.CURRENT_MONTH,
  });
  const [siteInfo,setSiteInfo]=useState<any>()
  const [loading, setLoading] = useState<boolean>(false);
  const siteId = useMemo(()=>urlInfo&&parseInt(urlInfo.params.id),[urlInfo])

  useEffect(()=>{
    if (siteId){
      const config = siteService.FindOne({id:siteId},{})
      const sub = from(req(config)).subscribe((res)=>{
        setSiteInfo(res.result)
      })

      return ()=>sub.unsubscribe()
    }
  },[siteId])
  return (
    <Layout className="cdn-page">
      <Spin style={{ position: "fixed" }} spinning={loading}>
        <LoadingContext.Provider value={{ setLoading }}>
          <div className="without-top-margin">
            <div className="cdn-page-row cdn-block">
              <Row justify="end" className="cdn-page-row">
                <TimeFilter value={filterData} onChange={setFilterData} />
              </Row>
              <BasicChart data={[siteId, filterData]} />
            </div>
          </div>
            <div className="cdn-page-row cdn-block">
              <PerformanceStatusChart
                  siteInfo={siteInfo}
                  dateTimeData={filterData}
              />
            </div>
              <div className="cdn-page-row cdn-block">
                <SourceChart siteInfo={siteInfo} filterData={filterData} />
              </div>
        </LoadingContext.Provider>
      </Spin>
    </Layout>
  );
};


export default Performance;
export const LoadingContext = React.createContext<any>(null);
