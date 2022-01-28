import {FC, useEffect, useState} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {saleService} from "@/store/apis/account";
import SelectP from "@/common/select";
import {IFormComponent} from "@/common/interface";

const SaleSelector:FC<IFormComponent> = ({value, onChange}) => {
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        const sub = from(request<any>(saleService.QueryList({}, {
            pageSize: 999,
            page: 1
        }))).subscribe(res => {
            if(res.isSuccess && res.result){
                // console.log(res.result)
                setList(res.result.content);
            }
        })
        return () => sub.unsubscribe()
    }, [])

    return <SelectP
        data={list}
        value={value}
        onChange={onChange}
    />
}

export default SaleSelector
