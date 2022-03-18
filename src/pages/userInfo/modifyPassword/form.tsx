import {FC} from "react";
import FormItem from "@/common/Form/formItem";
import {Col, Input, Row} from "antd";

const MdyPwdForm:FC = () => {
    return <>
        <Row gutter={[15, 15]}>
            <Col span={8}>
                旧密码
            </Col>
            <Col span={16}>
                <FormItem noStyle name="oldPwd">
                    <Input />
                </FormItem>
            </Col>
            <Col span={8}>
                新密码
            </Col>
            <Col span={16}>
                <FormItem noStyle name="newPwd">
                    <Input />
                </FormItem>
            </Col>
            <Col span={8}>
                确认密码
            </Col>
            <Col span={16}>
                <FormItem required noStyle name="confirmPwd">
                    <Input />
                </FormItem>
            </Col>
        </Row>
    </>
}

export default MdyPwdForm
