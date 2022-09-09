import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import { Select } from "antd";
import { ISelectOptionConfig } from "../interface";
import { Checkbox } from "antd";
import {SelectProps} from "antd/lib/select";
import "./index.less"
const CheckboxGroup = Checkbox.Group;
interface IProps extends SelectProps<any>{
    data: any[];
    size?: "small" | "large" | "middle"  ;
    onChange?: any;
    placeholder?: string;
    /** 空白选项 */
    emptyOption?: boolean;
    /** 页面级别缓存数据ID */
    listCacheID?: string;
    /** 下拉列表的展示和提交配置 */
    config?: ISelectOptionConfig
    /** 默认值 */
    defaultValue?: any;
    /** 样式 */
    style?: React.CSSProperties;
    /** 开启翻译 */
    enableIntl?: boolean;
    /** 禁用 */
    disabled?: boolean;
    /** 提供函数确定初始选中值 */
    selectedFunction?: (data: any) => boolean;
    /** 只读 */
    readOnly?:boolean;
}

/**
 *
 * @param props
 */
const SelectCheckBox: FC<IProps & {value?: any}> = (props) => {
    const { listCacheID, emptyOption, config, enableIntl, selectedFunction, onChange: propsOnChange, ...resProps } = props;
    const [selectList,setSelectList]=useState<any[]>()

    const idKey = useMemo(() => {
        if(props.config){
            return props.config.idKey
        }
        return "value";
    }, [props])

    // const textKey = useMemo(() => {
    //     if(props.config){
    //         return props.config.textKey
    //     }
    //     return "label";
    // }, [props])

    useEffect(()=>{
        setSelectList(resProps.value)
    },[resProps.value])

    //为了将数据全部重新返回，需要合成onChange事件
    const onChange = useCallback((value) => {
        setSelectList(value)
        let item = null;
        if(Array.isArray(props.data)){
            const _data:any = props.data;
            item = _data.find((v: any) => v === value || v[idKey] === value)
        }
        if(propsOnChange){
            propsOnChange(value, item)
        }
    }, [propsOnChange, props, idKey])
    return (
        <Select
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            // defaultValue={defaultValue}
            value={selectList}
            // onChange={onChange}
            showSearch={props.data.length > 8}
            mode="multiple"
            optionFilterProp="label"
            disabled={props.readOnly}
        >
            <Select.Option disabled className="checkbox-select-container">
                <CheckboxGroup options={props.data} value={selectList} onChange={onChange}/>
            </Select.Option>
        </Select>
    );
};

export default SelectCheckBox;
