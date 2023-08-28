import {FC, ReactNode} from "react";
import {IBatchEvent, IBatchEventListModule} from "@/common/interface";
import useRoleFilter from "@/hooks/utils/useRoleFilter";
import {Button, Space, Radio} from "antd";
import {useTranslation} from "react-i18next";

/**
 * 功能列表
 * @param event
 * @constructor
 */
const FuncList:FC<IBatchEventListModule> = ({batchEvent,selectItems}) => {
    const {t}=useTranslation()
    const _batchFuncList = useRoleFilter(batchEvent);
    if(_batchFuncList.length < 1){
        return null;
    }

    // primary按钮
    const primaryList:ReactNode[] = [];
    const normalList:ReactNode[] = [];

    _batchFuncList.forEach((btn:IBatchEvent, idx) => {
        // primary
        if(btn.primary){
            primaryList.push(<Button style={{marginRight:15}} type="primary" key={idx} onClick={()=>btn.event(selectItems)} disabled={selectItems && !selectItems.length}>
                {t(btn.text)}
            </Button>)
        }else{
            normalList.push(<Radio.Button style={{marginRight:15}} className="btn-normal" key={idx} onClick={()=>btn.event(selectItems)} disabled={selectItems && !selectItems.length}>
                {t(btn.text)}
            </Radio.Button>)
        }
    })
    return <Space style={{ marginTop: 15 }}>
        {primaryList}
        {normalList.length > 0 && normalList}
    </Space>
}

export default FuncList
