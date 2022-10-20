import {useEffect, useState} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {dnsPlanService} from "@/store/apis/dns";

const useDnsPlanList = () => {
    const [dataList, setDataList] = useState<any[]>([])

    useEffect(() => {
        const sub = from(request<any[]>(dnsPlanService.FindPlanListQuery({}, {visibility: 1,}))).subscribe(res => {
            if(res.isSuccess && res.result){
                setDataList(res.result.map(item => ({
                    ...item,
                    name: zhMap[item.name]
                })))
            }
        })
        return () => sub.unsubscribe()
    }, [])

    return dataList
}

export default useDnsPlanList

const zhMap:any = {
    'free': "免费版",
    'standard': "标准版",
    'enterprise': "企业版",
    'customised': "定制版",
    'new_enterprise': "新企业版",
}