import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";

const NewsFilter:FC = () => {
    return <>
        <FormItem span={6} noStyle name="content">
            <Input placeholder="内容" />
        </FormItem>
        <FormItem span={3} noStyle name="date">
            <Input placeholder="发布时间" />
        </FormItem>
    </>
}

export default NewsFilter
