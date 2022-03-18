import {IEvent, ISubmit} from "@/common/interface";
import {useEffect, useState} from "react";

const useSubscribe = (subscriber: ISubmit, event$?:IEvent) => {
    const [init, setInit] = useState(false)
    useEffect(() => {
        if(event$){
            const sub = event$.subscribe(res => {
                subscriber(res);
                setTimeout(() => {
                    setInit(true)
                }, 50)
            })
            return () => sub.unsubscribe()
        }
    }, [event$, subscriber])

    return init
}

export default useSubscribe
