import {FC} from "react";
import createModal, {OptionalType} from "@/hoc/createModal";
import useNewsDetail from "@/pages/news/useNewsDetail";
import {Image, Descriptions} from "antd";
import {LanguageType} from "@/pages/news/form";

interface IProps{
    id: string
}

function queryLocale(type: LanguageType){
    if(type === LanguageType.ZH_TW){
        return "繁体中文"
    }
    if(type === LanguageType.EN_US){
        return "English"
    }
    return "简体中文"
}

const Detail:FC<OptionalType<IProps>> = ({id}) => {
    const data = useNewsDetail(id)

    if(!data){
        return null
    }

    return <section>
        <p>条目名称：{data.entry}</p>
        <Image
            src={data.imageUrl}
        />
        <p style={{marginTop: 20}}>发布日期：{data.publishDate}</p>
        {data.contents.map(content => {
            return <div key={content.locale} style={{marginTop: 20}}>
                <Descriptions title={queryLocale(content.locale)} layout="vertical" bordered column={3}>
                    <Descriptions.Item label="标题" span={3}>
                        {content.title}
                    </Descriptions.Item>
                    <Descriptions.Item label="内容" span={3}>
                        <div>
                            <div dangerouslySetInnerHTML={{__html: content.content}} />
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        })}
    </section>
}

const ViewNewsDetail = createModal<IProps>(Detail, {
    title: "查看",
    width: 960
})

export default ViewNewsDetail