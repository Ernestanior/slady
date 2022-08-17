import {FC, useMemo} from "react";
import {IObserverForm} from "@/hoc/createObserverForm";
import {Input, InputNumber, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import {E_L_CUSTOMER_TYPE, E_L_USER_TYPE} from "@/common/const";
import SelectP from "@/common/select";
import AgentList from "@/pages/sale/agentList";
import useObserver from "@/hoc/useObserver";
import Period from "@/pages/customer/service/component/period";
import moment from "moment";
import isMobile from "@/app/isMobile";

const Account:FC<IObserverForm> = ({data$}) => {
    const formData = useObserver(data$, {
        isModify: false,
        customerType: E_L_USER_TYPE[0].id,
        saleId: 0,
        probation: 1,
        probationStart: moment().format("YYYY/MM/DD"),
        probationPeriod: 15
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

    const startDate = useMemo(() => {
        return moment(formData.probationStart, "YYYY/MM/DD")
    }, [formData.probationStart])

    const span = useMemo(()=>isMobile?24:12,[])
    return <section className="cdn-block">
        <p>用户信息</p>
        <Row gutter={15}>
            <FormItem span={span} label="客户名称" name="name">
                <Input />
            </FormItem>
            <FormItem span={span} label="登陆邮箱" name="email">
                <Input />
            </FormItem>
            <FormItem span={span} label="客户类型" name="customerType" initialValue={E_L_USER_TYPE[0].id}>
                <SelectP disabled={disableCustomerType} data={customerTypeList} />
            </FormItem>
            {isMobile?"":<FormItem hidden={formData.customerType === E_L_USER_TYPE[1].id} span={span} />}
            <FormItem hidden={formData.customerType !== E_L_USER_TYPE[1].id} span={span} label="选择代理" name="agentId">
                <AgentList saleId={formData.saleId} />
            </FormItem>
            <FormItem noStyle hidden={formData.customerType === E_L_USER_TYPE[2].id}>
                <FormItem span={span} label="客户状态" name='probation' initialValue={1}>
                    <SelectP data={customerStatus} />
                </FormItem>
                {isMobile?"":<FormItem  hidden={formData.probation === customerStatus[0].id} span={span} />}
                <FormItem hidden={formData.probation !== customerStatus[0].id} span={span} label="试用期" name="probationPeriod" initialValue={15}>
                    <Period startDate={startDate} />
                </FormItem>
            </FormItem>
            <FormItem hidden={formData.customerType === E_L_USER_TYPE[2].id} span={span} label="可使用API数" name="limitTokens" initialValue={1}>
                <InputNumber />
            </FormItem>
            <FormItem hidden={formData.customerType === E_L_USER_TYPE[2].id} span={span} label="可添加子账号" name="limitSubAccounts" initialValue={3}>
                <InputNumber />
            </FormItem>
            <FormItem hidden span={span} label="DNS Value" name="dnsValue">
                <Input />
            </FormItem>
            <FormItem hidden name="id" initialValue={0}>
                <Input />
            </FormItem>
        </Row>
    </section>
}

export default Account



const customerStatus = [
    {
        id: 1,
        name: '试用'
    },
    {
        id: 0,
        name: '正式'
    }
]