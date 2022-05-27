import {useEffect, useState} from "react";
import {AxiosRequestConfig} from "axios";
import {from} from "rxjs";
import requestNews from "@/store/request/requestNews";
import {IData} from "@/pages/news/form";

const useNewsDetail = (id?: string) => {
    const [data, setData] = useState<IData | null>(null)

    useEffect(() => {
        if(id){
            const config:AxiosRequestConfig = {
                method: "get",
                url: "/api/information/detail",
                params: {
                    id
                }
            }
            const sub = from(requestNews<any>(config)).subscribe(res => {
                if(res.isSuccess){
                    if(res.result){
                        setData(res.result)
                    }
                }
            })
            return () => sub.unsubscribe()
        }
    }, [id])

    return data
}

export default useNewsDetail