import {FC, useCallback, useState} from "react";
import {Input, InputNumber, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import {E_L_CUSTOMER_TYPE, E_L_USER_TYPE} from "@/common/const";
import {IAsyncEventModule} from "@/common/interface";
import AgentList from "@/pages/sale/agentList";
import useSubscribe from "@/common/event/useSubscribe";

interface IProps{
    isModify?: boolean
}

const Account:FC<IAsyncEventModule & IProps> = ({event$, isModify}) => {
    const [saleId, setSaleId] = useState<number>()

    const [type, setType] = useState(E_L_USER_TYPE[0].id)

    const setAccountType = useCallback((data) => {
        setType(data.customerType || E_L_USER_TYPE[0].id)
        setSaleId(data.saleId)
    }, [])

    useSubscribe(setAccountType, event$)

    let customerTypeList = E_L_USER_TYPE;
    if(isModify){
        if(type !== E_L_USER_TYPE[2].id){
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
                <SelectP disabled={isModify && type === E_L_USER_TYPE[2].id} data={customerTypeList} />
            </FormItem>
            <FormItem hidden={type !== E_L_USER_TYPE[1].id} span={12} label="选择代理" name="agentId">
                <AgentList saleId={saleId} />
            </FormItem>
            <FormItem hidden={type === E_L_USER_TYPE[2].id} span={12} label="可使用API数" name="limitTokens" initialValue={1}>
                <InputNumber />
            </FormItem>
            <FormItem hidden={type === E_L_USER_TYPE[2].id} span={12} label="可添加子账号" name="limitSubAccounts" initialValue={3}>
                <InputNumber />
            </FormItem>
            <FormItem hidden={type !== E_L_USER_TYPE[2].id} span={12} label="DNS Value" name="dnsValue">
                <Input />
            </FormItem>
            {
                !isModify && <FormItem hidden name="password" initialValue="abcd1234">
                    <Input autoComplete="current-password" />
                </FormItem>
            }
        </Row>
    </section>
}

export default Account;
