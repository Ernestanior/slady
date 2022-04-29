import {useForm} from "antd/es/form/Form";
import {useMemo} from "react";
import {BehaviorSubject} from "rxjs";
import {FormInstance} from "antd";

type IObserverForm = [FormInstance, any]

/**
 * 由于setFieldsValue不会触发onFieldChange,创建代理的setFieldsValue
 */
const useObserverForm = <T>(data$: BehaviorSubject<T>) => {
    const [form] = useForm()

    const formPlx = useMemo(() => {
        const handler = {
            get(obj: FormInstance, prop: keyof FormInstance){
                if(prop === "setFieldsValue"){
                    return function (data: T){
                        // 调用
                        obj.setFieldsValue(data)
                        // 通知
                        data$.next({
                            ...data$.value,
                            ...data
                        })
                    }
                }
                return obj[prop]
            }
        }
        return new Proxy(form, handler);
    }, [form, data$])

    return [form, formPlx] as IObserverForm
}

export default useObserverForm