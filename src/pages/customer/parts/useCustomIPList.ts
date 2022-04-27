import {useEffect, useState} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {dnsPlanService} from "@/store/apis/dns";

const useCustomIPList = (planId: number) => {
    const [dataList, setDataList] = useState<string[]>([]);

    useEffect(() => {
        if(planId !== -1){
            const sub = from(request<string[]>(dnsPlanService.QueryNodeListByPlan({planId}, {}))).subscribe(res => {
                if(res.isSuccess && res.result){
                    setDataList(res.result)
                }
            })
            return () => sub.unsubscribe()
        }
    }, [planId])

    return dataList
}

export default useCustomIPList