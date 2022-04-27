import {useEffect, useState} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {dnsPlanService} from "@/store/apis/dns";

interface IPlanServer{
    id: number;
    domains: string[];
    name: string;
}

interface IServer{
    id: string;
    name: string;
}

/**
 * 根据套餐查询DNS服务器
 * @param planId
 */
const useDnsServerList = (planId: number) => {
    const [serverList, setServerList] = useState<IServer[]>([]);

    useEffect(() => {
        if(planId !== -1){
            const sub = from(request<IPlanServer[]>(dnsPlanService.FindListByPlanIdAndCustomerId({}, {planId}))).subscribe(res => {
                if(res.isSuccess && res.result){
                    setServerList(res.result.map(server => {
                        return {
                            id: server.domains.join(","),
                            name: `${server.name}-[${server.domains.join(",")}]`
                        }
                    }))
                }
            })
            return () => sub.unsubscribe()
        }
    }, [planId])

    return serverList
}

export default useDnsServerList