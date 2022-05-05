import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import accountService from "@/store/account/service";

const use2FAuthInfo = () => {
    return useBehaviorSubject(accountService.auth2FAuth$ as any);
}

export default use2FAuthInfo