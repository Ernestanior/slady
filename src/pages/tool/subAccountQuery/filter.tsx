import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";

const CustomerFilter:FC = () => {

    return <>
        <FormItem span={4} noStyle name="parentName">
            <Input placeholder="客户名称（主账号）" />
        </FormItem>
        <FormItem span={4} noStyle name="name">
            <Input placeholder="用户名称" />
        </FormItem>
        <FormItem span={4} noStyle name="email">
            <Input placeholder="邮箱" />
        </FormItem>
        <FormItem span={3} noStyle name="subType">
            <SelectP data={IPermissionType} emptyOption placeholder="权限类型" />
        </FormItem>
        <FormItem span={2} noStyle name="status">
            <SelectP data={IState} emptyOption placeholder="状态" />
        </FormItem>
    </>
}

export default CustomerFilter

export const IState = [
    {
        id: 1,
        name: "启用"
    },
    {
        id: -1,
        name: "禁用"
    }
]

export const IPermissionType =[
    {
        id: 'admin',
        name: "管理员"
    },
    {
        id: 'viewer',
        name: "查看员"
    },
    {
        id: 'operator',
        name: "编辑员"
    }
]
