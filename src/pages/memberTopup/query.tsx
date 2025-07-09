import FormItem from "@/common/Form/formItem";
import {Input} from "antd";
import {useTranslation} from "react-i18next";

const Query=()=>{
    const [t]=useTranslation()
    return <>
        <FormItem span={6} label={t("MEMBER_NAME")} name="memberName" >
            <Input/>
        </FormItem>
        <FormItem span={6} label={t("VOUCHER_NUMBER")} name="voucherNumber">
            <Input/>
        </FormItem>

    </>
}
export default Query
