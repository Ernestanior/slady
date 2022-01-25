import {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import {Button, Space, TableColumnProps} from "antd";
import historyService from "@/store/history";
import {customerService} from "@/store/apis/account";
import request from "@/store/request";
import {ITableDataModule} from "@/common/interface";
import {statService} from "@/store/apis/stat";
import StatFilter from "@/pages/statistics/list/filter";
import {toFixed} from "@/common/utils";
import moment from "moment"

const StatisticsList:FC = () => {

    const query = useCallback((data) => {
        return customerService.FindCustomer({}, data);
    }, [])

    const queryFunction = useCallback(async (data) => {
        const combineData: any[] = [];
        try {
            const customerConfig = customerService.FindCustomer({}, { ...data });
            const customerListRep = await request<ITableDataModule<any>>(customerConfig);
            if(!customerListRep.isSuccess){
                return null
            }
            const customerList = customerListRep.result
            // 调用客户带宽统计功能先禁用
            if (customerList) {
                const siteIds: number[] = customerList.content.map((t) => t.id);

                if (siteIds.length > 0) {
                    // 请求当月带宽
                    // queryCurrentBindWidth(siteIds);
                    // 请求历史带宽
                    const customerBw = statService.CustomerListBandwidth({}, siteIds);
                    const customerInfo = await request<any[]>(customerBw);
                    if (customerInfo.isSuccess) {
                        const cutomerBwList = customerInfo.result;
                        if (cutomerBwList !== null) {
                            Object.values(customerList.content).forEach((t, index) => {
                                const newrecord = {
                                    ...Object.values(cutomerBwList)[index],
                                    ...t,
                                };
                                return combineData.push(newrecord);
                            });
                        }
                        customerList.content = combineData;
                    }
                }
            }
            return customerList;
        } catch (error) {
            console.error(error);
        }
        return null;
    }, []);

    // 下拉
    const _columns = useMemo(() => {
        return [
            ...columns,
            {
                title: "操作",
                dataIndex: "opt",
                width: 200,
                render(_:any, data:any){
                    return <Space>
                        <Button onClick={() => { historyService.push("/stat/" + data.id) }}>查看</Button>
                    </Space>
                }
            }
        ]
    }, [])
    return <section>
        <Template
            filter={<StatFilter />}
            columns={_columns}
            queryDataFunction={queryFunction}
            rowKey="id"
        />
    </section>
}

export default StatisticsList;


const columns: TableColumnProps<any>[] = [
    {
        title: "ID",
        dataIndex: "id",
        width: 100,
        fixed: "left"
    },
    {
        title: "CUSTOMER_NAME",
        dataIndex: "name",
        width: 200
    },
    // ColStatus1_1(),
    {
        key: "limitBandwidth",
        title: "LIMIT_BANDWIDTH_MBPS",
        dataIndex: "limitBandwidth",
        render: (value: number) => {
            if(typeof value !== "number"){
                return "-"
            }
            return toFixed(value / 1000000, 2);
        }
    },
    {
        key: "currentMonthBindWidth",
        title: "CURRENT_MONTH_MBPS",
        dataIndex: "currentMonthBindWidth",
        render: (value: number) => {
            if(typeof value !== "number"){
                return "-"
            }
            return toFixed(value / 1000000, 2);
        }
    },
    {
        key: "oneMonthAgoBandwith",
        title: `MBPS_MONTH_${moment().subtract(1, 'months').format("M")}`,
        dataIndex: "oneMonthAgoBandwith",

    },
    {
        key: "twoMonthAgoBandwith",
        title: `MBPS_MONTH_${moment().subtract(2, 'months').format("M")}`,
        dataIndex: "twoMonthAgoBandwith",
    },
]
