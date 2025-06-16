import React, { FC, useMemo, useCallback } from "react";
import { Select } from "antd";
import {ISelectItem, ISelectProps} from "../interface";
import { upperCasePlx } from "@/common/utils";

/**
 *
 * @param props
 */
const SelectP: FC<ISelectProps & {value?: any; data: ISelectItem[] | string[] | number[];}> = (props) => {
    const { emptyOption, config, selectedFunction, onChange: propsOnChange, ...resProps } = props;
    const idKey = useMemo(() => {
        if(props.config){
            return props.config.idKey
        }
        return "id";
    }, [props])

    const textKey = useMemo(() => {
        if(props.config){
            return props.config.textKey
        }
        return "name";
    }, [props])

    const dataList: any = props.data;

    // 默认值
    let defaultValue;
    if(typeof props.defaultValue === "undefined"){
        if(selectedFunction){
            const selectedItem = dataList.find((item: any) => selectedFunction(item));
            if(selectedItem){
                defaultValue = selectedItem[idKey]
            }
        }
    }

    //为了将数据全部重新返回，需要合成onChange事件
    const onChange = useCallback((value) => {
        let item = null;
        if(Array.isArray(props.data)){
            const _data:any = props.data;
            item = _data.find((v: any) => v === value || v[idKey] === value)
        }
        if(propsOnChange){
            propsOnChange(value, item)
        }
    }, [propsOnChange, props, idKey])

    if(!Array.isArray(dataList)){
        console.error("出现非数组下拉选项渲染");
    }

    return (
        <Select
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            defaultValue={defaultValue}
            showSearch={props.data.length > 4}
            {...resProps}
            onChange={onChange}
            optionFilterProp="label"
            allowClear={emptyOption}
        >
            {dataList.map((item: any) => {
                if (typeof item === "number" || typeof item === "string") {
                    return (
                        <Select.Option key={item} value={item} label={item}>
                            {item}
                        </Select.Option>
                    );
                }
                // 特殊情况
                let text = item[textKey]
                return (
                    <Select.Option
                        key={item[idKey]}
                        value={item[idKey]}
                        label={item[textKey]}
                    >
                        {text}
                    </Select.Option>
                );
            })}
        </Select>
    );
};

export default SelectP;
