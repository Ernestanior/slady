import {IBatchEvent, INormalEvent, IRoleLimitModule} from "@/common/interface";
import useAccountInfo from "@/store/account";
import {useMemo} from "react";

const useRoleFilter = (originList?: IRoleLimitModule[]) => {
    const accountInfo = useAccountInfo();
    return useMemo(() => {
        if(!originList){
            return [];
        }
        return originList.filter(item => {
            if(item.role){
                return !!accountInfo && item.role.includes(accountInfo.type);
            }
            return true
        })
    }, [accountInfo, originList]) as INormalEvent[] | IBatchEvent[]
}

export default useRoleFilter
