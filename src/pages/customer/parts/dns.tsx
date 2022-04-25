import React, {FC, useEffect} from "react";
import {IObserverForm} from "@/hoc/createObserverForm";
import {Col, Input, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import useObserver from "@/hoc/useObserver";
import SwitchP from "@/common/switch";
import useDnsPlanList from "@/pages/customer/parts/useDnsPlanList";

const DNS:FC<IObserverForm> = ({data$, form}) => {
    const formData = useObserver(data$, {
        isModify: false,
        dnsServiceFlag: 0,
        dedicatedPlanFlag: 1,
        customNodeFlag: 0
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
                <FormItem hidden={!formData.dedicatedPlanFlag} span={12} label="域名套餐" name="dedicatedPlanId">
                    <SelectP data={planList} />
                </FormItem>
                <FormItem noStyle span={12} name="dedicatedPlanFlag" initialValue={1}>
                    <SwitchP marginTop={!formData.dedicatedPlanFlag ? 1 : undefined} label="锁定域名套餐" trueValue={1} falseValue={0} />
                </FormItem>
                <FormItem hidden={!formData.dedicatedPlanFlag} span={12} label="域名套餐额度" name="limitDedicatedPlans" initialValue={5}>
                    <Input />
                </FormItem>
                <FormItem noStyle span={12} name="customNodeFlag" initialValue={0}>
                    <SwitchP marginTop={15} label="使用自定义节点IP" trueValue={1} falseValue={0} />
                </FormItem>
                <FormItem span={24} hidden={!formData.customNodeFlag} name="customNodeIps" initialValue={[]}>
                    <SelectP mode="tags" data={[]} />
                </FormItem>
            </FormItem>
        </Row>
    </section>
}

export default DNS