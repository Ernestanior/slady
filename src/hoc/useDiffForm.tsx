import {useForm} from "antd/es/form/Form";
import {useMemo, useRef, useState} from "react";
import {FormInstance} from "antd";
import useUpdateRef from "@/hoc/useUpdateRef";
import {compareA_B} from "@/common/utils";

interface IFormPlx extends FormInstance{
    loadFieldsValue: (data: any) => void
}

const useDiffForm = () => {
    const [form] = useForm();
    const originData = useRef({})
    const [diff, setDiff] = useState(false)

    const loadFieldsValueRef = useUpdateRef((data: any) => {
        form.setFieldsValue(data);
        originData.current = data;
        setDiff(false)
    })

    const setFieldsValueRef = useUpdateRef(((data: any) => {
        form.setFieldsValue(data);
        setDiff(!compareA_B(originData.current, form.getFieldsValue()))
    }))

    const formPlx = useMemo(() => {
        const handler = {
            get(obj: FormInstance, prop: keyof IFormPlx){
                if(prop === "loadFieldsValue"){
                    return loadFieldsValueRef.current
                }
                if(prop === "setFieldsValue"){
                    return setFieldsValueRef.current
                }
                return obj[prop]
            }
        }
        return new Proxy(form, handler)
    }, [form, loadFieldsValueRef, setFieldsValueRef])

    return [formPlx, diff] as [IFormPlx, boolean]
}

export default useDiffForm;