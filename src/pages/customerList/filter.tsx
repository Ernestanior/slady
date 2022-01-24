import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";

const CustomerFilter:FC = () => {
    const info = useAccountInfo();

    return <>
        <FormItem span={3} noStyle name="name">
            <Input placeholder="名称" />
        </FormItem>
        <FormItem span={3} noStyle name="email">
            <Input placeholder="登录邮箱" />
        </FormItem>
        <FormItem span={3} name="saleId" hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} noStyle>
            <Input placeholder="销售员" />
        </FormItem>
        <FormItem span={3} noStyle name="type">
            <Input placeholder="客户类型" />
        </FormItem>
        <FormItem span={3} noStyle name="status">
            <Input placeholder="账户禁用" />
        </FormItem>
    </>
}

export default CustomerFilter
