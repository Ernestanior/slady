import {FC} from "react";
import {ITrigger} from "@/common/interface";
import {Button, Space} from "antd";

interface IProps{
    submit: ITrigger;
    cancel: ITrigger;
    visible: boolean;
}

const SubmitModuleUI:FC<IProps> = ({submit, cancel, visible}) => {
    if(!visible){
        return null
    }
    return <div style={{marginTop: 20}}>
        <Space>
            <Button type="primary" onClick={submit}>
                应用
            </Button>
            <Button onClick={cancel}>
                取消
            </Button>
        </Space>
    </div>
}

export default SubmitModuleUI
