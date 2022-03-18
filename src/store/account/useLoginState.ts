import accountService from "./service";
import {useEffect, useState} from "react";

const useLoginState = () => {
    const [state, setState] = useState(accountService.loginState$.value);

    useEffect(() => {
        const sub = accountService.loginState$.subscribe(_state => {
            setState(_state)
        })
        return () => sub.unsubscribe()
    }, [])

    return state
}

export default useLoginState;
