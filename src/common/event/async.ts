import {useCallback, useRef} from "react";
import {BehaviorSubject} from "rxjs";
import {ISubmit} from "@/common/interface";

/**
 * 可订阅的异步事件
 */
const useAsyncData = <T = any>() => {
    const {current: data$} = useRef(new BehaviorSubject<T | any>({}));

    const loadData = useCallback((values: any, replace = false) => {
        data$.next(!replace ? {
            ...data$.value,
            ...values
        } : values);
    }, [data$])

    return [data$, loadData] as [BehaviorSubject<T|any>, ISubmit]

}

export default useAsyncData;
