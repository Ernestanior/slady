import {FC, useEffect, useMemo} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {Breadcrumb, Empty} from "antd"
import ModifyNewsForm from "@/pages/news/modifyForm";
import {parseQueryJsonToForm} from "@/pages/news/form";
import useNewsDetail from "@/pages/news/useNewsDetail";

const NewsUpdate:FC = () => {
    const url = useRouteMatch<{ id: string, type: string }>("/news/:id");

    const id = useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return url.params.id
            }
        }
    }, [url])

    const newsData = useNewsDetail(id)

    useEffect(() => {
        if(newsData){
            const data = parseQueryJsonToForm(newsData)
            ModifyNewsForm.loadData(data)
        }
    }, [newsData])

    if(!id){
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