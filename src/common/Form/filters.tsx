import {FC} from "react";
import FormItem from "@/common/Form/formItem";
import {Input} from "antd";

/**
 * 关键字查询
 * @constructor
 */
const Filters:FC = () => {
    return <>
        <FormItem span={6}>
            <Input placeholder="输入关键字查询" />
        </FormItem>
    </>
}

export default Filters
