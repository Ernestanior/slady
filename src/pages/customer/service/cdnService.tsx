import {FC, useCallback, useState} from "react";
import {Col, Input, InputNumber, Row} from "antd";
import FormItem from "@/common/Form/formItem";
import SwitchP from "@/common/switch";
import SelectP from "@/common/select";
import Period from "@/pages/customer/service/component/period";
import {IAsyncEventModule, IDisableModule} from "@/common/interface";
import {queryValue} from "@/common/utils";
import moment from "moment";
import useSubscribe from "@/common/event/useSubscribe";

interface IProps{
    initialSwitch?: 1 | 0
}

const CdnService:FC<IProps & IAsyncEventModule & IDisableModule> = ({initialSwitch,  event$, disableProperty}) => {
    // cdn服务开关
    const defaultInitCdnServiceFlag = queryValue(initialSwitch, 0);
    const [cdnServiceFlag, setCdnServiceFlag] = useState(defaultInitCdnServiceFlag);
    // 正式 or 测试
    const [probation, setProbation] = useState(customerStatus[0].id)
    // cdn 客户类型，normal， cname
    const [type, setType] = useState("normal");

    // 开始时间
    const [startDate, setStartDate] = useState(moment().format("YYYY/MM/DD"));

    // 结束时间
    const [endDate, setEndDate] = useState(moment().add(15, "day").format("YYYY/MM/DD"))

    // 表单变动，重载其他值
    const setAsyncData = useCallback((data) => {
        setCdnServiceFlag(queryValue(data.cdnServiceFlag, defaultInitCdnServiceFlag))
        setProbation(queryValue(data.probation, customerStatus[0].id))
        setType(data.type || "normal")
        setStartDate(queryValue(data.probationStart, moment().format("YYYY/MM/DD")))
        if(typeof data.probationPeriod !== "undefined"){
            setEndDate(moment(data.probationStart).add(data.probationPeriod, "day").format("YYYY/MM/DD"))
        }
    }, [defaultInitCdnServiceFlag])

    const init = useSubscribe(setAsyncData, event$)

    if(!init){
        return null;
    }

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
                    />
                </FormItem>
            </Col>
        </Row>
        <Row gutter={15}>
            <FormItem noStyle hidden={!cdnServiceFlag}>
                <FormItem span={12} label="客户状态" name='probation' initialValue={probation}>
                    <SelectP data={customerStatus} />
                </FormItem>
                <FormItem hidden={probation !== customerStatus[0].id} span={12} label="试用期" name="probationPeriod" initialValue={15}>
                    <Period
                        start={startDate}
                        end={endDate}
                    />
                </FormItem>
                <FormItem noStyle span={12} name="type" initialValue='normal'>
                    <SwitchP
                        disable={!!disableProperty && disableProperty.type}
                        label="Managed CNAME"
                        trueValue="cname"
                        falseValue="normal"
                    />
                </FormItem>
                <FormItem
                    hidden={type !== "normal"}
                    label="域名额度"
                    name="limitMasterDomains"
                    initialValue={5}
                    span={12}
                >
                    <InputNumber />
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
                    hidden={type !== "normal"}
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
