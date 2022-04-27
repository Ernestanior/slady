import {FC, useMemo} from "react";
import {IObserverForm} from "@/hoc/createObserverForm";
import useObserver from "@/hoc/useObserver";
import {Col, Input, InputNumber, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import SwitchP from "@/common/switch";
import Period from "@/pages/customer/service/component/period";
import moment from "moment";

const CDN:FC<IObserverForm> = ({data$, form}) => {
    const formData = useObserver(data$, {
        isModify: false,
        cdnServiceFlag: 1,
        probation: 1,
        probationStart: moment().format("YYYY/MM/DD"),
        probationPeriod: 15,
        type: "normal"
    })

    const startDate = useMemo(() => {
        return moment(formData.probationStart, "YYYY/MM/DD")
    }, [formData.probationStart])

    return <section className="cdn-block">
        <Row gutter={15}>
            <Col className="cdn-block-title" flex={1}>
                CDN套餐信息
            </Col>
            <Col>
                <FormItem noStyle name="cdnServiceFlag" initialValue={1}>
                    <SwitchP
                        trueValue={1}
                        falseValue={0}
                    />
                </FormItem>
            </Col>
        </Row>
        <Row gutter={15}>
            <FormItem noStyle hidden={!formData.cdnServiceFlag}>
                <FormItem span={12} label="客户状态" name='probation' initialValue={1}>
                    <SelectP data={customerStatus} />
                </FormItem>
                <FormItem  hidden={formData.probation === customerStatus[0].id} span={12} />
                <FormItem hidden={formData.probation !== customerStatus[0].id} span={12} label="试用期" name="probationPeriod" initialValue={15}>
                    <Period startDate={startDate} />
                </FormItem>
                <FormItem noStyle span={12} name="type" initialValue='normal'>
                    <SwitchP
                        disable={formData.isModify}
                        label="Managed CNAME"
                        trueValue="cname"
                        falseValue="normal"
                    />
                </FormItem>
                <FormItem
                    hidden={formData.type !== "normal"}
                    label="域名额度"
                    name="limitMasterDomains"
                    initialValue={5}
                    span={12}
                >
                    <InputNumber
                        onChange={e => {
                            form.setFieldsValue({
                                limitCerts: e
                            })
                        }}
                    />
                </FormItem>
                <FormItem
                    hidden={formData.type !== "cname"}
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
                    initialValue={0}
                    span={12}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    label="防御量"
                    name="limitDefence"
                    initialValue={20}
                    span={12}
                >
                    <SelectP data={defenceLimitList} />
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
                    hidden={formData.type !== "cname"}
                    label="mcn单个站点上传证书限制"
                    name="limitSiteCerts"
                    initialValue={1}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    hidden={formData.type !== "normal"}
                    span={12}
                    label="证书额度"
                    name="limitCerts"
                    initialValue={10}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    span={12}
                    hidden={formData.type !== "normal"}
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

export default CDN

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

// defence limit
const defenceLimitList = [
    {
        id: 0,
        name: "0GB"
    },
    {
        id: 10,
        name: "10GB"
    },
    {
        id: 20,
        name: "20GB"
    },
    {
        id: 30,
        name: "30GB"
    },
    {
        id: 40,
        name: "40GB"
    },
    {
        id: 50,
        name: "50GB"
    },
    {
        id: 100,
        name: "100GB"
    },
    {
        id: 200,
        name: "200GB"
    },
    {
        id: 300,
        name: "300GB"
    },
    {
        id: 400,
        name: "400GB"
    },
    {
        id: 500,
        name: "500GB"
    },
    {
        id: 1000,
        name: "1T"
    },
    {
        id: 2000,
        name: "2T"
    },
    {
        id: 3000,
        name: "3T"
    },
    {
        id: 4000,
        name: "4T"
    },
    {
        id: -1,
        name: "Unlimited"
    }
]
