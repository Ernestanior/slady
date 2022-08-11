import {FC, useMemo} from "react";
import {Col, Row, DatePicker, InputNumber, Space} from "antd";
import {IFormComponent} from "@/common/interface";
import moment from "moment";
import {WarningOutlined} from "@ant-design/icons";
import isMobile from "@/app/isMobile";

const { RangePicker } = DatePicker;

interface IProps{
    startDate: moment.Moment;
}

const Period:FC<IFormComponent<number> & IProps> = ({onChange, startDate, value}) => {
    const endDate = useMemo(() => {
        if(value){
            return startDate.clone().add(value, "day")
        }
        return startDate.clone()
    }, [value, startDate])

    const displayRange = useMemo(() => {
        // 测试日期已经早于今日结束
        const range = endDate.diff(startDate, "day");
        return range > 0 ? range : 0;
    }, [startDate, endDate])


    const rangeChange = (e:any) => {
        if(typeof e === "number"){
            if(e !== displayRange){
                onChange && onChange(e)
            }
        }
    };

    return <Row gutter={15}>
        <Col span={isMobile?10:6}>
            <InputNumber value={displayRange} onChange={rangeChange} addonAfter="天"/>
        </Col>
        <Col span={isMobile?24:18}>
            <Space style={isMobile?{marginTop:10}:{}}>
                <RangePicker
                    style={isMobile?{width:'60vw'}:{}}
                    disabled={[true, false]}
                    value={[startDate, endDate]}
                    onChange={values => {
                        if(Array.isArray(values)){
                            let _startDate = startDate;
                            let _endDate = endDate;
                            if(values[0]){
                                _startDate = values[0];
                            }
                            if(values[1]){
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
