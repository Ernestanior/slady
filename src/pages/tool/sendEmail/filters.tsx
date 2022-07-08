import {FC} from "react";
import {DatePicker, Input} from "antd";
import FormItem from "@/common/Form/formItem";
import {E_USER_TYPE} from "@/store/account/interface";
import SaleSelector from "@/pages/sale/saleSelector";
import useAccountInfo from "@/store/account";

const ArchiveCustomerFilter:FC = () => {
    const info = useAccountInfo();
    return <>
        <FormItem span={4} noStyle name="title">
            <Input placeholder="标题" allowClear />
        </FormItem>
        <FormItem span={4} name="saleId" hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} noStyle>
            <SaleSelector emptyOption placeholder="销售员" />
        </FormItem>
        <FormItem span={4} noStyle name="date">
            <DatePicker.RangePicker placeholder={["开始时间", "结束时间"]} />
        </FormItem>
    </>
}

export default ArchiveCustomerFilter;
