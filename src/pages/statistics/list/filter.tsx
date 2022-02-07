import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";

const StatFilter:FC = () => {
    return <>
        <FormItem span={3} noStyle name="name">
            <Input placeholder="用户名" />
        </FormItem>
        <FormItem span={3} noStyle name="email">
            <Input placeholder="登录邮箱" />
        </FormItem>
        <FormItem span={3} noStyle name="type">
            <SelectP data={userType} emptyOption placeholder="账号类型" />
        </FormItem>
    </>
}

export default StatFilter

const userType = [
    {
        name: "测试客户",
        id: 1
    },
    {
        name: "正式客户",
        id: 0
    }
]
