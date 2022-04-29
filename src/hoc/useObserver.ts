import {BehaviorSubject} from "rxjs";
import {useEffect, useRef, useState} from "react";

const useObserver = <T extends Object, S extends T>(data$: BehaviorSubject<S>, observerMap: T) => {
    const observerMapRef = useRef(observerMap)
    const [valueMap, setValueMap] = useState<T>(observerMap);

    // diff
    const valueMapRef = useRef(valueMap);
    valueMapRef.current = valueMap

    useEffect(() => {
        const sub = data$.subscribe(data => {
            const reNewKeys = Object.keys(data) as Array<keyof T>;
            let needReload = false
            reNewKeys.forEach(key => {
                if(observerMapRef.current.hasOwnProperty(key)){
                    if(valueMapRef.current[key] !== data[key]){
                        needReload = true;
                        valueMapRef.current[key] = data[key]
                    }
                }
            })
            if(needReload){
                setValueMap({
                    ...valueMapRef.current
                })
            }
        })
        return () => sub.unsubscribe()
    }, [observerMapRef, valueMapRef, data$])

    return valueMap
}

export default useObserver