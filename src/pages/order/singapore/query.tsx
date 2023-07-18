import FormItem from "@/common/Form/formItem";
import {Input, Select,DatePicker} from "antd";
import React from "react";

const query=()=><>
    <FormItem span={4} label={"编号"} name="design" >
        <Input/>
    </FormItem>
    <FormItem span={4} label={"备注"} name="remark">
        <Input/>
    </FormItem>
    <FormItem span={4} label={"状态"} name="status">
        <Select options={[{value:"1",label:'待定'},{value:"2",label:'OK'},{value:"3",label:'已发货'}]}/>
    </FormItem>
    <FormItem span={6} noStyle name="operateDate">
        <DatePicker.RangePicker placeholder={["开始时间", "结束时间"]} />
    </FormItem>
</>
export default query
