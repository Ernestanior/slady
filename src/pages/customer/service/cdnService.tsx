import {FC, useCallback, useState} from "react";
import {Col, Input, InputNumber, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SwitchP from "@/common/switch";
import SelectP from "@/common/select";
import Period from "@/pages/customer/service/component/period";
import {IDisableModule, IFormModule} from "@/common/interface";
import {queryValue} from "@/common/utils";
import moment from "moment";

interface IProps{
    initialSwitch?: 1 | 0
}

const CdnService:FC<IProps & IFormModule & IDisableModule> = ({initialSwitch, initialValue={}, form, disableProperty}) => {
    // cdn服务开关
    const defaultInitCdnServiceFlag = queryValue(initialSwitch, 0);
    const [cdnServiceFlag, setCdnServiceFlag] = useState(queryValue(initialValue.cdnServiceFlag, defaultInitCdnServiceFlag));
    // 正式 or 测试
    const [probation, setProbation] = useState(queryValue(initialValue.probation, customerStatus[0].id))
    // cdn 客户类型，normal， cname
    const [type, setType] = useState(queryValue(initialValue.type, "normal"))

    //添加域名和证书额度的联动
    const changeDomain = useCallback((domainCount) => {
        if(domainCount){
            form.setFieldsValue({
                limitCerts: domainCount
            })
        }
    }, [form])

    return <section className="cdn-block">
        <Row gutter={15}>
            <Col className={`cdn-block-title ${cdnServiceFlag !== 1 ? "without-bottom": ""}`} flex={1}>
                CDN套餐信息
            </Col>
            <Col>
                <FormItem noStyle name="cdnServiceFlag" initialValue={cdnServiceFlag}>
                    <SwitchP
                        trueValue={1}
                        falseValue={0}
                        onChange={e => {
                            setCdnServiceFlag(e)
                        }}
                    />
                </FormItem>
            </Col>
        </Row>
        <Row gutter={15}>
            <FormItem noStyle hidden={!cdnServiceFlag}>
                <FormItem span={12} label="客户状态" name='probation' initialValue={probation}>
                    <SelectP data={customerStatus} onChange={e => { setProbation(e) }}/>
                </FormItem>
                <FormItem hidden={probation !== customerStatus[0].id} span={12} label="试用期" name="probationPeriod" initialValue={15}>
                    <Period
                        start={queryValue(initialValue.probationStart, moment().format('YYYY/MM/DD'))}
                        end={queryValue(initialValue.probationEnd, moment().add(15, "day").format('YYYY/MM/DD'))}
                    />
                </FormItem>
                <FormItem noStyle span={12} name="type" initialValue='normal'>
                    <SwitchP
                        disable={!!disableProperty && disableProperty.type}
                        label="Managed CNAME"
                        trueValue="cname"
                        falseValue="normal"
                        onChange={e => {
                            setType(e)
                        }}
                    />
                </FormItem>
                <FormItem
                    hidden={type !== "normal"}
                    label="域名额度"
                    name="limitMasterDomains"
                    initialValue={5}
                    span={12}
                >
                    <InputNumber
                        onChange={e => {
                            changeDomain(e)
                        }}
                    />
                </FormItem>
                <FormItem
                    hidden={type !== "cname"}
                    label="可添加站点数"
                    name="limitCnames"
                    initialValue={1}
                    span={12}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    label="带宽额度(MBPS)"
                    name="limitBandwidth"
                    initialValue={10}
                    span={12}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    label="端口转发额度"
                    name="limitPorts"
                    initialValue={1}
                    span={12}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    label="防御量(GB)"
                    name="limitDefence"
                    initialValue={20}
                    span={12}
                >
                    <InputNumber />
                </FormItem>
                <FormItem noStyle span={12} name="mainlandOpt" initialValue={1}>
                    <SwitchP
                        label="大陆地区优化"
                        trueValue={1}
                        falseValue={0}
                    />
                </FormItem>
                <FormItem
                    span={12}
                    hidden={type !== "cname"}
                    label="mcn单个站点上传证书限制"
                    name="limitSiteCerts"
                    initialValue={1}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    hidden={type !== "normal"}
                    span={12}
                    label="证书额度"
                    name="limitCerts"
                    initialValue={10}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    span={12}
                    label="自定义端口额度"
                    name="limitCustomPorts"
                    initialValue={5}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    label="运营商选择"
                    name="certSupplier"
                    initialValue="letsencrypt"
                    hidden
                >
                    <Input />
                </FormItem>
                <FormItem hidden label="DNS类型" name="dnsType" initialValue={"Y"}>
                    <Input />
                </FormItem>
            </FormItem>
        </Row>
    </section>
}

export default CdnService

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
