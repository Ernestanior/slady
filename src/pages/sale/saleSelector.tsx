import {FC, useEffect, useState, CSSProperties} from "react";
import {from} from "rxjs";
import request from "@/store/request";
import {saleService} from "@/store/apis/account";
import SelectP from "@/common/select";
import {IFormComponent} from "@/common/interface";

interface IProps{
    placeholder?: string
    style?: CSSProperties
    emptyOption?: boolean;
}

const SaleSelector:FC<IFormComponent & IProps> = ({emptyOption, value, onChange, placeholder, style}) => {
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        const sub = from(request<any>(saleService.QueryList({}, {
            searchPage: {
                pageSize: 999,
                page: 1
            }
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
        placeholder={placeholder}
        style={style}
        emptyOption={emptyOption}
        config={{
            idKey: "id",
            textKey: "email"
        }}
    />
}

export default SaleSelector
