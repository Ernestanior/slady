import {FC} from "react";
import {Input, DatePicker} from "antd";
import FormItem from "@/common/Form/formItem";

const NewsFilter:FC = () => {
    return <>
        <FormItem span={20} label="条目名称" name="entry">
            <Input />
        </FormItem>
        <FormItem span={20} label="日期" name="date">
            <DatePicker.RangePicker placeholder={["开始时间", "结束时间"]}/>
        </FormItem>
    </>
}

export default NewsFilter
