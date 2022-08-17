import {FC} from "react";
import CardButton from "@/pages/userInfo/components/cardButton";
import useUniDirectionalEvent from "@/hooks/utils/useUniDirectionalEvent";
import SafetyModule from "@/pages/userInfo/safety/safetyModule";
import IconFont from "@/common/icon";

const Safety:FC = () => {
    const [event$, sendMessage] = useUniDirectionalEvent();
    return <>
        <CardButton
            icon={<IconFont type="iconanquan" style={{ color:"#464747",fontSize: "3.5em" }} />}
            text="安全"
            onClick={() => sendMessage(true)}
        />
        <SafetyModule event$={event$} />
    </>
}

export default Safety
