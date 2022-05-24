import {FC} from "react";
import FormItem from "@/common/Form/formItem";
import {Input} from "antd";
import Editor from "@/pages/news/editor";
import UploadImage from "@/pages/news/uploadImage";
import PublishTime from "@/pages/news/publishTime";
import Footer from "@/common/Form/footer";
import historyService from "@/store/history";
import {ISubmit} from "@/common/interface";

const NewsForm:FC<{submitNews: ISubmit, title: string}> = ({submitNews, title}) => {
    return <section style={{marginTop: 20}}>
        <h3>{title}</h3>
        <div className="new-form">
            <FormItem hidden name="uuid">
                <Input />
            </FormItem>
            <p>简体中文</p>
            <FormItem hidden name={["simplifiedForm", "id"]}>
                <Input />
            </FormItem>
            <FormItem label="*标题" name={["simplifiedForm", "title"]}>
                <Input />
            </FormItem>
            <FormItem label="*描述" name={["simplifiedForm", "des"]}>
                <Input />
            </FormItem>
            <FormItem label="*内容" name={["simplifiedForm", "content"]}>
                <Editor key="simplified-editor" />
            </FormItem>
            <p>繁体中文</p>
            <FormItem hidden name={["traditionalForm", "id"]}>
                <Input />
            </FormItem>
            <FormItem label="*标题" name={["traditionalForm", "title"]}>
                <Input />
            </FormItem>
            <FormItem label="*描述" name={["traditionalForm", "des"]}>
                <Input />
            </FormItem>
            <FormItem label="*内容" name={["traditionalForm", "content"]}>
                <Editor />
            </FormItem>
            <p>English</p>
            <FormItem hidden name={["englishForm", "id"]}>
                <Input />
            </FormItem>
            <FormItem label="*标题" name={["englishForm", "title"]}>
                <Input />
            </FormItem>
            <FormItem label="*描述" name={["englishForm", "des"]}>
                <Input />
            </FormItem>
            <FormItem label="*内容" name={["englishForm", "content"]}>
                <Editor />
            </FormItem>
            <FormItem label="图片" name="imageUrl">
                <UploadImage />
            </FormItem>
            <FormItem label="发布时间" name="publishDate">
                <PublishTime />
            </FormItem>
            <FormItem hidden name="id">
                <Input />
            </FormItem>
        </div>
        <Footer marginBottom={30} submit={submitNews} cancel={() => { historyService.push("/news") }} />
    </section>
}

export default NewsForm