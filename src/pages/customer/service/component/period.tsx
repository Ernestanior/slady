import {FC, useCallback, useEffect, useState} from "react";
import {Col, Row, DatePicker, InputNumber} from "antd";
import {IFormComponent} from "@/common/interface";
import moment from "moment";

const { RangePicker } = DatePicker;

const Period:FC<IFormComponent> = ({onChange}) => {
    const [startDate, setStartDate] = useState<moment.Moment>(moment());
    const [endDate, setEndDate] = useState<moment.Moment>(moment())
    const rangeChange = useCallback((e) => {
        if(typeof e === "number"){
            // 设置end
            setEndDate(startDate.clone().add(e, "days"))
        }
    }, [startDate])

    useEffect(() => {
        console.log(endDate.diff(startDate, 'day'))
        onChange && onChange(endDate.diff(startDate, 'day'))
    }, [startDate, endDate, onChange])

    return <Row gutter={15}>
        <Col span={6}>
            <InputNumber onChange={rangeChange} addonAfter="天"/>
        </Col>
        <Col span={18}>
            <RangePicker
                disabled={[true, false]}
                value={[startDate, endDate]}
                onChange={values => {
                    if(Array.isArray(values)){
                        if(values[0]){
                            setStartDate(values[0])
                        }
                        if(values[1]){
                            setEndDate(values[1])
                        }
                    }
                }}
            />
        </Col>
    </Row>
}

export default Period
