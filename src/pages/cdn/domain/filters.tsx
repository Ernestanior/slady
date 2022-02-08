import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import CustomerListSelector from "@/pages/common/customerListSelector";

const CDNDomainFilter:FC = () => {
    return <>
        <FormItem span={4} noStyle name="masterName">
            <Input placeholder="域名" allowClear />
        </FormItem>
        <FormItem span={4} noStyle name="displayName">
            <Input placeholder="主机记录值" allowClear />
        </FormItem>
        <FormItem span={4} noStyle name="customerId">
            <CustomerListSelector emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
    </>
}

export default CDNDomainFilter;
