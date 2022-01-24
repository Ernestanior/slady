import {FC, useState} from "react";
import {Input, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import {E_L_CUSTOMER_TYPE} from "@/common/const";

const Account:FC = () => {
    const [type, setType] = useState(E_L_CUSTOMER_TYPE[0].id)
    return <section className="cdn-block">
        <p>用户信息</p>
        <Row gutter={15}>
            <FormItem span={12} label="客户名称" name="name">
                <Input />
            </FormItem>
            <FormItem span={12} label="登陆邮箱" name="email">
                <Input />
            </FormItem>
            <FormItem span={12} label="客户类型" name="customerType" initialValue={E_L_CUSTOMER_TYPE[0].id}>
                <SelectP
                    data={E_L_CUSTOMER_TYPE}
                    onChange={e => {
                        setType(e)
                    }}
                />
            </FormItem>
            <FormItem hidden={type === E_L_CUSTOMER_TYPE[0].id} span={12} label="选择代理" name="agentId">
                <Input />
            </FormItem>
        </Row>
    </section>
}

export default Account;