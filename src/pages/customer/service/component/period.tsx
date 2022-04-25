import {FC, useMemo, useState} from "react";
import {Col, Row, DatePicker, InputNumber, Space} from "antd";
import {IFormComponent} from "@/common/interface";
import moment from "moment";
import {WarningOutlined} from "@ant-design/icons";

const { RangePicker } = DatePicker;

interface IProps{
    start: string;
    end: string;
}

const Period:FC<IFormComponent & IProps> = ({onChange, start, end}) => {
    const [startDate, setStartDate] = useState<moment.Moment>(moment(start, "YYYY/MM/DD"));
    const [endDate, setEndDate] = useState<moment.Moment>(moment(end, "YYYY/MM/DD"))
    const rangeChange = (e:any) => {
        if(typeof e === "number"){
            // 设置end
            const _endDate = startDate.clone().add(e, "day")
            setEndDate(_endDate)
            onChange && onChange(_endDate.diff(startDate, 'day'))
        }
    };

    const displayRange = useMemo(() => {
        // 测试日期已经早于今日结束
        const range = endDate.diff(startDate, "day");
        return range > 0 ? range : 0;
    }, [startDate, endDate])

    return <Row gutter={15}>
        <Col span={6}>
            <InputNumber value={displayRange} onChange={rangeChange} addonAfter="天"/>
        </Col>
        <Col span={18}>
            <Space>
                <RangePicker
                    disabled={[true, false]}
                    value={[startDate, endDate]}
                    onChange={values => {
                        if(Array.isArray(values)){
                            let _startDate = startDate;
                            let _endDate = endDate;
                            if(values[0]){
                                _startDate = values[0];
                                setStartDate(values[0])
                            }
                            if(values[1]){
                                setEndDate(values[1])
                                _endDate = values[1];
                            }
                            onChange && onChange(_endDate.diff(_startDate, 'day'))
                        }
                    }}
                />
                {endDate.isBefore(moment(), "day") && <span className="tip-warn">
                    <WarningOutlined style={{marginRight: 5}} />
                    已过期
                </span>}
            </Space>
        </Col>
    </Row>
}

export default Period
