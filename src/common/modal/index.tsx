import React, {FC, useEffect, useState} from "react"
import {Modal} from "antd";
import useMessage from "@/store/message";
import {useTranslation} from "react-i18next";

const ModalX:FC = () => {
    const msg = useMessage()
    const [value,setValue] = useState<any>()
    const {t}=useTranslation()
    useEffect(()=>{
        if(msg && msg.type==="modal"){
            setValue(msg.value)
            setVisible(true)
        }
    },[msg])
    const [visible,setVisible]=useState<boolean>(false)

    const defaultCancel = () => setVisible(false)

    const onOk = ()=>{
        value.onOk && value.onOk()
        defaultCancel()
    }

    return value? <Modal
        title={<div style={{color:'#fff',fontWeight:550}}>{value.title}</div>}
            visible={visible}
            onCancel={value.onCancel || defaultCancel}
            onOk={onOk}
            okText={value.okText || t('CONFIRM')}
            cancelText={value.cancelText || t('CANCEL')}
            zIndex={7000}
            width={value.width || 600}
        >
            <div style={{display:"flex",alignItems:"center",paddingLeft:10}}>
                {value.content}
            </div>
        </Modal>:<></>
}

export default ModalX;
