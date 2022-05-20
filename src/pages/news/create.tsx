import {FC} from "react";
import {Link} from "react-router-dom";
import {Breadcrumb} from "antd"
import CreateNewsForm from "@/pages/news/createForm";

const NewsCreate:FC = () => {
    return <section>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>官网设置</Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to= "/news">
                    <span style={{marginLeft: 5}}>新闻动态</span>
                </Link>
            </Breadcrumb.Item>
        </Breadcrumb>
        <CreateNewsForm.UI />
    </section>
}

export default NewsCreate