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
        <FormItem span={20} label="用户名" name="name">
            <Input />
        </FormItem>
        <FormItem span={20} label="登录邮箱" name="email">
            <Input />
        </FormItem>
        <FormItem span={20} label="类型" name="type" hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER}>
            <SelectP emptyOption data={SALE_LIST} />
        </FormItem>
    </>
}

export default SaleFilter
