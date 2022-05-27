import {FC, useCallback} from "react";
import createObserverForm, {IObserverForm} from "@/hoc/createObserverForm";
import requestNews from "@/store/request/requestNews"
import {AxiosRequestConfig} from "axios";
import {from} from "rxjs";
import NewsForm, {getJsonFromForm} from "@/pages/news/form";
import historyService from "@/store/history";
import {notification} from "antd";

const Form:FC<IObserverForm> = ({form, data$}) => {
    // 新增动态
    const submitNews = useCallback(() => {
        const data = getJsonFromForm(form);
        const config: AxiosRequestConfig = {
            url: "/api/information/add",
            method: "post",
            data
        }
        from(requestNews(config)).subscribe((res) => {
            if(res.isSuccess){
                historyService.goBack();
            }else{
                notification.error({
                    message: res.message
                })
            }
        })
    }, [form])

    return <NewsForm data$={data$} submitNews={submitNews} title="新增动态" form={form}/>
}

const CreateNewsForm = createObserverForm(Form, {
    layout: "vertical"
})

export default CreateNewsForm;