import {FC} from "react";
import {IDataModule} from "@/common/interface";

export interface IBindWidth{
    bindWidth95: number;
    bindWidthList: any[] | null
}

const BindWidth:FC<IDataModule<IBindWidth>> = ({data}) => {
    return <section className="cdn-block">
        带宽
    </section>
}

export default BindWidth;
