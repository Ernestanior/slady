import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";
import SaleSelector from "@/pages/sale/saleSelector";
import SelectP from "@/common/select";
import {USER_TYPE} from "@/pages/customerList/index";

const CustomerFilter:FC = () => {
    const info = useAccountInfo();
    return <>
        <FormItem span={3} noStyle name="name">
            <Input placeholder="名称" />
        </FormItem>
        <FormItem span={3} noStyle name="email">
            <Input placeholder="登录邮箱" />
        </FormItem>
        <FormItem span={4} name="saleId" hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} noStyle>
            <SaleSelector emptyOption placeholder="销售员" />
        </FormItem>
        <FormItem span={3} noStyle name="type">
            <SelectP data={USER_TYPE} emptyOption placeholder="客户类型" />
        </FormItem>
        <FormItem span={3} noStyle name="status">
            <SelectP data={IAccountState} emptyOption placeholder="账号状态" />
        </FormItem>
    </>
}

export default CustomerFilter

export const IAccountState = [
    {
        id: 1,
        name: "启用"
    },
    {
        id: -1,
        name: "禁用"
    }
]
