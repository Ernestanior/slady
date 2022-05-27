import {FC, useCallback} from "react";
import createObserverForm, {IObserverForm} from "@/hoc/createObserverForm";
import requestNews from "@/store/request/requestNews"
import {AxiosRequestConfig} from "axios";
import {from} from "rxjs";
import NewsForm, {getJsonFromForm} from "./form"
import historyService from "@/store/history";

const Form:FC<IObserverForm> = ({form, data$}) => {
    // 新增动态
    const submitNews = useCallback(() => {
        const data = getJsonFromForm(form);
        const config: AxiosRequestConfig = {
            url: "/api/information/update",
            method: "put",
            data
        }
        from(requestNews(config)).subscribe((res) => {
            if(res.isSuccess){
                historyService.goBack();
            }
        })
    }, [form])

    return <NewsForm data$={data$} submitNews={submitNews} title="编辑动态" form={form}/>
}

const ModifyNewsForm = createObserverForm(Form, {
    layout: "vertical"
})

export default ModifyNewsForm;