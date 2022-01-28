import {FC, useEffect, useState} from "react";
import {IFormComponent, IIDModule} from "@/common/interface";
import SelectP from "@/common/select";
import {from} from "rxjs";
import request from "@/store/request";
import {saleService} from "@/store/apis/account";

const AgentList:FC<IIDModule & IFormComponent> = ({id, value, onChange}) => {
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        if(id){
            const sub = from(request(saleService.QueryAgentBySaleId({saleId: id}, {}))).subscribe(res => {
                if(res.isSuccess && res.result){
                    // 需要后端修改
                    console.log(res.result)
                }
            })
            return () => sub.unsubscribe()
        }else{
            setList([])
        }
    }, [id])

    return <SelectP
        data={list}
        value={value}
        onChange={onChange}
    />
}

export default AgentList
