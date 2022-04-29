import {FC, useEffect, useState} from "react";
import {IEventModule} from "@/common/interface";
import {throttleTime} from "rxjs/operators";
import {Modal} from "antd";
import FAForm from "@/pages/userInfo/2FA/FAForm";
import useAccountInfo from "@/store/account";

const FA2Module:FC<IEventModule> = ({event$}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const info = useAccountInfo()
    useEffect(() => {
        const sub = event$.pipe(throttleTime(50)).subscribe(res => {
            setVisible(res)
            // 加载数据
            if(res){
                if(info){
                    FAForm.loadData({
                        authFlag: info.authFlag
                    })
                }
            }
        })
        return () => sub.unsubscribe()
    }, [event$, info])

    return <Modal
        title="二次验证功能设置"
        footer={null}
        visible={visible}
        width={900}
        destroyOnClose
        maskClosable={false}
        transitionName=""
        onCancel={() => {
            setVisible(false)
        }}
    >
        <div>
            <FAForm.UI cb={() => setVisible(false)}/>
        </div>
    </Modal>
}

export default FA2Module