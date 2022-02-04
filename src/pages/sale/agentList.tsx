import {FC, useEffect, useState} from "react";
import {IDisableModule, IFormComponent} from "@/common/interface";
import SelectP from "@/common/select";
import {from} from "rxjs";
import request from "@/store/request";
import {agentService} from "@/store/apis/account";

interface IProps{
    saleId?: number
}

const AgentList:FC<IProps & IFormComponent & IDisableModule> = ({saleId, value, onChange, disable}) => {
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        if(saleId){
            const sub = from(request(agentService.FindSale({saleId: saleId}, {}))).subscribe(res => {
                if(res.isSuccess && res.result){
                    // 需要后端修改
                    if(Array.isArray(res.result)){
                        setList(res.result.map(item => ({
                            id: item.id,
                            name: item.agentName
                        })))
                    }
                }
            })
            return () => sub.unsubscribe()
        }else{
            setList([])
        }
    }, [saleId])

    return <SelectP
        data={list}
        value={value}
        onChange={onChange}
        disabled={disable}
    />
}

export default AgentList
