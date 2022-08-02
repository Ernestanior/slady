import useBehaviorSubject from "@/hooks/useBehaviorSubject"
import msg, {IInfo} from "./service";

const useMessage = () => {
    return useBehaviorSubject<IInfo>(msg.info$);
}

export default useMessage;
