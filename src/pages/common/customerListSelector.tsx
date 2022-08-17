import {FC, useEffect, useState, CSSProperties} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {customerService} from "@/store/apis/account";
import SelectP from "@/common/select";
import {IFormComponent} from "@/common/interface";
import isMobile from "@/app/isMobile";

interface IProps{
    bordered?: boolean;
    size?: "large" | "small" | "default";
    style?: CSSProperties;
    emptyOption?: boolean;
    includeArchiveCustomer?: boolean;
}

const CustomerListSelector:FC<IFormComponent & IProps> = ({includeArchiveCustomer, emptyOption, style, size, bordered, value, onChange}) => {
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        const sub = from(request<any[]>(customerService.FindCustomerList({}, {includeArchiveCustomer: !!includeArchiveCustomer}))).subscribe(res => {
            if(res.isSuccess && res.result){
                const map:any = {};
                res.result.forEach(customer => {
                    map[customer.id] = customer
                })
                setList(Object.keys(map).map(id => {
                    return map[id]
                }))
            }
        })
        return () => sub.unsubscribe()
    }, [includeArchiveCustomer])

    return <SelectP
        style={{ minWidth: 120, width: "auto", ...style }}
        bordered={bordered || false}
        size={size === "default" ? undefined : size}
        emptyOption={!!emptyOption}
        data={list}
        value={value}
        onChange={onChange}
        placeholder={isMobile?"":"选择客户"}
    />
}

export default CustomerListSelector
