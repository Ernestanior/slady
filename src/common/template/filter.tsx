import React, {FC, useCallback} from "react";
import {ISubmitModule} from "@/common/interface";
import {trimAndRemoveUndefined} from "@/common/utils";
import Search from "antd/es/input/Search";

const Filter:FC<ISubmitModule> = ({submit, children}) => {
    const submitEvent = useCallback((keyWord) => {
        // 对所有属性进行trim
        submit && submit(trimAndRemoveUndefined({keyWord}))
    }, [submit])
    return <Search onSearch={submitEvent} style={{width:300}} enterButton/>
}

export default Filter;
