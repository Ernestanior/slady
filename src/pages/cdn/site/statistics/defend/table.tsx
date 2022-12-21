import { IColumnsTypeP } from "@/common/template/interface";
// import { LimitRender } from "@/pages/main/pages/customerSummary/table";
import {dateFomatter} from "@/common/utilsx";
interface IDateItem {
  clientIp: string;
  country: string;
  uri: string;
  count: string;
  rate: string;
  reportTime: string;
  type: string;
}
/**
 * 表格行
 */

export const dateFomatterhms = (time: any) => {
    return dateFomatter(time, "YYYY/MM/DD HH:mm:ss");
};
export const columns:any = [
    {
      key: "clientIp",
      title: "ACCESS_SOURCE_IP",
      dataIndex: "clientIp",
    },
    {
      key: "country",
      title:"ACCESS_ORIGIN",
      dataIndex: "country",
    },
    {
      key: "uri",
      title: "ACCESS_URI",
      dataIndex: "uri",
    },
    // {
    //   key: "type",
    //   title: "SPEED_LIMIT_VIOLATOIN",
    //   dataIndex: "type",
    //   render: (data) => {
    //     return <LimitRender data={data} />
    //   }
    // },
    // {
    //     key: "count",
    //     title: "VISIT_COUNT",
    //     dataIndex: "count",
    // },
    {
      key: "rate",
      title: "SPEED_LIMIT_FREQUENCY",
      dataIndex: "rate",
    },
    {
      key: "reportTime",
      title: "INTERCEPT_TIME",
      dataIndex: "reportTime",
      render: (time) => dateFomatterhms(time),
    },
  ] as IColumnsTypeP<IDateItem>[]
