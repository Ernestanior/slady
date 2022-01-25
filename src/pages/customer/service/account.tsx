import {FC, useState} from "react";
import {Input, InputNumber, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import {E_L_CUSTOMER_TYPE} from "@/common/const";
import {IFormModule} from "@/common/interface";

const Account:FC<IFormModule> = ({form, initialValue={}}) => {
    const [type, setType] = useState(initialValue.customerSaleType || E_L_CUSTOMER_TYPE[0].id)
    return <section className="cdn-block">
        <p>用户信息</p>
        <Row gutter={15}>
            <FormItem span={12} label="客户名称" name="name">
                <Input />
            </FormItem>
            <FormItem span={12} label="登陆邮箱" name="email">
                <Input />
            </FormItem>
            <FormItem span={12} label="客户类型" name="customerSaleType" initialValue={E_L_CUSTOMER_TYPE[0].id}>
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
            <FormItem span={12} label="可使用API数" name="limitTokens" initialValue={3}>
                <InputNumber />
            </FormItem>
            <FormItem span={12} label="可添加子账号" name="limitSubAccounts" initialValue={3}>
                <InputNumber />
            </FormItem>
            <FormItem hidden name="password" initialValue="abcd1234">
                <Input autoComplete="current-password" />
            </FormItem>
        </Row>
    </section>
}

export default Account;
