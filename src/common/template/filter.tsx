import {FC, useCallback} from "react";
import {Button, Col, Form, Row, Space} from "antd";
import {useForm} from "antd/es/form/Form";
import {ISubmitModule} from "@/common/interface";
import useSubmitEvent from "@/hooks/utils/useSubmitEvent";
import {trimAndRemoveUndefined} from "@/common/utils";

const Filter:FC<ISubmitModule> = ({submit, children}) => {

    const [form] = useForm();

    const submitEvent = useCallback(() => {
        const values = form.getFieldsValue();
        // 对所有属性进行trim
        submit && submit(trimAndRemoveUndefined(values))
    }, [form, submit])

    const submitTrigger = useSubmitEvent(submitEvent)

    return <Form form={form}>
        <Row gutter={[15, 15]}>
            {children}
            <Col span={3}>
                <Space>
                    <Button type="primary" onClick={submitTrigger}>
                        搜索
                    </Button>
                    <Button onClick={() => { form.resetFields(); }}>
                        重置
                    </Button>
                </Space>
            </Col>
        </Row>
    </Form>
}

export default Filter;
