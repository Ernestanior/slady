import {Layout, Row} from "antd";
import React, {createContext, FC, useEffect, useMemo, useState} from "react";
import Chart from "./chart/chartIndex";
import {from} from "rxjs";
import {ETimeFilter} from "@/common/interface";
import {useRouteMatch} from "react-router-dom";
import {siteService} from "@/store/apis/site";
import req from "@/store/request";
import TimeFilter from "@/common/timeFilter";
export const ThemeContext = createContext<any>(null);

const Defense: FC = () => {
  const urlInfo = useRouteMatch<{id:string}>("/cdn/siteList/defend-sta/:id")
  const siteId = useMemo(()=>urlInfo&&parseInt(urlInfo.params.id),[urlInfo])
  const [siteInfo,setSiteInfo]=useState<any>()

  const [filterData, setFilterData] = useState<any>({
    reportType: ETimeFilter.CURRENT_MONTH,
  });

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
    <Layout>
        <Row justify="end">
          <TimeFilter value={filterData} onChange={setFilterData} />
        </Row>
        <div className="cdn-page-row cdn-block">
          <ThemeContext.Provider value={{ siteInfo, filterData }}>
            <Chart />
          </ThemeContext.Provider>
        </div>
    </Layout>
  );
};

export default Defense;



