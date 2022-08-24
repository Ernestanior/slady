import {FC, useEffect, useState} from "react";
import {Button, Row} from "antd";
import {Popup} from "antd-mobile";
import useMessage from "@/store/message";
import './index.less'

const PopupX:FC = () => {
    const msg = useMessage()
    const [value,setValue] = useState<any>()
    const [visible,setVisible]=useState<boolean>(false)

    useEffect(()=>{
        if(msg && msg.type==="popup"){
            setValue(msg.value)
            setVisible(true)
        }
    },[msg])

    // const defaultCancel = () => setVisible(false)


    return <Popup
            visible={visible}
            onMaskClick={()=>setVisible(false)}
            position='left'
            bodyStyle={{ width: '90vw',padding:30 }}
            className='popup-x'
        >
            <section className="header">
                <h2>查看</h2>
                <Button onClick={() =>setVisible(false)}>返回</Button>
            </section>
            <section className="body">
                {value && value.arrayData && value.arrayData.map((item:any)=>
                    <Row key={item} style={{fontSize:16,marginBottom:5}}>
                        {item}
                    </Row>
                )}
                {value && value.objData && Object.keys(value.objData).map((item:any)=>
                    <Row key={item} style={{fontSize:16,marginBottom:5}}>
                        {item}:{value[item]}
                    </Row>
                )}
                <section className="node">
                    {value && value.node }
                </section>
            </section>

        </Popup>
}

export default PopupX;
