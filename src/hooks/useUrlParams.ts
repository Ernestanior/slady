import {useRouteMatch} from "react-router-dom";
import {useMemo} from "react";

const useUrlParamsId = (parseUrl: string) => {
    const url = useRouteMatch<{ id: string }>(parseUrl);

    return useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return parseInt(url.params.id)
            }
        }
    }, [url])
}

export default useUrlParamsId