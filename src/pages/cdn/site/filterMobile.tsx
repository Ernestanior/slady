import {FC} from "react";
import {Input} from "antd";
import FormItem from "@/common/Form/formItem";
import CustomerListSelector from "@/pages/common/customerListSelector";
import SelectP from "@/common/select";
import {CONST_SITE_TYPE} from "@/pages/cdn/site/index";

const CDNSiteListFilter:FC = () => {
    return <>
        <FormItem span={20} label="站点名称" name="siteName">
            <Input  allowClear />
        </FormItem>
        <FormItem span={20} label="站点类型" name="type">
            <SelectP emptyOption data={CONST_SITE_TYPE}  />
        </FormItem>
        <FormItem span={20} label="选择客户" name="customerId">
            <CustomerListSelector emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
    </>
}

export default CDNSiteListFilter;
