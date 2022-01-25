import {FC} from "react";
import FormItem from "@/common/Form/formItem";
import {Input} from "antd";

const Description:FC = () => {
    return <section className="cdn-block">
        <p>备注</p>
        <FormItem span={24} name="description">
            <Input.TextArea rows={3} />
        </FormItem>
    </section>
}

export default Description
