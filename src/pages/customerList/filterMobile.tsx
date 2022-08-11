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
    return <div>
        <FormItem span={20} label="名称" name="name">
            <Input />
        </FormItem>
        <FormItem span={20} label="登录邮箱" name="email">
            <Input />
        </FormItem>
        <FormItem span={20} name="saleId" label="销售员" hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} >
            <SaleSelector emptyOption/>
        </FormItem>
        <FormItem span={20}  name="type" label="客户类型">
            <SelectP data={USER_TYPE} emptyOption />
        </FormItem>
        <FormItem span={20}  name="status" label="账号状态">
            <SelectP data={IAccountState} emptyOption />
        </FormItem>
    </div>
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
