import {useRef} from "react";

const useUpdateRef = <T>(value: T) => {
    const valueRef = useRef(value);
    valueRef.current = value;
    return valueRef
}

export default useUpdateRef;