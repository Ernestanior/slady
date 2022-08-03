import { FC, useEffect, useMemo, useState } from "react";
import { from } from "rxjs";
import API from "@/store/apis/dns/plan";
import { Table } from "antd";
import request from "@/store/request";
import RequestQuantity from "./charts/requestQuantity";

const apiService = new API();

interface IProps{
    id:number
}
const DNSInfo: FC<IProps> = ({id})=> {
  const [dnsInfo, setDnsInfo] = useState<any | null>(null);
  useEffect(() => {
      const config = apiService.queryCustomerDnsService({id}, {});
      const sub = from(request(config)).subscribe((res) => {
        if (res.isSuccess) {
          !!res.result && setDnsInfo(res.result);
        }
      });
      return () => sub.unsubscribe();
  }, [id]);

  const dataSource = useMemo(() => {
    const list: any[] = [];
    const l = dnsInfo?.customPlanBalance;
    if (l) {
        if (l?.customised) {
            list.push({
                label:  '定制版',
                used: l?.customised?.usedAmount,
                total: l?.customised?.totalAmount
            })
        }
        if (l?.enterprise) {
            list.push({
                label:  '企业版',
                used: l?.enterprise?.usedAmount,
                total: l?.enterprise?.totalAmount
            })
        }
        if (l?.free) {
            list.push({
                label: '免费版',
                used: l?.free?.usedAmount,
                total: l?.free?.totalAmount
            })
        }
        if (l?.standard) {
            list.push({
                label: '标准版',
                used: l?.standard?.usedAmount,
                total: l?.standard?.totalAmount
            })
        }
    }

    return list;
  }, [dnsInfo?.customPlanBalance]);
  return (
    <section style={{marginTop:30}}>
      <Table
          style={{marginBottom:30}}
        size="small"
        bordered
        dataSource={dataSource}
        rowKey="label"
        columns={[
          {
            title: '套餐内容',
            dataIndex: "label",
            width: "40%",
          },
          {
            title: '已使用',
            dataIndex: "used",
            width: "30%",
          },
          {
            title: '额度',
            dataIndex: "total",
            width: "30%",
          },
        ]}
        pagination={{
          total: 10,
          hideOnSinglePage: true,
        }}
      />
      <RequestQuantity padding={false} customerId={id}/>
    </section>
  );
};
export default DNSInfo;
