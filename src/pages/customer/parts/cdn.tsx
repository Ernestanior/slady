import {FC, useMemo} from "react";
import {IObserverForm} from "@/hoc/createObserverForm";
import useObserver from "@/hoc/useObserver";
import {Col, Input, InputNumber, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import SwitchP from "@/common/switch";
import isMobile from "@/app/isMobile";

const CDN:FC<IObserverForm> = ({data$, form}) => {
    const formData = useObserver(data$, {
        isModify: false,
        cdnServiceFlag: 1,
        type: "normal"
    })
    const span = useMemo(()=>isMobile?24:12,[])

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
                <FormItem noStyle span={span} name="type" initialValue='normal'>
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
                    span={span}
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
                    span={span}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    label="带宽额度(MBPS)"
                    name="limitBandwidth"
                    initialValue={10}
                    span={span}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    label="端口转发额度"
                    name="limitPorts"
                    initialValue={0}
                    span={span}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    label="防御量"
                    name="limitDefence"
                    initialValue={20}
                    span={span}
                >
                    <SelectP data={defenceLimitList} />
                </FormItem>
                <FormItem noStyle span={span} name="mainlandOpt" initialValue={1}>
                    <SwitchP
                        label="大陆地区优化"
                        trueValue={1}
                        falseValue={0}
                    />
                </FormItem>
                <FormItem
                    span={span}
                    hidden={formData.type !== "cname"}
                    label="mcn单个站点上传证书限制"
                    name="limitSiteCerts"
                    initialValue={1}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    hidden={formData.type !== "normal"}
                    span={span}
                    label="证书额度"
                    name="limitCerts"
                    initialValue={10}
                >
                    <InputNumber />
                </FormItem>
                <FormItem
                    span={span}
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
