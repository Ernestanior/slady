import {FC} from "react";
import useUrlParamsId from "@/hooks/useUrlParams";


const DetailEmail:FC = () => {
    const id = useUrlParamsId("/email/:id")
    return <section>
        {id}
    </section>
}

export default DetailEmail;
