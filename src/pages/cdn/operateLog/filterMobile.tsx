import {FC} from "react";
import FormItem from "@/common/Form/formItem";
import CustomerListSelector from "@/pages/common/customerListSelector";
import FunctionListSelector from "@/pages/common/functionListSelector";
import AsyncQuerySiteSelector from "@/pages/common/asyncQuerySiteSelector";
import UserListSelector from "@/pages/common/userListSelector";
import {DatePicker} from "antd";

const CDNDomainFilter:FC = () => {
    return <>
        <FormItem span={20} label="功能" name="requestUri">
            <FunctionListSelector emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
        <FormItem span={20} label="客户名称" name="customerId">
            <CustomerListSelector emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
        <FormItem span={20} label="站点名称" name="siteId">
            <AsyncQuerySiteSelector/>
        </FormItem>
        <FormItem span={20} label="执行人" name="userId">
            <UserListSelector emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
        <FormItem span={20} label="执行时间" name="operateDate">
            <DatePicker.RangePicker placeholder={["开始时间", "结束时间"]} />
        </FormItem>
    </>
}

export default CDNDomainFilter;
