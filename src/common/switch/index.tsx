import {IFormComponent, ISwitchValue} from "@/common/interface";
import {FC, useCallback} from "react";
import {Col, Row, Switch} from "antd";

interface IProps{
    label?: string;
    marginTop?: number;
}

const SwitchP:FC<IFormComponent & IProps & ISwitchValue> = ({label, marginTop, trueValue, falseValue, value, onChange}) => {
    let checked: boolean;
    if(typeof trueValue !== 'undefined'){
        checked = value === trueValue
    }else if(typeof falseValue !== 'undefined'){
        checked = value !== falseValue
    }else{
        checked = !!value;
    }

    const _onChange = useCallback((t: boolean) => {
        if(onChange){
            let value = false;
            if(typeof trueValue !== 'undefined' && t){
                value = trueValue
            }
            if(typeof falseValue !== 'undefined' && !t){
                value = falseValue
            }
            onChange(value)
        }
    }, [trueValue, falseValue, onChange])

    // inline
    if(label){
        return <Row gutter={15} style={{marginBottom: 10, marginTop: marginTop || 30, lineHeight: "30px"}} align="middle">
            <Col span={8}>
                {label}
            </Col>
            <Col span={16}>
                <Switch checked={checked} onChange={_onChange} />
            </Col>
        </Row>
    }

    return <Switch checked={checked} onChange={_onChange} />
}

export default SwitchP
