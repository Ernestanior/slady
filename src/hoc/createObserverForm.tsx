import {Form, FormInstance} from "antd";
import {FC, useCallback, useEffect} from "react";
import {useForm} from "antd/es/form/Form";
import {BehaviorSubject} from "rxjs";
import {FormLayout} from "antd/lib/form/Form";
import {getValueFromForm} from "@/common/utils";
import ConditionShow from "@/common/conditionShow";

export interface IObserverForm{
    form: FormInstance;
    data$: BehaviorSubject<any>
}

interface IConfigModule{
    layout?: FormLayout;
}

interface UIInterface{
    /**
     * 编辑需要启用这个功能
     * 可以优化数据加载
     */
    visible?: boolean
}

interface ICreateObserverFrom<S>{
    UI: FC<UIInterface>,
    loadData: (data: S) => void
}

function createObserverForm <S>(FormPart: FC<IObserverForm>, config: IConfigModule){
    const data$ = new BehaviorSubject<S>({} as S)

    const RTForm:FC<UIInterface> = ({children, visible}) => {
        const [form] = useForm();

        useEffect(() => {
            const sub = data$.subscribe(data => {
                form.setFieldsValue(data)
            })
            return () => sub.unsubscribe();
        }, [form])

        const mergeFieldChange = useCallback((values) => {
            if(Array.isArray(values)){
                const dataMerge = values.reduce((a, b) => {
                    return {
                        ...a,
                        ...getValueFromForm(values[0])
                    }
                }, {});
                data$.next({
                    ...data$.value,
                    ...dataMerge
                })
            }

        }, [])

        const el = <Form form={form} onFieldsChange={mergeFieldChange} {...config}>
            <FormPart data$={data$} form={form} >
                {children}
            </FormPart>
        </Form>

        // 对于控制展示的内容，自动添加延迟加载，优化体验
        if(typeof visible !== "undefined"){
            return <ConditionShow visible={visible} delayTime={50}>
                {el}
            </ConditionShow>
        }

        return el
    }

    return {
        UI: RTForm,
        loadData: (data) => {
            setTimeout(() => {
                data$.next(data)
            }, 50)
        }
    } as ICreateObserverFrom<S>
}

export default createObserverForm