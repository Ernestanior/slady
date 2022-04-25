import {useEffect, useState} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {dnsPlanService} from "@/store/apis/dns";

const useDnsPlanList = () => {
    const [dataList, setDataList] = useState<any[]>([])

    useEffect(() => {
        const sub = from(request<any[]>(dnsPlanService.FindPlanListQuery({}, {visibility: 1,}))).subscribe(res => {
            if(res.isSuccess && res.result){
                setDataList(res.result)
            }
        })
        return () => sub.unsubscribe()
    }, [])

    return dataList
}

export default useDnsPlanList