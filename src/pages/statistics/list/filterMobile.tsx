import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";

const StatFilter:FC = () => {
    return <>
        <FormItem span={20} label="用户名" name="name">
            <Input />
        </FormItem>
        <FormItem span={20} label="登录邮箱" name="email">
            <Input />
        </FormItem>
    </>
}

export default StatFilter
