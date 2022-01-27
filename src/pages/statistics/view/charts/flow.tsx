import {FC} from "react";
import {IDataModule} from "@/common/interface";

export interface IFlowData{
    flowList: any[] | null;
    cdnFlow: number
    originFlow: number
}

const Flow:FC<IDataModule<IFlowData>> = ({data}) => {

    if(!data){
        return null
    }

    return <section className="cdn-block">

    </section>
}

export default Flow;
