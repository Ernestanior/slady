import {FC} from "react";
import useUrlParamsId from "@/hooks/useUrlParams";

const ViewStatistics:FC = () => {
    const id = useUrlParamsId("/statistics/:id")

    if(!id){
        return null
    }

    return <section>

    </section>
}

export default ViewStatistics