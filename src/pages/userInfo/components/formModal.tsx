import {FC, useCallback, useEffect, useState} from "react";
import {Button, Form, Modal, Space} from "antd";
import {IEventModule, ISubmitAsyncModule, ITitleModule} from "@/common/interface";
import {from} from "rxjs";
import FormItem from "@/common/Form/formItem";
import {throttleTime} from "rxjs/operators";


const FormModal:FC<ITitleModule & ISubmitAsyncModule & IEventModule> = ({event$, submit, title, children}) => {
    const [visible, setVisible] = useState<boolean>();

    useEffect(() => {
        const sub = event$.pipe(throttleTime(50)).subscribe(res => {
            setVisible(res)
        })
        return () => sub.unsubscribe()
    }, [event$])

    const submitEvent = useCallback((data) => {
        from(submit(data)).subscribe(res => {
            if(res.isSuccess){
                setVisible(false)
            }
        })
    }, [submit])

    return <Modal
        title={title}
        visible={visible}
        footer={null}
        destroyOnClose
        zIndex={3000}
        onCancel={() => {
            setVisible(false)
        }}
        transitionName=""
    >
        <Form onFinish={submitEvent}>
            {children}
            <FormItem style={{marginTop: 20}}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        应用
                    </Button>
                    <Button onClick={() => setVisible(false)}>
                        取消
                    </Button>
                </Space>
            </FormItem>
        </Form>
    </Modal>
}

export default FormModal
