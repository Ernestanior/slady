import {FC, ReactNode} from "react";
import {IEventListModule} from "@/common/interface";
import useRoleFilter from "@/hooks/utils/useRoleFilter";
import {Button, Space, Radio} from "antd";

/**
 * 功能列表
 * @param event
 * @constructor
 */
const FuncList:FC<IEventListModule> = ({event}) => {
    const _funcList = useRoleFilter(event);

    if(_funcList.length < 1){
        return null;
    }

    // primary按钮
    const primaryList:ReactNode[] = [];
    const normalList:ReactNode[] = [];

    _funcList.forEach((btn, idx) => {
        // primary
        if(btn.primary){
            primaryList.push(<Button type="primary" key={idx} onClick={btn.event}>
                {btn.text}
            </Button>)
        }else{
            normalList.push(<Radio.Button  className="btn-normal" key={idx} onClick={btn.event}>
                {btn.text}
            </Radio.Button>)
        }
    })

    return <Space style={{ marginTop: 15 }}>
        {primaryList}
        {normalList.length > 0 && normalList}
    </Space>
}

export default FuncList
