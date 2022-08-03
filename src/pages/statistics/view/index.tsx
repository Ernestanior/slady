import {FC, useEffect, useMemo, useState} from "react";
import {Breadcrumb, Tabs} from "antd";
import {Link, useRouteMatch} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import historyService from "@/store/history";
import CustomerListSelector from "@/pages/common/customerListSelector";
import CdnStat from './cdn'
import DnsStat from './dns'
import {customerService} from "@/store/apis/account";
import {from} from "rxjs";
import request from "@/store/request";

const { TabPane } = Tabs;

const ViewStatistics:FC = () => {
    const [customerInfo,setCustomerInfo] = useState()
    const url = useRouteMatch<{ id: string}>("/statistics/:id")
    const id = useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return parseInt(url.params.id)
            }
        }
    }, [url])

    useEffect(()=>{
        if (id){
            const config = customerService.FindOne({id},{})
            const sub = from(request(config)).subscribe((res)=>{
                setCustomerInfo(res.result as any)
            })
            return ()=>sub.unsubscribe()
        }
    },[id])

    const statContent = useMemo(()=>{
        if (id && customerInfo){
            const {dnsServiceFlag,cdnServiceFlag}=customerInfo
            if(dnsServiceFlag && cdnServiceFlag){
                return <Tabs defaultActiveKey="1">
                    <TabPane tab="CDN" key="1">
                        <CdnStat id={id}/>
                    </TabPane>
                    <TabPane tab="DNS" key="2">
                        <DnsStat id={id}/>
                    </TabPane>
                </Tabs>
            }
            if(cdnServiceFlag){
                return <CdnStat id={id}/>
            }
            if(dnsServiceFlag){
                return <DnsStat id={id}/>
            }
        }

    },[id,customerInfo])

    if(!id){
        return null
    }

    return <section>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <Link to= "/statistics">
                    <HomeOutlined />
                    <span style={{marginLeft: 5, lineHeight: "32px"}}>统计报表</span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                查看
                <CustomerListSelector
                    value={id}
                    onChange={customerId => {
                        historyService.push(`/statistics/${customerId}`)
                    }}
                />
            </Breadcrumb.Item>
        </Breadcrumb>
        {statContent}
    </section>
}

export default ViewStatistics
