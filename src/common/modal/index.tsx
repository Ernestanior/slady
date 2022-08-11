import React, {FC, useEffect, useState} from "react"
import "./index.less";
import useMessage from "@/store/message";
import {Modal} from "antd";

const ModalX:FC = () => {
    const msg = useMessage()
    const [value,setValue] = useState<any>()
    useEffect(()=>{
        if(msg && msg.type==="modal"){
            setValue(msg.value)
            setVisible(true)
        }
    },[msg])
    const [visible,setVisible]=useState<boolean>(false)

    const defaultCancel = () => setVisible(false)

    const onOk = ()=>{
        value.onOk()
        defaultCancel()
    }

    return value? <Modal
            title={value.title}
            visible={visible}
            onCancel={value.onCancel || defaultCancel}
            onOk={onOk}
            okText={value.okText || '确定'}
            cancelText={value.cancelText || '取消'}
            zIndex={7000}
        >
            <div className="comp-global-dialog">
                {value.content}
            </div>
        </Modal>:<></>

}

export default ModalX;
