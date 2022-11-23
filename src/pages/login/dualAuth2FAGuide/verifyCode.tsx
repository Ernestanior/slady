import React, {FC, ReactNode, useCallback, useRef} from "react";
import {IFormComponent} from "@/common/interface";
import {Col, Input, Row} from "antd";
import {createUUid, trimPlx} from "@/common/utils";
import useUpdatedRef from "@/hooks/useUpdatedRef";
import isMobile from "@/app/isMobile";
import accountService from "@/store/account/service";

const VerifyCode: FC<IFormComponent & {maxLength: number}> = ({value, onChange, maxLength}) => {
    const idPrefix = useRef(createUUid())
    const onChangeRef = useUpdatedRef(onChange)
    // 修改并跳转到下一个
    const changeEvent = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number, value?: string) => {
        // 修改当前
        let updatedValue = (value || "").split("");
        // nextIndex-下一个操作的input
        let nextIndex = index + 1
        // 当前操作
        const char = e.key

        // 删除
        if(char === "Backspace"){
            nextIndex = updatedValue.length - 1;
            if(updatedValue[nextIndex]){
                updatedValue[nextIndex] = "";
            }
        }
        // 提交
        else if(char === "Enter"){
            return
        }else if(char === "Escape"){
            accountService.autoLogout()
            return
        }else{
            // 非数字不可以输入
            if(isNaN(parseInt(char))){
                if(char.toLowerCase() === "v"){
                    // 防止粘贴事件被阻止
                    if(e.ctrlKey || e.metaKey){
                        return;
                    }
                }
                e.preventDefault()
                return;
            }
            // 替换
            if(typeof updatedValue[index] !== "undefined"){
                updatedValue[index] = char;
            }else{
                // 新增
                for(let j=0; j<nextIndex; j++){
                    // 当前位置为空-则为开始位
                    if(!updatedValue[j]){
                        updatedValue[j] = char;
                        nextIndex = j+1;
                        // 中止
                        break;
                    }
                }
            }
        }
        if(onChangeRef.current){
            onChangeRef.current(updatedValue.join(""))
        }
        // 跳转下一个
        setTimeout(() => {
            const nextElId = `${idPrefix.current}-${nextIndex}`
            const nextEl:any = document.getElementById(nextElId);
            if(nextEl){
                nextEl.focus();
            }
        }, 15)

    }, [onChangeRef])

    // 粘贴
    const pasteEvent = useCallback((str: string) => {
        const newStr = trimPlx(str)
        // 非数字粘贴
        if(isNaN(parseInt(newStr))){
            return;
        }
        if(onChangeRef.current){
            onChangeRef.current(newStr)
        }
        setTimeout(() => {
            const nextElId = `${idPrefix.current}-${newStr.length}`
            const nextEl:any = document.getElementById(nextElId);
            if(nextEl){
                nextEl.focus();
            }
        }, 15)
    }, [onChangeRef])

    const nodes:ReactNode[] = []

    if(maxLength){
        for(let i=0; i<maxLength; i++){
            const savedIndex = i;
            const key = `${idPrefix.current}-${i}`
            const currentValue = value ? value[savedIndex] : "";
            nodes.push(<Col key={key}>
                <Input
                    type={isMobile?"number":"text"}
                    value={currentValue}
                    id={key}
                    style={isMobile?{width: 35, height:35}:{width: 40, height:40, textAlign:"center"}}
                    maxLength={1}
                    onKeyDown={e => changeEvent(e, savedIndex, value)}
                    onPaste={e => pasteEvent(e.clipboardData.getData('text'))}
                />
            </Col>)
        }
    }
    return <Row justify="center" gutter={10}>
        {nodes}
    </Row>
}

export default VerifyCode
