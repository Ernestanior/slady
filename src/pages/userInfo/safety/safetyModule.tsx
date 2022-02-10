import {FC, useEffect, useState} from "react";
import {IEventModule} from "@/common/interface";
import {throttleTime} from "rxjs/operators";
import {Divider, Modal} from "antd";
import ModifyLogoutTime from "@/pages/userInfo/safety/modifyLogoutTime";
import LoginWhiteIP from "@/pages/userInfo/safety/loginWhiteIP";

const SafetyModule:FC<IEventModule> = ({event$}) => {
    const [visible, setVisible] = useState<boolean>(false)
    useEffect(() => {
        const sub = event$.pipe(throttleTime(50)).subscribe(res => {
            setVisible(res)
        })
        return () => sub.unsubscribe()
    }, [event$])

    return <Modal
        title="安全"
        footer={null}
        visible={visible}
        width={900}
        destroyOnClose
        onCancel={() => {
            setVisible(false)
        }}
        transitionName=""
    >
        <ModifyLogoutTime />
        <Divider />
        <LoginWhiteIP />
    </Modal>
}

export default SafetyModule
