import {FC} from "react";
import useUniDirectionalEvent from "@/hooks/utils/useUniDirectionalEvent";
import CardButton from "@/pages/userInfo/components/cardButton";
import FA2Module from "@/pages/userInfo/2FA/FAModule";
import IconFont from "@/common/icon";

const FA2:FC = () => {
    const [event$, sendMessage] = useUniDirectionalEvent();
    return <>
        <CardButton
            icon={<IconFont type="icona-Group3911" style={{ color:"#464747",fontSize: "3.5em" }} />}
            text="二次验证"
            onClick={() => sendMessage(true)}
        />
        <FA2Module event$={event$} />
    </>
}

export default FA2

