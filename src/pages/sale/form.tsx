import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import {E_USER_TYPE} from "@/store/account/service";
import SelectP from "@/common/select";
import {SALE_LIST} from "@/pages/sale/create";

const SaleForm:FC = () => {

    return <>
        <FormItem
            span={12}
            label="登陆邮箱"
            name="email"
            rules={[{ type: 'email', required: true }]}
        >
            <Input />
        </FormItem>
        <FormItem
            span={12}
            name="name"
            label="用户名"
            rules={[{required: true}]}
        >
            <Input />
        </FormItem>
        <FormItem
            span={12}
            label="销售类型"
            name="type"
            initialValue={E_USER_TYPE.SALE}
        >
            <SelectP data={SALE_LIST} />
        </FormItem>
    </>
}

export default SaleForm
