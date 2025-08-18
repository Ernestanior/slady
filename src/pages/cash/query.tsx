import FormItem from "@/common/Form/formItem";
import {Input, DatePicker} from "antd";
import {useTranslation} from "react-i18next";

const Query=()=>{
    const [t]=useTranslation()
    return <>
        <FormItem span={6} noStyle name="operateDate">
            <DatePicker.RangePicker placeholder={[t("STARTING_TIME"), t("ENDING_TIME")]} />
        </FormItem>
    </>
}
export default Query
