import React, { FC } from "react";

interface IProps {
    visible?: boolean;
    tOption?: string;
    fOption?: string;
    className?: string;
    /**  true means will remove dom not hide it */
    removeMode?: boolean;
}

const ConditionShow: FC<IProps> = props => {
    const { visible, tOption = "block", fOption = "none", removeMode } = props;

    if(removeMode){
        if(visible){
            return <section>{props.children}</section>
        }
        return  null;
    }

    return <section className={props.className} style={{ display: visible ? tOption : fOption }}>
        {props.children}
    </section>
}

export default ConditionShow;
