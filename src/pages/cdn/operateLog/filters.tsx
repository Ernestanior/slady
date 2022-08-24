import {FC} from "react";
import FormItem from "@/common/Form/formItem";
import CustomerListSelector from "@/pages/common/customerListSelector";
import FunctionListSelector from "@/pages/common/functionListSelector";
import AsyncQuerySiteSelector from "@/pages/common/asyncQuerySiteSelector";
import UserListSelector from "@/pages/common/userListSelector";
import {DatePicker} from "antd";


const CDNDomainFilter:FC = () => {
    return <>
        <FormItem span={4} noStyle name="requestUri">
            <FunctionListSelector size="default" bordered style={{ width: "100%" }} />
        </FormItem>
        <FormItem span={4} noStyle name="customerId">
            <CustomerListSelector emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
        <FormItem span={4} noStyle name="siteId">
            <AsyncQuerySiteSelector/>
        </FormItem>
        <FormItem span={4} noStyle name="userId">
            <UserListSelector emptyOption size="default" bordered style={{ width: "100%" }} />
        </FormItem>
        <FormItem span={4} noStyle name="operateDate">
            <DatePicker.RangePicker placeholder={["开始时间", "结束时间"]} />
        </FormItem>
    </>
}

export default CDNDomainFilter;
