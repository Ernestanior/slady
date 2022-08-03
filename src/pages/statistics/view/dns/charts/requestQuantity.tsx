import { FC, useState, useCallback, useEffect } from "react";
import EchartLoader from "@/common/echarts/components/echarts-Loader";
import { option } from "./const";
import RecordAPI, { IEntityParams } from "@/store/apis/dns/record";
import { from } from "rxjs";
import { Spin } from "antd";
import request from "@/store/request";

const apiService = new RecordAPI();

const RequestQuantity: FC<IProps> = ({ padding = true }) => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(true)

  const queryStat = useCallback(() => {
    const config = apiService.EntityResolveChart({}, params);
    from(request<any>(config)).subscribe((res) => {
      if (res.result instanceof Array) {
        setData(res.result);
        setVisible(false)
      }
    });
  }, []);

  useEffect(() => {
    queryStat();
  }, [queryStat]);

  return (
    <div className={`${padding ? "cdn-page-row" : ""} cdn-block `}>
      <Spin spinning={visible} tip="Loading...">
        <EchartLoader config={option(data, "解析量统计")} />
        {/*<ReactECharts*/}
        {/*    style={{*/}
        {/*      height: 400*/}
        {/*    }}*/}
        {/*    option={options}*/}
        {/*/>*/}
      </Spin>
    </div>
  );
};
export default RequestQuantity;

const params: IEntityParams = {
  reportType: "currentMonth",
  startDate: "",
  endDate: "",
};

interface IProps {
  padding?: boolean;
}
