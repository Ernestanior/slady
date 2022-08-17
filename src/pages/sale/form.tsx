import {FC, useMemo} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import {E_USER_TYPE} from "@/store/account/service";
import SelectP from "@/common/select";
import {SALE_LIST} from "@/pages/sale/create";
import isMobile from "@/app/isMobile";

const SaleForm:FC = () => {
    const span = useMemo(()=>isMobile?24:12,[])

    return <>
        <FormItem
            span={span}
            label="登陆邮箱"
            name="email"
            rules={[{ type: 'email', required: true }]}
        >
            <Input />
        </FormItem>
        <FormItem
            span={span}
            name="name"
            label="用户名"
            rules={[{required: true}]}
        >
            <Input />
        </FormItem>
        <FormItem
            span={span}
            label="销售类型"
            name="type"
            initialValue={E_USER_TYPE.SALE}
        >
            <SelectP data={SALE_LIST} />
        </FormItem>
    </>
}

export default SaleForm
