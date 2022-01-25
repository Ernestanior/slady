import React, {FC, useState} from "react";
import {Col, Input, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SwitchP from "@/common/switch";
import AsyncSelect from "@/common/async/select";
import {dnsPlanService} from "@/store/apis/dns";
import DNSServer from "@/pages/customer/service/dnsServer";
import FormStringList from "@/common/customFormComponent/formList";
import {IFormModule} from "@/common/interface";
import {queryValue} from "@/common/utils";

const DnsService:FC<IFormModule> = ({form, initialValue}) => {
    const [dnsServiceFlag, setDnsServiceFlag] = useState(queryValue(initialValue.dnsServiceFlag, 0))
    const [dedicatedPlanFlag, setDedicatedPlanFlag] = useState( queryValue(initialValue.dedicatedPlanFlag, 1))
    const [customNodeFlag, setCustomNodeFlag] = useState(queryValue(initialValue.customNodeFlag, 0))
    
    return <section className="cdn-block">
        <Row gutter={15}>
            <Col className={`cdn-block-title ${dnsServiceFlag !== 1 ? "without-bottom": ""}`} flex={1}>
                DNS套餐信息
            </Col>
            <Col>
                <FormItem noStyle name="dnsServiceFlag" initialValue={dnsServiceFlag}>
                    <SwitchP
                        trueValue={1}
                        falseValue={0}
                        onChange={e => {
                            setDnsServiceFlag(e)
                        }}
                    />
                </FormItem>
            </Col>
        </Row>
        <Row gutter={15}>
            <FormItem noStyle hidden={!dnsServiceFlag}>
                <FormItem hidden={!dedicatedPlanFlag} span={12} label="域名套餐" name="dedicatedPlanId">
                    <AsyncSelect
                        query={queryPlanList}
                        loader={planLoader}
                        loadTrigger={data => {
                            form.setFieldsValue({
                                dedicatedPlanId: data[0].id
                            })
                        }}
                    />
                </FormItem>
                <FormItem noStyle span={12} name="dedicatedPlanFlag" initialValue={1}>
                    <SwitchP marginTop={!dedicatedPlanFlag ? 1 : undefined} label="锁定域名套餐" trueValue={1} falseValue={0} onChange={setDedicatedPlanFlag} />
                </FormItem>
                <FormItem hidden={!dedicatedPlanFlag} span={12} label="域名套餐额度" name="limitDedicatedPlans" initialValue={5}>
                    <Input />
                </FormItem>
                <FormItem span={24} noStyle name="customNameServersConfig" initialValue={{customNameServerFlag: 0, customNameServers: [""]}}>
                    <DNSServer />
                </FormItem>
                <FormItem noStyle span={12} name="customNodeFlag" initialValue={0}>
                    <SwitchP marginTop={15} label="使用自定义节点IP" trueValue={1} falseValue={0} onChange={setCustomNodeFlag} />
                </FormItem>
                <FormItem span={24} hidden={!customNodeFlag} name="customNodeIps" initialValue={[""]}>
                    <FormStringList
                        text="自定义节点IP"
                    />
                </FormItem>
            </FormItem>
        </Row>
    </section>
}

export default DnsService


const queryPlanList = () => {
    return dnsPlanService.FindPlan({}, {
        keyWord: "",
        searchPage: {
            page: 1,
            pageSize: 999,
            desc: 1,
            sort: ""
        }
    })
}

const planLoader = ({content}: any) => {
    return content.map((item: any) => ({
        id: item.id,
        name: item.type||"-"
    }))
}
