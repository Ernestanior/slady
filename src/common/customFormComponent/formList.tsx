import React, {FC, useCallback, useMemo} from "react";
import {Row, Col, Input, Button} from "antd";
import {PlusOutlined, DeleteOutlined} from "@ant-design/icons"
import {IFormComponent, ILabelModule} from "@/common/interface";


const FormStringList:FC<IFormComponent & ILabelModule> = ({text,value, onChange}) => {
    const displayValue: string[] = useMemo(() => {
        if(!value){
            return [""]
        }
        return value
    }, [value])

    const addRow = useCallback(() => {
        const _value = Array.isArray(value) ? [...value] : [];
        _value.push("");
        onChange && onChange(_value)
    }, [value, onChange])

    const delRow = useCallback((idx: number) => {
        const _value = Array.isArray(value) ? [...value] : []
        if(_value.length < 2){
            return;
        }
        _value.splice(idx, 1);
        onChange && onChange(_value)
    }, [value, onChange])

    return <section>
        <Row gutter={15}>
            <Col span={5}>
                {text}
            </Col>
            <Col span={19}>
                <Button size="small" onClick={addRow} type="link">
                    <PlusOutlined />
                </Button>
            </Col>
        </Row>
        {displayValue.map((item, idx) => {
            return <Row gutter={15} key={idx} align="middle" style={{marginTop: idx > 0 ? 15: 10}}>
                <Col flex={1}>
                    <Input value={item} onChange={e => {
                        const _value = [...value];
                        _value[idx] = e.target.value;
                        onChange && onChange(_value)
                    }} />
                </Col>
                <Col>
                    <DeleteOutlined onClick={() => delRow(idx)} />
                </Col>
            </Row>
        })}
    </section>
}

export default FormStringList
