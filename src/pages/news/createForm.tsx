import {FC, useCallback} from "react";
import FormItem from "@/common/Form/formItem";
import {Input} from "antd";
import createObserverForm, {IObserverForm} from "@/hoc/createObserverForm";
import Editor from "@/pages/news/editor";
import historyService from "@/store/history";
import Footer from "@/common/Form/footer";
import requestNews from "@/store/request/requestNews"
import {AxiosRequestConfig} from "axios";
import {from} from "rxjs";
import dayjs from "dayjs";

const Form:FC<IObserverForm> = ({form}) => {
    // 新增动态
    const createNews = useCallback(() => {
        const data = form.getFieldsValue();
        const config: AxiosRequestConfig = {
            url: "/api/information/add",
            method: "post",
            data: {
                publishDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                simplifiedForm: {
                    title: data.zhCNTitle,
                    content: data.zhCNContent
                },
                traditionalForm: {
                    title: data.zhTWTitle,
                    content: data.zhTWContent
                },
                englishForm: {
                    title: data.enUSTitle,
                    content: data.enUSContent
                }
            }
        }
        from(requestNews(config)).subscribe((res) => {
            console.log(res)
        })
    }, [])

    return <section style={{marginTop: 20}}>
        <h3>新增动态</h3>
        <div style={{padding: "0 20px", marginTop: 20}}>
            <p>简体中文</p>
            <FormItem label="*标题" name="zhCNTitle">
                <Input />
            </FormItem>
            <FormItem label="*内容" name="zhCNContent">
                <Editor />
            </FormItem>
            <p>繁体中文</p>
            <FormItem label="*标题" name="zhTWTitle">
                <Input />
            </FormItem>
            <FormItem label="*内容" name="zhTWContent">
                <Editor />
            </FormItem>
            <p>English</p>
            <FormItem label="*标题" name="enUSTitle">
                <Input />
            </FormItem>
            <FormItem label="*内容" name="enUSContent">
                <Editor />
            </FormItem>
        </div>
        <Footer marginBottom={30} submit={createNews} cancel={() => { historyService.push("/news") }} />
    </section>
}

const CreateNewsForm = createObserverForm(Form, {
    layout: "vertical"
})

export default CreateNewsForm;