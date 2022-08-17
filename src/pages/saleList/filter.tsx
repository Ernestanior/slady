import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";
import SelectP from "@/common/select";
import {SALE_LIST} from "@/pages/sale/create";

const SaleFilter:FC = () => {
    const info = useAccountInfo();

    return <>
        <FormItem span={3} noStyle name="name">
            <Input placeholder="用户名" />
        </FormItem>
        <FormItem span={3} noStyle name="email">
            <Input placeholder="登录邮箱" />
        </FormItem>
        <FormItem span={3} noStyle name="type" hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER}>
            <SelectP emptyOption data={SALE_LIST} placeholder="销售类型"/>
        </FormItem>
    </>
}

export default SaleFilter
