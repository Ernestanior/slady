import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import CustomerListSelector from "@/pages/common/customerListSelector";

const ArchiveDomainFilter:FC = () => {
    return <>
        <FormItem span={20} label="主机记录值" name="displayName">
            <Input allowClear />
        </FormItem>
        <FormItem span={20} label="站点名称" name="siteName">
            <Input allowClear />
        </FormItem>
        <FormItem span={20} label="选择客户" name="customerId">
            <CustomerListSelector includeArchiveCustomer emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
    </>
}

export default ArchiveDomainFilter;
