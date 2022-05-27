import {FC} from "react";
import {Input, DatePicker} from "antd";
import FormItem from "@/common/Form/formItem";

const NewsFilter:FC = () => {
    return <>
        <FormItem span={6} noStyle name="entry">
            <Input placeholder="条目名称" />
        </FormItem>
        <FormItem span={3} noStyle name="date">
            <DatePicker.RangePicker placeholder={["开始时间", "结束时间"]} />
        </FormItem>
    </>
}

export default NewsFilter
