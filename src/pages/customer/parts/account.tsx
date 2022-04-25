import {FC} from "react";
import {IObserverForm} from "@/hoc/createObserverForm";
import {Input, InputNumber, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import {E_L_CUSTOMER_TYPE, E_L_USER_TYPE} from "@/common/const";
import SelectP from "@/common/select";
import AgentList from "@/pages/sale/agentList";
import useObserver from "@/hoc/useObserver";

const Account:FC<IObserverForm> = ({data$}) => {
    const formData = useObserver(data$, {
        isModify: false,
        customerType: E_L_USER_TYPE[0].id,
        saleId: 0
    })

    // 修改代理不可修改类型
    let disableCustomerType = false
    if(formData.customerType === E_L_USER_TYPE[2].id){
        disableCustomerType = formData.isModify
    }

    // 修改客户时，客户类型只有两个选项，不可修改为代理
    let customerTypeList = E_L_USER_TYPE;
    if(formData.isModify){
        if(formData.customerType !== E_L_USER_TYPE[2].id){
            customerTypeList = E_L_CUSTOMER_TYPE
        }
    }

    return <section className="cdn-block">
        <p>用户信息</p>
        <Row gutter={15}>
            <FormItem span={12} label="客户名称" name="name">
                <Input />
            </FormItem>
            <FormItem span={12} label="登陆邮箱" name="email">
                <Input />
            </FormItem>
            <FormItem span={12} label="客户类型" name="customerType" initialValue={E_L_USER_TYPE[0].id}>
                <SelectP disabled={disableCustomerType} data={customerTypeList} />
            </FormItem>
            <FormItem hidden={formData.customerType !== E_L_USER_TYPE[1].id} span={12} label="选择代理" name="agentId">
                <AgentList saleId={formData.saleId} />
            </FormItem>
            <FormItem hidden={formData.customerType === E_L_USER_TYPE[2].id} span={12} label="可使用API数" name="limitTokens" initialValue={1}>
                <InputNumber />
            </FormItem>
            <FormItem hidden={formData.customerType === E_L_USER_TYPE[2].id} span={12} label="可添加子账号" name="limitSubAccounts" initialValue={3}>
                <InputNumber />
            </FormItem>
            <FormItem hidden span={12} label="DNS Value" name="dnsValue">
                <Input />
            </FormItem>
        </Row>
    </section>
}

export default Account