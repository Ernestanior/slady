import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";

const ArchiveCustomerFilter:FC = () => {
    return <>
        <FormItem span={4} noStyle name="keyWord">
            <Input placeholder="关键字" allowClear />
        </FormItem>
        <FormItem span={4} noStyle name="name">
            <Input placeholder="名称" allowClear />
        </FormItem>
        <FormItem span={4} noStyle name="email">
            <Input placeholder="邮箱" allowClear />
        </FormItem>
    </>
}

export default ArchiveCustomerFilter;
