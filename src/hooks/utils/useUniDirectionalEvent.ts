import {useCallback, useRef} from "react";
import {Subject} from "rxjs";
import {ISubmit} from "@/common/interface";

/**
 * 可订阅事件
 */
const useUniDirectionalEvent = () => {
    const eventRef = useRef(new Subject<boolean>());

    const sendEvent = useCallback((data: boolean) => {
        if(eventRef.current){
            eventRef.current.next(data)
        }
    }, [eventRef])

    return [eventRef.current, sendEvent] as [Subject<boolean>, ISubmit]
}

export default useUniDirectionalEvent
