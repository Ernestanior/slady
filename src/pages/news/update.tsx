import {FC, useEffect, useMemo} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {Breadcrumb, Empty} from "antd"
import ModifyNewsForm from "@/pages/news/modifyForm";
import {from} from "rxjs";
import {AxiosRequestConfig} from "axios";
import requestNews from "@/store/request/requestNews";
import moment from "moment";

const NewsUpdate:FC = () => {
    const url = useRouteMatch<{ id: string, type: string }>("/news/:id");

    const uuid = useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return url.params.id
            }
        }
    }, [url])

    useEffect(() => {
        if(uuid){
            const config:AxiosRequestConfig = {
                method: "get",
                url: "/api/information/detail",
                params: {
                    uuid
                }
            }
            const sub = from(requestNews<any>(config)).subscribe(res => {
                if(res.isSuccess){
                    if(res.result){
                        ModifyNewsForm.loadData({
                            ...res.result,
                            publishDate: moment(res.result.publishDate, "YYYY-MM-DD HH:mm:ss")
                        })
                    }
                }
            })
            return () => sub.unsubscribe()
        }
    }, [uuid])

    if(!uuid){
        return <Empty />
    }
    return <section>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>官网设置</Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to= "/news">
                    <span style={{marginLeft: 5}}>新闻动态</span>
                </Link>
            </Breadcrumb.Item>
        </Breadcrumb>
        <ModifyNewsForm.UI />
    </section>
}

export default NewsUpdate