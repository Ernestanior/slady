import React, {FC, useEffect} from "react";
import {IObserverForm} from "@/hoc/createObserverForm";
import {Col, Input, Row, Select} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import useObserver from "@/hoc/useObserver";
import SwitchP from "@/common/switch";
import useDnsPlanList from "@/pages/customer/parts/useDnsPlanList";

const DNS:FC<IObserverForm> = ({data$, form}) => {
    const formData = useObserver(data$, {
        isModify: false,
        dnsServiceFlag: 0,
        //自定义NS
        customNSFlag: 0,
        //使用自定义节点IP
        customNodeFlag: 0,
        nsServers: []
    })

    const planList = useDnsPlanList();

    // 设置第一条
    useEffect(() => {
        if(Array.isArray(planList) && planList.length > 0){
            form.setFieldsValue({
                dedicatedPlanId: planList[0].id
            })
        }
    }, [planList, form])

    return <section className="cdn-block">
        <Row gutter={15}>
            <Col className="cdn-block-title" flex={1}>
                DNS套餐信息
            </Col>
            <Col>
                <FormItem noStyle name="dnsServiceFlag" initialValue={0}>
                    <SwitchP trueValue={1} falseValue={0} />
                </FormItem>
            </Col>
        </Row>
        <Row gutter={15}>
            <FormItem noStyle hidden={!formData.dnsServiceFlag}>
                <FormItem span={12} label="域名套餐" name="dedicatedPlanId">
                    <SelectP data={planList} />
                </FormItem>
                <FormItem hidden name="dedicatedPlanFlag" label="锁定域名套餐" initialValue={1}>
                    <Input />
                </FormItem>
                <FormItem span={12} label="域名套餐额度" name="limitDedicatedPlans" initialValue={5}>
                    <Input />
                </FormItem>
                <FormItem noStyle span={12} name="customNSFlag" initialValue={0}>
                    <SwitchP label="自定义NS" trueValue={1} falseValue={0} />
                </FormItem>
                <FormItem span={12} label="DNS服务器" name="nsServers">
                    <SelectP data={[]} />
                </FormItem>
                <FormItem span={24} label="自定义DNS服务器" hidden={false} name="customNsServer" initialValue={[]}>
                    <Select mode="tags" tokenSeparators={[" ", ",", ";"]} />
                </FormItem>
                <FormItem noStyle span={12} name="customNodeFlag" initialValue={0}>
                    <SwitchP marginTop={15} label="使用自定义节点IP" trueValue={1} falseValue={0} />
                </FormItem>
                <FormItem span={24} hidden={!formData.customNodeFlag} name="customNodeIps" initialValue={[]}>
                    <Select mode="tags" tokenSeparators={[" ", ",", ";"]} />
                </FormItem>
            </FormItem>
        </Row>
    </section>
}

export default DNS

export function loadDnsData(){

}