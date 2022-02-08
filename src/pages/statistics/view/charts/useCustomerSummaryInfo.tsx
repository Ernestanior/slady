import {useEffect, useState} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {customerService} from "@/store/apis/account";

const useCustomerSummaryInfo = (id?: number) => {
    const [domain, setDomain] = useState({
        totalAmount: 0,
        usedAmount: 0
    })

    // 防御额度
    const [defence, setDefence] = useState<any>({
        totalAmount: 0,
        usedAmount: 0
    })

    const [packageInfo, setPackageInfo] = useState<any>(null);

    useEffect(() => {
        if(id){
            const sub = from(request<any>(customerService.GetCustomerPackage({ id }, {}))).subscribe(res => {
                if(res.isSuccess && res.result){
                    setDomain({
                        totalAmount: parseInt(res.result.domainBalance.totalAmount),
                        usedAmount: parseInt(res.result.domainBalance.usedAmount)
                    })
                    setDefence(res.result.defenceBalance)
                    setPackageInfo(res.result);
                }else{
                    setDomain({
                        totalAmount: 0,
                        usedAmount: 0
                    })
                    setDefence({
                        totalAmount: 0,
                        usedAmount: 0
                    })
                }
            })
            return () => sub.unsubscribe()
        }
    }, [id])

    return [domain, defence, packageInfo]
}

export default useCustomerSummaryInfo
