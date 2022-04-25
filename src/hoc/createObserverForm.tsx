import {Form, FormInstance} from "antd";
import {FC, useCallback, useEffect} from "react";
import {useForm} from "antd/es/form/Form";
import {BehaviorSubject} from "rxjs";
import {FormLayout} from "antd/lib/form/Form";
import {getValueFromForm} from "@/common/utils";

export interface IObserverForm{
    form: FormInstance;
    data$: BehaviorSubject<any>
}

interface IConfigModule{
    layout?: FormLayout;
}

interface ICreateObserverFrom<S>{
    UI: FC,
    loadData: (data: S) => void
}

function createObserverForm <S>(FormPart: FC<IObserverForm>, config: IConfigModule){
    const data$ = new BehaviorSubject<S>({} as S)

    const RTForm:FC = ({children}) => {
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

        return <Form form={form} onFieldsChange={mergeFieldChange} {...config}>
            <FormPart data$={data$} form={form} >
                {children}
            </FormPart>
        </Form>
    }

    return {
        UI: RTForm,
        loadData: (data) => {
            setTimeout(() => {
                data$.next(data)
            }, 60)
        }
    } as ICreateObserverFrom<S>
}

export default createObserverForm