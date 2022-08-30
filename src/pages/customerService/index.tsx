import {FC, useCallback, useEffect} from "react";
import useContactInfo from "@/pages/customerService/useContactInfo";
import {Button, Form, InputNumber, notification, Select} from "antd";
import useDiffForm from "@/hoc/useDiffForm";
import FormItem from "@/common/Form/formItem";
import Footer from "@/common/Form/footer";
import {AxiosRequestConfig} from "axios";
import {delay, from} from "rxjs";
import requestNews from "@/store/request/requestNews";

const Col = {wrapperCol: {span: 24}, labelCol: {span: 24}}

const CustomerService: FC = () => {
    const [config, reloadConfig] = useContactInfo();
    const [form, diff] = useDiffForm()

    useEffect(() => {
        reloadConfig();
    }, [reloadConfig])

    useEffect(() => {
        if (config) {
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
            <FormItem label="轮询天数" name="interval" {...Col}>
                <InputNumber/>
            </FormItem>
            <div style={{border:"1px solid #ccc",padding:10,marginBottom:20,borderRadius:5}}>
                <div><b>下一次切换</b></div>
                <div style={{margin: "10px 0"}}>时间: {config?.nextSwitchDate}</div>
                <div style={{margin: "10px 0"}}>Telegram: {config?.nextContact.telegram}</div>
                <div style={{margin: "10px 0"}}>Line: {config?.nextContact.line}</div>
                <div style={{margin: "10px 0"}}>Skype: {config?.nextContact.skype}</div>
                <div style={{margin: "10px 0"}}>E-mail: {config?.nextContact.email}</div>
                <Button onClick={switchContact} disabled={diff}>立即切换</Button>
            </div>
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
            {diff && <Footer marginBottom={30} submit={saveEvent} cancel={() => {
                form.loadFieldsValue(config)
            }}/>}
        </Form>
    </section>
}

export default CustomerService;