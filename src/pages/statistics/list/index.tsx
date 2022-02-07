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
import {LABEL_COLOR} from "@/common/const";

const StatisticsList:FC = () => {

    const queryFunction = useCallback(async (data) => {
        try {
            const customerConfig = customerService.FindCustomer({}, { ...data });
            const customerListRep = await request<ITableDataModule>(customerConfig);
            if(!customerListRep.isSuccess){
                return null
            }
            const customerList = customerListRep.result
            // 调用客户带宽统计功能先禁用
            if (customerList) {
                const customerIds: number[] = customerList.content.map((t) => t.id);
                if (customerIds.length > 0) {
                    // 套餐使用等统计
                    const customerStatConfig = statService.SaleStatCustomer(customerIds);
                    const responses = await request<any[]>(customerStatConfig);
                    if (responses.isSuccess && responses.result && responses.result.length > 0) {
                        const customerSaleStatList = responses.result;
                        const customerSaleStatMap:any = {};
                        customerSaleStatList.forEach(item => {
                            customerSaleStatMap[item.customerId] = item
                        })
                        customerList.content.forEach(item => {
                            item.saleStat = customerSaleStatMap[item.id]
                        })
                    }
                }
            }
            console.log(customerList)
            return customerList;
        } catch (error) {
            console.error(error);
        }
        return null;
    }, []);

    // 下拉
    const _columns:any = useMemo(() => {
        return [
            ...columns,
            {
                title: "操作",
                dataIndex: "opt",
                width: 200,
                fixed: "right",
                render(_:any, data:any){
                    return <Space>
                        <Button onClick={() => { historyService.push("/statistics/" + data.id) }}>查看</Button>
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
            scroll={{
                x: 1600
            }}
        />
    </section>
}

export default StatisticsList;


const columns: TableColumnProps<any>[] = [
    {
        title: "客户名称",
        dataIndex: "name",
        width: 200,
        fixed: "left"
    },
    {
        title: "销售员",
        dataIndex: "saleName",
        width: 200
    },
    {
        title: "带宽额度(Mbps)",
        dataIndex: "limitBandwidth",
        render: (value: any, data) => {
            if(typeof value !== "number"){
                return "-"
            }
            let color = getBindWidth(value, data);
            return <div {...getLabelStyle(color)}>{toFixed(value / 1000000, 2)}</div>;
        }
    },
    {
        title: "上个月95带宽(Mbps)",
        dataIndex: "bandwidthOfLastMonth",
        render: (_, data) => {
            if(!data.saleStat || typeof data.saleStat.bandwidthOfLastMonth !== "number"){
                return "-"
            }
            const value = data.saleStat.bandwidthOfLastMonth;
            return toFixed(value / 1000000, 2);
        }
    },
    {
        title: "本月95带宽(Mbps)",
        dataIndex: "bandwidthOfCurrentMonth",
        render: (_, data) => {
            if(!data.saleStat || typeof data.saleStat.bandwidthOfCurrentMonth !== "number"){
                return "-"
            }
            const value = data.saleStat.bandwidthOfCurrentMonth;
            return toFixed(value / 1000000, 2);
        }
    },
    {
        title: "最近-14-7天流量(M)",
        dataIndex: "flowOfLast14To7Day",
        render: (_, data) => {
            if(!data.saleStat || typeof data.saleStat.flowOfLast14To7Day !== "number"){
                return "-"
            }
            const value = data.saleStat.flowOfLast14To7Day;
            return toFixed(value / 1000000, 2);
        }
    },
    {
        title: "最近7天流量(M)",
        dataIndex: "flowOfLast7Day",
        render: (_, data) => {
            if(!data.saleStat || typeof data.saleStat.flowOfLast7Day !== "number"){
                return "-"
            }
            const value = data.saleStat.flowOfLast7Day;
            let color;
            if(data.saleStat){
                if(typeof data.saleStat.flowOfLast14To7Day === "number"){
                    if(value < (data.saleStat.flowOfLast14To7Day * 10)){
                        color = LABEL_COLOR.YELLOW
                    }
                    if(value > (data.saleStat.flowOfLast14To7Day * 10)){
                        color = LABEL_COLOR.GREEN
                    }
                }
            }
            return <div {...getLabelStyle(color)}>{toFixed(value / 1000000, 2)}</div>;
        }
    },
    {
        title: "使用域名额度",
        dataIndex: "domains",
        render: (_, data) => {
            if(data.type === "normal"){
                if(!data.saleStat || typeof data.saleStat.domains !== "number"){
                    return "-"
                }
                const value = data.saleStat.domains;
                return `${value}/${data.limitDomains}`;
            }
            if(data.type === "cname"){
                if(!data.saleStat || typeof data.saleStat.usedSites !== "number"){
                    return "-"
                }
                const value = data.saleStat.usedSites;
                return `${value}/${data.limitCnames}`;
            }
            return "-"
        }
    },
    {
        title: "防御额度(GB)",
        dataIndex: "limitDefence",
        render: (value) => {
            if(value === -1){
                return "Unlimited"
            }
            return value || "-"
        }
    }
]

function getLabelStyle(color?: string, fontColor?: string){
    if(!color){
        return {}
    }
    return {
        style: {
            backgroundColor: color,
            color: fontColor,
            borderRadius: "5px",
            lineHeight: "32px",
            paddingLeft: 5
        }
    }
}

function getBindWidth(value:any, data:any){
    let color;
    if(data.saleStat){
        if(typeof data.saleStat.bandwidthOfCurrentMonth === "number"){
            if(value < data.saleStat.bandwidthOfCurrentMonth){
                color = LABEL_COLOR.RED
            }
        }
        if(typeof data.saleStat.bandwidthOfLastMonth === "number"){
            if(value < data.saleStat.bandwidthOfLastMonth){
                color = LABEL_COLOR.RED
            }
        }
    }
    return color
}
