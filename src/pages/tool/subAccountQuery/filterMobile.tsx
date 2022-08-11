import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";

const CustomerFilter:FC = () => {

    return <>
        <FormItem span={20} label="客户名称（主账号）" name="parentName">
            <Input />
        </FormItem>
        <FormItem span={20} label="用户名称" name="name">
            <Input />
        </FormItem>
        <FormItem span={20} label="邮箱" name="email">
            <Input />
        </FormItem>
        <FormItem span={20} label="权限类型" name="subType">
            <SelectP data={IPermissionType} emptyOption />
        </FormItem>
        <FormItem span={20} label="状态" name="status">
            <SelectP data={IState} emptyOption />
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
