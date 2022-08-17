import {FC} from "react";
import {DatePicker, Input} from "antd";
import FormItem from "@/common/Form/formItem";

const ArchiveCustomerFilter:FC = () => {
    // const info = useAccountInfo();
    return <>
        <FormItem span={20} label="标题" name="title">
            <Input allowClear />
        </FormItem>
        {/*<FormItem span={4} name="saleId" hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} >*/}
        {/*    <SaleSelector emptyOption placeholder="销售员" />*/}
        {/*</FormItem>*/}
        <FormItem span={20} label="日期" name="date">
            <DatePicker.RangePicker placeholder={["开始时间", "结束时间"]} />
        </FormItem>
    </>
}

export default ArchiveCustomerFilter;
