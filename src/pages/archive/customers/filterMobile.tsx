import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";

const ArchiveCustomerFilter:FC = () => {
    return <>
        <FormItem span={20} label="关键字" name="keyWord">
            <Input allowClear />
        </FormItem>
        <FormItem span={20} label="名称" name="name">
            <Input allowClear />
        </FormItem>
        <FormItem span={20} label="邮箱" name="email">
            <Input allowClear />
        </FormItem>
    </>
}

export default ArchiveCustomerFilter;
