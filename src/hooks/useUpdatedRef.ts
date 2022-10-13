import {useRef} from "react";

const useUpdatedRef = <T>(ref: T) => {
    const refRef = useRef<T>(ref)
    refRef.current = ref;
    return refRef
}

export default useUpdatedRef