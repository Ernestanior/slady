import {FC, useMemo} from "react";
import {Breadcrumb, Tabs} from "antd";
import {Link, useRouteMatch} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import historyService from "@/store/history";
import CustomerListSelector from "@/pages/common/customerListSelector";
import CdnStat from './cdn'
import DnsStat from './dns'

const { TabPane } = Tabs;

const ViewStatistics:FC = () => {

    const url = useRouteMatch<{ id: string, cdn: string,dns:string }>("/statistics/:id/:cdn/:dns")
    console.log(url)
    const id = useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return parseInt(url.params.id)
            }
        }
    }, [url])

    const cdn = useMemo(() => {
        if(url && url.params){
            if(url.params.cdn) {
                return parseInt(url.params.cdn)
            }
        }
    }, [url])

    const dns = useMemo(() => {
        if(url && url.params){
            if(url.params.dns) {
                return parseInt(url.params.dns)
            }
        }
    }, [url])

    const statContent = useMemo(()=>{
        if (id){
            if(dns && cdn){
                return <Tabs defaultActiveKey="1">
                    <TabPane tab="CDN" key="1">
                        <CdnStat id={id}/>
                    </TabPane>
                    <TabPane tab="DNS" key="2">
                        <DnsStat id={id}/>
                    </TabPane>
                </Tabs>
            }
            if(cdn){
                return <CdnStat id={id}/>
            }
            if(dns){
                return <DnsStat id={id}/>
            }
        }

    },[id,cdn,dns])

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
