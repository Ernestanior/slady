import {useCallback} from "react";
import {useIntl} from "react-intl"
import {XOR} from "ts-xor";

interface IProps {
    id: string;
    values?: {
        [key: string]: string;
    }
}

type IText = XOR<IProps, string>

/**
 * 翻译
 */
const useIntlDep = () => {
    const intl = useIntl();
    return useCallback((text: IText) => {
        if(typeof text == "string"){
            return intl.formatMessage({id: text})
        }
        if (!text.values) {
            return intl.formatMessage({id: text.id})
        }
        const values: any = {};
        for (const key in text.values) {
            if (Object.prototype.hasOwnProperty.call(text.values, key)) {
                if(key[0] !== "_"){
                    if(text.values[key]){
                        if(typeof text.values[key] === "string"){
                            values[key] = key[0] !== "_" ? intl.formatMessage({
                                id: text.values[key]
                            }) : text.values[key]
                        }else{
                            values[key] =  text.values[key]
                        }
                    }else{
                        values[key] = ""
                    }
                }else{
                    const _key = key[0] === "_" ? key.substr(1) : key;
                    values[_key] = text.values[key]
                }
            }
        }
        return intl.formatMessage({
            id: text.id
        }, values)
    }, [intl]);
}

export default useIntlDep;
