import {FC} from "react";
import CardButton from "@/pages/userInfo/components/cardButton";
import {SafetyOutlined} from "@ant-design/icons";
import useUniDirectionalEvent from "@/hooks/utils/useUniDirectionalEvent";
import SafetyModule from "@/pages/userInfo/safety/safetyModule";

const Safety:FC = () => {
    const [event$, sendMessage] = useUniDirectionalEvent();
    return <>
        <CardButton
            icon={<SafetyOutlined style={{ fontSize: "2em" }} />}
            text="安全"
            onClick={() => sendMessage(true)}
        />
        <SafetyModule event$={event$} />
    </>
}

export default Safety
