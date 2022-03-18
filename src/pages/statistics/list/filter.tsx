import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";

const StatFilter:FC = () => {
    return <>
        <FormItem span={3} noStyle name="name">
            <Input placeholder="用户名" />
        </FormItem>
        <FormItem span={3} noStyle name="email">
            <Input placeholder="登录邮箱" />
        </FormItem>
    </>
}

export default StatFilter
