import {useEffect, useRef, useState} from "react";
import {debounceTime, Subject} from "rxjs";

/**
 * 1.防抖
 * 2.延迟加载内容
 */
const useDebounce = <T>(data:T, delayTime: number = 0) => {
    const [rData, setRData] = useState(data);
    const dataRef = useRef(new Subject<T>())
    const delayTimeRef = useRef(delayTime)

    // 值有更新，自动推送
    useEffect(() => {
        dataRef.current.next(data)
    }, [dataRef, data])

    // 防抖读取最新值
    useEffect(() => {
        const sub = dataRef.current.pipe(debounceTime(delayTimeRef.current)).subscribe(newData => {
            setRData(newData)
        })
        return () => sub.unsubscribe()
    }, [dataRef, delayTimeRef])

    return rData
}

export default useDebounce