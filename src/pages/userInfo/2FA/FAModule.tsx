import {FC, useCallback, useEffect, useState} from "react";
import {IEventModule} from "@/common/interface";
import {throttleTime} from "rxjs/operators";
import {Modal} from "antd";
import Footer from "@/common/Form/footer";

const FA2Module:FC<IEventModule> = ({event$}) => {
    const [visible, setVisible] = useState<boolean>(false)
    useEffect(() => {
        const sub = event$.pipe(throttleTime(50)).subscribe(res => {
            setVisible(res)
        })
        return () => sub.unsubscribe()
    }, [event$])

    // save auth config
    const saveFA = useCallback(() => {
        setVisible(false)
    }, [])

    return <Modal
        title="二次验证功能设置"
        footer={null}
        visible={visible}
        width={900}
        destroyOnClose
        onCancel={() => {
            setVisible(false)
        }}
        maskClosable={false}
        transitionName=""
    >
        <div>
            <Footer marginBottom={30} submit={saveFA} cancel={() => {setVisible(false)}} />
        </div>
    </Modal>
}

export default FA2Module