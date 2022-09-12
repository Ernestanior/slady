import React, {FC, useCallback, useEffect, useState} from "react";
import { Select } from "antd";
import { Checkbox } from "antd";
import {SelectProps} from "antd/lib/select";
import "./index.less"
const CheckboxGroup = Checkbox.Group;
interface IProps extends SelectProps<any>{
    data: any[];
    size?: "small" | "large" | "middle"  ;
    onChange?: any;
    placeholder?: string;
    /** 默认值 */
    defaultValue?: any;
    /** 样式 */
    style?: React.CSSProperties;
    /** 禁用 */
    disabled?: boolean;
    /** 只读 */
    readOnly?:boolean;
}

/**
 *
 * @param props
 */
const SelectCheckBox: FC<IProps & {value?: any}> = (props) => {
    const { onChange: propsOnChange, ...resProps } = props;
    const [selectList,setSelectList]=useState<any[]>([])

    useEffect(()=>{
        setSelectList(resProps.value)
    },[resProps.value])

    //为了将数据全部重新返回，需要合成onChange事件
    const checkBoxChange = useCallback((value) => {
        setSelectList(value);
        propsOnChange(value)
    }, [propsOnChange])

    const selectChange = useCallback((value) => {
        const _value = map(value,props.data,true)
        setSelectList(_value)
        propsOnChange(_value)
    }, [props.data,propsOnChange])
    return (
        <Select
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            // defaultValue={defaultValue}
            value={map(selectList,props.data)}
            onChange={selectChange}
            showSearch={props.data.length > 8}
            mode="multiple"
            optionFilterProp="label"
            disabled={props.readOnly}
        >
            <Select.Option disabled className="checkbox-select-container">
                <CheckboxGroup options={props.data} value={selectList} onChange={checkBoxChange}/>
            </Select.Option>
        </Select>
    );
};

export default SelectCheckBox;

const map = (list:any[],mapList:{value:number,label:string}[],revert?:boolean)=>{
    const newList:any[] = []
    if(mapList[0] instanceof Object){
        if(revert){
            mapList.forEach(item=>{
                list.includes(item.label) && newList.push(item.value)
            })
        }
        else{
            mapList.forEach(item=>{
                list.includes(item.value) && newList.push(item.label)
            })
        }
        return newList
    }
    return list
}