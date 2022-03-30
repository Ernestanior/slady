import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import CustomerListSelector from "@/pages/common/customerListSelector";
import SelectP from "@/common/select";
import {CONST_SITE_TYPE} from "@/pages/cdn/site/index";

const CDNSiteListFilter:FC = () => {
    return <>
        <FormItem span={3} noStyle name="siteName">
            <Input placeholder="站点名称" allowClear />
        </FormItem>
        <FormItem span={3} noStyle name="type">
            <SelectP emptyOption data={CONST_SITE_TYPE} placeholder="站点类型" />
        </FormItem>
        <FormItem span={4} noStyle name="customerId">
            <CustomerListSelector emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
    </>
}

export default CDNSiteListFilter;
