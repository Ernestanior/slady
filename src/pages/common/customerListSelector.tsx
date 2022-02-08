import {FC, useEffect, useState, CSSProperties} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {customerService} from "@/store/apis/account";
import SelectP from "@/common/select";
import {IFormComponent} from "@/common/interface";

interface IProps{
    bordered?: boolean;
    size?: "large" | "small" | "default";
    style?: CSSProperties;
    emptyOption?: boolean
}

const CustomerListSelector:FC<IFormComponent & IProps> = ({emptyOption, style, size, bordered, value, onChange}) => {
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        const sub = from(request<any[]>(customerService.FindCustomerList({}, {}))).subscribe(res => {
            if(res.isSuccess && res.result){
                setList(res.result)
            }
        })
        return () => sub.unsubscribe()
    }, [])

    return <SelectP
        style={{ minWidth: 120, width: "auto", ...style }}
        bordered={bordered || false}
        size={size === "default" ? undefined : size}
        emptyOption={!!emptyOption}
        data={list}
        value={value}
        onChange={onChange}
        placeholder="选择客户"
    />
}

export default CustomerListSelector
