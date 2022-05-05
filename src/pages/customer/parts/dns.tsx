import React, {FC, useEffect, useMemo} from "react";
import {IObserverForm} from "@/hoc/createObserverForm";
import {Col, Input, Row, Select} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import useObserver from "@/hoc/useObserver";
import SwitchP from "@/common/switch";
import useDnsPlanList from "@/pages/customer/parts/useDnsPlanList";
import useDnsServerList from "@/pages/customer/parts/useDnsServerList";
import useCustomIPList from "@/pages/customer/parts/useCustomIPList";
import useUpdateRef from "@/hoc/useUpdateRef";

const customNS = {
    id: "custom",
    name: "自定义DNS服务器"
}

const DNS:FC<IObserverForm> = ({data$, form}) => {
    const formData = useObserver(data$, {
        isModify: false,
        dnsServiceFlag: 0,
        // 套餐
        dedicatedPlanId: -1,
        //自定义NS
        customNameServerFlag: 0,
        //使用自定义节点IP
        customDnsNodeFlag: 0,
        nameServerList: ""
    })

    const planList = useDnsPlanList();

    // 设置域名套餐自动选中第一条
    useEffect(() => {
        if(Array.isArray(planList) && planList.length > 0){
            form.setFieldsValue({
                dedicatedPlanId: planList[0].id
            })
        }
    }, [planList, form])

    // 域名套餐自动选中第一个DNS服务器
    const dnsServiceList = useDnsServerList(formData.dedicatedPlanId);
    useEffect(() => {
        if(Array.isArray(dnsServiceList) && dnsServiceList.length > 0){
            form.setFieldsValue({
                nameServerList: dnsServiceList[0].id
            })
        }
    }, [dnsServiceList, form])

    // 启用自定义NS功能后，添加自定义NS服务器的下拉选项
    const dnsServiceListMerge = useMemo(() => {
        if(formData.customNameServerFlag){
            return [...dnsServiceList, customNS]
        }
        return dnsServiceList;
    }, [dnsServiceList, formData.customNameServerFlag])

    // 当自定义NS功能, 需要检测当前选中的内容是否为自定义, 如果是自定义，则自动切换为dns server中第一个
    useEffect(() => {
        if(!formData.customNameServerFlag){
            if(dnsServiceList.length > 0){
                form.setFieldsValue({
                    nameServerList: dnsServiceList[0].id
                })
            }else{
                form.setFieldsValue({
                    nameServerList: ""
                })
            }
        }
    }, [formData.customNameServerFlag, dnsServiceList, form])

    // 自定义节点列表
    const customNodeList = useCustomIPList(formData.dedicatedPlanId);

    const customNameServerFlagRef = useUpdateRef(formData.customNameServerFlag)
    const nameServerListRef = useUpdateRef(formData.nameServerList);

    const isModifyRef = useUpdateRef(formData.isModify)
    // 如何判断自定义NS服务器
    useEffect(() => {
        if(isModifyRef.current){
            if(customNameServerFlagRef.current && nameServerListRef.current){
                // 编辑内容，如果开启了自定义NS，并且可选择列表中不存在NS，则认为NS是自定义的
                if(!dnsServiceList.find(server => server.id === nameServerListRef.current)){
                    form.setFieldsValue({
                        nameServerList: customNS.id,
                        customNameServerList: nameServerListRef.current.split(",")
                    })
                }
            }
        }
    }, [isModifyRef, customNameServerFlagRef, nameServerListRef, dnsServiceList, form])

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
                <FormItem noStyle span={12} name="customNameServerFlag" initialValue={0}>
                    <SwitchP marginTop={30} label="自定义NS" trueValue={1} falseValue={0} />
                </FormItem>
                <FormItem span={12} label="DNS服务器" name="nameServerList">
                    <SelectP data={dnsServiceListMerge} />
                </FormItem>
                <FormItem span={24} label="自定义DNS服务器" hidden={formData.nameServerList !== customNS.id} name="customNameServerList" initialValue={[]}>
                    <Select mode="tags" tokenSeparators={[" ", ",", ";"]} />
                </FormItem>
                <FormItem noStyle span={12} name="customDnsNodeFlag" initialValue={0}>
                    <SwitchP marginTop={30} label="使用自定义节点IP" trueValue={1} falseValue={0} />
                </FormItem>
                <FormItem span={24} hidden={!formData.customDnsNodeFlag} label="自定义节点IP" name="customDnsNodeList" initialValue={[]}>
                    <SelectP mode="multiple" data={customNodeList} />
                </FormItem>
            </FormItem>
        </Row>
    </section>
}

export default DNS

export function setDnsData(data: any){
    if(data.dnsServiceFlag === 1){
        // 开启NS自定义功能
        if(data.customNameServerFlag){
            // DNS服务器选择自定义
            if(data.nameServerList === customNS.id){
                data.nameServerList = data.customNameServerList;
            }else{
                // 拆分字符串
                if(data.nameServerList){
                    data.nameServerList = data.nameServerList.split(",")
                }else{
                    data.nameServerList = []
                }
            }
        }
        delete data.customNameServerList
    }
    return data
}