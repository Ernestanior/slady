import {FC, useCallback, useEffect} from "react";
import useContactInfo from "@/pages/customerService/useContactInfo";
import {Form, InputNumber, Select} from "antd";
import useDiffForm from "@/hoc/useDiffForm";
import FormItem from "@/common/Form/formItem";
import Footer from "@/common/Form/footer";
import {AxiosRequestConfig} from "axios";
import {delay, from} from "rxjs";
import requestNews from "@/store/request/requestNews";

const CustomerService: FC = () => {
    const [config, reloadConfig] = useContactInfo();
    const [form, diff] = useDiffForm()

    useEffect(() => {
        reloadConfig();
    }, [reloadConfig])

    useEffect(() => {
        if(config){
            form.loadFieldsValue(config)
        }
    }, [config, form])

    const saveEvent = useCallback(() => {
        const data = form.getFieldsValue();
        const config:AxiosRequestConfig = {
            method: "post",
            url: "/api/customer/svc/set-info",
            data
        }
        from(requestNews(config)).pipe(delay(50)).subscribe(res => {
            if(res.isSuccess){
                reloadConfig();
            }
        })
    }, [form, reloadConfig])

    const fieldChange = useCallback((e) => {
        if(Array.isArray(e)){
            const data = e.reduce((p, c) => ({
                ...p,
                [c.name.join(".")]: c.value
            }), {})
            form.setFieldsValue(data)
        }
    }, [form])

    return <section>
        <p>客户服务设置</p>
        <Form form={form} onFieldsChange={fieldChange} layout="vertical">
            <FormItem label="轮询天数" name="interval">
                <InputNumber/>
            </FormItem>
            <FormItem label="telegram 客服列表" name="telegramList">
                <Select
                    mode="tags"
                    open={false}
                    tokenSeparators={[",", " ",":"]}
                />
            </FormItem>
            <FormItem label="line 客服列表" name="lineList">
                <Select
                    mode="tags"
                    open={false}
                    tokenSeparators={[",", " ", ":"]}
                />
            </FormItem>
            <FormItem label="skype 客服列表" name="skypeList">
                <Select
                    mode="tags"
                    open={false}
                    tokenSeparators={[",", " ", ":"]}
                />
            </FormItem>
            <FormItem label="email 客服列表" name="emailList">
                <Select
                    mode="tags"
                    open={false}
                    tokenSeparators={[",", " ", ":"]}
                />
            </FormItem>
            {diff && <Footer marginBottom={30} submit={saveEvent} cancel={() => {form.loadFieldsValue(config)}} />}
        </Form>
    </section>
}

export default CustomerService;