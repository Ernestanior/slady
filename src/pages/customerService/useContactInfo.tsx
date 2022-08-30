import {useCallback, useEffect, useRef, useState} from "react";
import {from, Subject, switchMap} from "rxjs";
import requestNews from "@/store/request/requestNews";
import {AxiosRequestConfig} from "axios";

interface IContactConfig{
    interval: number,
    telegramList: string[];
    lineList: string[];
    skypeList: string[];
    emailList: string[];
    nextSwitchDate:string;
    currentContact:IContactMedia;
    nextContact:IContactMedia;
}
interface IContactMedia{
    email:string;
    line:string;
    skype:string;
    telegram:string;
}

const useContactInfo = () => {
    const [data, setData] = useState<IContactConfig|null>(null)
    const event$ = useRef(new Subject<number>())

    useEffect(() => {
        const config:AxiosRequestConfig = {
            url: "/api/customer/svc/get-info",
            method: "get"
        }
        const sub = event$.current
            .pipe(switchMap(() => from(requestNews<IContactConfig>(config))))
            .subscribe(res => {
                if(res.isSuccess && res.result){
                    setData({
                        interval: res.result.interval === null ? 1 : res.result.interval,
                        telegramList: res.result.telegramList === null ? [] : res.result.telegramList,
                        lineList: res.result.lineList === null ? [] : res.result.lineList,
                        skypeList: res.result.skypeList === null ? [] : res.result.skypeList,
                        emailList: res.result.emailList === null ? [] : res.result.emailList,
                        nextSwitchDate: res.result.nextSwitchDate,
                        currentContact:res.result.currentContact,
                        nextContact:res.result.nextContact,
                    })
                }
            })
        return () => sub.unsubscribe()
    }, [event$])

    const reloadData = useCallback(() => {
        event$.current.next(1)
    }, [event$])

    return [data, reloadData] as [IContactConfig|null, () => void]
}

export default useContactInfo