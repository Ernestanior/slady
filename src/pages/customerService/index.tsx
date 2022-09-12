import {FC, useCallback, useEffect, useState} from "react";
import useContactInfo from "@/pages/customerService/useContactInfo";
import {Button, Form, InputNumber, notification, Row, Select} from "antd";
import useDiffForm from "@/hoc/useDiffForm";
import FormItem from "@/common/Form/formItem";
import Footer from "@/common/Form/footer";
import {AxiosRequestConfig} from "axios";
import {delay, from} from "rxjs";
import requestNews from "@/store/request/requestNews";
import SelectP from "@/common/select";
import SelectCheckBox from "@/common/select/selectCheckBox";
import isMobile from "@/app/isMobile";

const Col = {wrapperCol: {span: 24}, labelCol: {span: 24}}
const CustomerService: FC = () => {
    const [config, reloadConfig] = useContactInfo();
    const [form, diff] = useDiffForm()
    const [type,setType] = useState<number>(1)
    useEffect(() => {
        reloadConfig();
    }, [reloadConfig])
    useEffect(() => {
        if (config) {
            setType(config.swapType)
            form.loadFieldsValue(config)
        }
    }, [config, form])

    const saveEvent = useCallback(() => {
        const data = form.getFieldsValue();
        const config: AxiosRequestConfig = {
            method: "post",
            url: "/api/customer/svc/set-info",
            data
        }
        from(requestNews(config)).pipe(delay(50)).subscribe(res => {
            if (res.isSuccess) {
                reloadConfig();
            }
        })
    }, [form, reloadConfig])

    const switchContact = useCallback(() => {
        const config: AxiosRequestConfig = {
            method: "put",
            url: "/api/customer/svc/switch-contact-people",
        }
        from(requestNews(config)).pipe(delay(50)).subscribe(res => {
            if (res.isSuccess) {
                notification.success({message: "切换成功"})
                reloadConfig();
            }
        })
    }, [reloadConfig])

    const fieldChange = useCallback((e) => {
        if (Array.isArray(e)) {
            const data = e.reduce((p, c) => ({
                ...p,
                [c.name.join(".")]: c.value
            }), {})
            form.setFieldsValue(data)
        }
    }, [form])
    return <section>
        <p>客户服务设置</p>
        <Form form={form} onFieldsChange={fieldChange}>
            <div style={{padding:"15px 20px 1px 20px",backgroundColor:"#fff",marginBottom:20,borderRadius:5}}>
                轮询方式:
                <FormItem span={24}>
                    <Row gutter={15}>
                        <FormItem name="swapType" span={isMobile?24:6}>
                            <SelectP data={swapType} onChange={setType}/>
                        </FormItem>
                        {type===1 &&
                            <FormItem name="days" span={isMobile?24:18}>
                                {/*<SelectP data={days} mode="multiple"/>*/}
                                <SelectCheckBox data={days}/>
                            </FormItem>}
                        {type===2 &&
                            <FormItem name="weeks" span={isMobile?24:18}>
                                {/*<SelectP data={week} mode="multiple"/>*/}
                                <SelectCheckBox data={week}/>
                            </FormItem>}
                        {type===3 &&
                            <FormItem name="interval" span={isMobile?24:18}>
                                <InputNumber/>
                            </FormItem>}
                    </Row>
                </FormItem>
            </div>
            <div style={{padding:"10px 20px",marginBottom:20,borderRadius:5,backgroundColor:"#fff"}}>
                <div><b>下一次切换</b></div>
                <div style={{margin: "10px 0"}}>时间: {config?.nextSwitchDate}</div>
                <div style={{margin: "10px 0"}}>Telegram: {config?.nextContact.telegram}</div>
                <div style={{margin: "10px 0"}}>Line: {config?.nextContact.line}</div>
                <div style={{margin: "10px 0"}}>Skype: {config?.nextContact.skype}</div>
                <div style={{margin: "10px 0"}}>E-mail: {config?.nextContact.email}</div>
                <Button onClick={switchContact} disabled={diff}>立即切换</Button>
            </div>
            <div style={{padding:"15px 20px",backgroundColor:"#fff",borderRadius:5}}>
                <FormItem label={`Telegram 客服列表, 当前为: ${config?.currentContact.telegram}`} name="telegramList" {...Col}>
                    <Select
                        mode="tags"
                        open={false}
                        tokenSeparators={[",", " ", ":"]}
                    />
                </FormItem>
                <FormItem label={`Line 客服列表，当前为: ${config?.currentContact.line}`} name="lineList" {...Col}>
                    <Select
                        mode="tags"
                        open={false}
                        tokenSeparators={[",", " ", ":"]}
                    />
                </FormItem>
                <FormItem label={`Skype 客服列表，当前为: ${config?.currentContact.skype}`} name="skypeList" {...Col}>
                    <Select
                        mode="tags"
                        open={false}
                        tokenSeparators={[",", " ", ":"]}
                    />
                </FormItem>
                <FormItem label={`E-mail 客服列表，当前为: ${config?.currentContact.email}`} name="emailList" {...Col}>
                    <Select
                        mode="tags"
                        open={false}
                        tokenSeparators={[",", " ", ":"]}
                    />
                </FormItem>
            </div>

            {diff && <Footer marginBottom={30} submit={saveEvent} cancel={() => {
                form.loadFieldsValue(config)
            }}/>}
        </Form>
    </section>
}

export default CustomerService;

const swapType = [
    {id:1,name:"按月轮询"},
    {id:2,name:"按周轮询"},
    {id:3,name:"按日轮询"},
]
const week = [
    {value:1,label:"星期一"},
    {value:2,label:"星期二"},
    {value:3,label:"星期三"},
    {value:4,label:"星期四"},
    {value:5,label:"星期五"},
    {value:6,label:"星期六"},
    {value:7,label:"星期日"},
]
const days=[...Array(31)].map((_,i)=>i+1)
