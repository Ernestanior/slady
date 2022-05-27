import {FC, useCallback, useEffect, useState} from "react";
import {Subject} from "rxjs";
import {Modal} from "antd";

interface IModalView<T>{
    loadData: (data: T) => void;
    UI: FC
}

interface InitialModalConfig{
    initVisible?: boolean;
    title: string;
    width?: number;
}

export type OptionalType<T> = {
    [key in keyof T]?: T[key]
}

function createModal <T>(ModalDetail:FC<OptionalType<T>>, config: InitialModalConfig){
    const event$ = new Subject<T>();

    const ModalRT:FC = () => {
        const [visible, setVisible] = useState(!!config.initVisible);
        const [data, setData] = useState<T|null>(null);

        useEffect(() => {
            const sub = event$.subscribe(newData => {
                setVisible(true);
                setData(newData)
            })
            return () => sub.unsubscribe()
        }, [])

        const closeEvent = useCallback(() => {
            setVisible(false)
            setData(null)
        }, [])

        return <Modal
            maskClosable={false}
            footer={null}
            transitionName=""
            {...config}
            title={config.title}
            visible={visible}
            onCancel={closeEvent}
        >
            <ModalDetail {...data}/>
        </Modal>
    }

    return {
        UI: ModalRT,
        loadData(data){
            event$.next(data)
        }
    } as IModalView<T>
}

export default createModal