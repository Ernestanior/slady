import {ISubmit} from "@/common/interface";
import {useCallback} from "react";

const useFieldsChange = (trigger?: ISubmit) => {

    // 统一格式的fieldsChange格式转换
    return useCallback((res: any) => {
        if(trigger){
            if(Array.isArray(res)){
                const {name, value} = res[0];
                const _name = Array.isArray(name) ? name.join(".") : name;
                trigger({
                    [_name]: value
                })
            }
        }
    }, [trigger])
}

export default useFieldsChange
