import React, {FC} from "react";
import useDebounce from "@/hooks/useDebounce";

interface IProps {
    visible?: boolean;
    tOption?: string;
    fOption?: string;
    className?: string;
    /**  true means will remove dom not hide it */
    removeMode?: boolean;
    /** delay show */
    delayTime?: number;
}

const ConditionShow: FC<IProps> = props => {
    const { visible, tOption = "block", fOption = "none", removeMode, delayTime } = props;
    const visibleResult = useDebounce(visible, delayTime)

    if(removeMode){
        if(visible){
            return <section>{props.children}</section>
        }
        return  null;
    }

    return <section className={props.className} style={{ display: visibleResult ? tOption : fOption }}>
        {props.children}
    </section>
}

export default ConditionShow;
