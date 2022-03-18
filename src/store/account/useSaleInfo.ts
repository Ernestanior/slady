import useBehaviorSubject from "@/hooks/useBehaviorSubject"
import accountService from "./service";
import {ISaleInfo} from "./interface";

const useSaleInfo = () => {
    return useBehaviorSubject<ISaleInfo>(accountService.saleInfo$);
}

export default useSaleInfo;
