import {FC, useEffect, useState} from "react";
import CustomerSummary from "@/pages/statistics/view/cdn/charts/summary";
import TimeFilter from "@/common/timeFilter";
import Flow, {IFlowData} from "@/pages/statistics/view/cdn/charts/flow";
import {ETimeFilter, ITimeFilter} from "@/common/interface";
import BindWidth, {IBindWidth} from "@/pages/statistics/view/cdn/charts/bindWidth";
import {statService} from "@/store/apis/stat";
import {forkJoin, from} from "rxjs";
import request from "@/store/request";
import useCustomerSummaryInfo from "@/pages/statistics/view/cdn/charts/useCustomerSummaryInfo";

interface IProps{
    id:number
}
const CdnStat:FC<IProps> = ({id}) => {
    const [timeFilter, setTimeFilter] = useState<ITimeFilter>({
        reportType: ETimeFilter.CURRENT_MONTH
    })
    // 流量
    const [flow, setFlow] = useState<IFlowData>({
        flowList: null,
        originFlowList: null,
        cdnFlow: 0,
        originFlow: 0
    });

    // 带宽
    const [bindWidth, setBindWidth] = useState<IBindWidth>({
        bindWidth95: 0,
        bindWidthList: null
    })

    // 查询
    useEffect(() => {
        if(id && timeFilter){
            const data:any = {
                customerId: id,
                reportType: timeFilter.reportType
            }
            if(data.reportType === ETimeFilter.CUSTOM && timeFilter.startDate){
                data.startDate = timeFilter.startDate.format("YYYY/MM/DD")
            }
            if(data.reportType === ETimeFilter.CUSTOM && timeFilter.endDate){
                data.endDate = timeFilter.endDate.format("YYYY/MM/DD")
            }
            const configQuery95 = statService.StatCustomerbandwidth95({}, data);
            const configQueryBindWidth = statService.CustomerStatOverview({}, data);
            const sub = from(forkJoin([request<number>(configQuery95), request<any>(configQueryBindWidth)])).subscribe(values => {
                let bind95 = 0;
                let flowList = [];
                let originFlowList = [];
                let bindList = [];
                let cdnFlow = 0;
                let originFlow = 0;
                if(values[0].isSuccess){
                    bind95 = values[0].result || 0;
                }
                if(values[1].isSuccess && values[1].result){
                    if(values[1].result.cdn_FlowList){
                        flowList = values[1].result.cdn_FlowList;
                    }
                    if(values[1].result.origin_FlowList){
                        originFlowList = values[1].result.origin_FlowList
                    }
                    if(values[1].result.cdn_bandwidthList){
                        bindList = values[1].result.cdn_bandwidthList;
                    }
                    cdnFlow = values[1].result.sumCDNFlow;
                    originFlow = values[1].result.sumOriginFlow
                }
                setFlow({
                    flowList,
                    originFlowList,
                    cdnFlow,
                    originFlow
                });
                setBindWidth({
                    bindWidth95: bind95,
                    bindWidthList: bindList
                })
            })
            return () => sub.unsubscribe()
        }
    }, [timeFilter, id])

    const [domain, defence, packageInfo] = useCustomerSummaryInfo(id)

    if(!id){
        return null
    }

    return <section>
        <section style={{ marginTop: 15 }}>
            <TimeFilter value={timeFilter} onChange={setTimeFilter} />
            {
                packageInfo && <CustomerSummary
                    domain={domain}
                    defence={defence}
                    packageInfo={packageInfo}
                />
            }
            <section style={{ marginTop: 15 }}>
                <Flow data={flow} />
            </section>
            <section style={{ marginTop: 15 }}>
                <BindWidth data={bindWidth} packageInfo={packageInfo} />
            </section>
        </section>
    </section>
}

export default CdnStat
