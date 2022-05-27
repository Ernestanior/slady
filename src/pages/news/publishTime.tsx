import {FC, useMemo} from "react";
import {IFormComponent} from "@/common/interface";
import {Col, Row, DatePicker} from "antd";
import SelectP from "@/common/select";
import moment from "moment";

const publishTime = [
    {
        id: "now",
        name: "即时"
    },
    {
        id: "schedule",
        name: "自定义发布时间"
    }
]

const PublishTime:FC<IFormComponent<string>> = ({value, onChange}) => {
    const valueMe = useMemo(() => {
        if(!value){
            return "now"
        }
        return "schedule"
    }, [value])

    const timeValue = useMemo(() => {
        if(moment.isMoment(value)){
            return value
        }
        return undefined
    }, [value])

    return <Row gutter={15}>
        <Col span={12}>
            <SelectP
                value={valueMe}
                data={publishTime}
                onChange={e => {
                    if(e === "now"){
                        onChange && onChange(0)
                        return;
                    }
                    onChange && onChange(moment())
                }}
            />
        </Col>
        <Col span={12} hidden={valueMe !== "schedule"}>
            <DatePicker
                value={timeValue}
                showTime
                onChange={onChange}
            />
        </Col>
    </Row>
}

export default PublishTime