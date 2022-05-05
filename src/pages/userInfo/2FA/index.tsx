import {FC} from "react";
import {IdcardOutlined} from "@ant-design/icons";
import useUniDirectionalEvent from "@/hooks/utils/useUniDirectionalEvent";
import CardButton from "@/pages/userInfo/components/cardButton";
import FA2Module from "@/pages/userInfo/2FA/FAModule";

const FA2:FC = () => {
    const [event$, sendMessage] = useUniDirectionalEvent();
    return <>
        <CardButton
            icon={<IdcardOutlined style={{ fontSize: "2em" }} />}
            text="二次验证"
            onClick={() => sendMessage(true)}
        />
        <FA2Module event$={event$} />
    </>
}

export default FA2

