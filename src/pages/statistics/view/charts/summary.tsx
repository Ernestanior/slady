import {FC, useMemo} from "react";
import {Col, Progress, Row, Space} from "antd";
import ProgressCenter from "@/pages/statistics/view/charts/progressCenter";
import "./summary.less"

interface IProps{
    domain: any;
    defence: any;
}

const CustomerSummary:FC<IProps> = ({domain, defence}) => {
    const percent = useMemo(() => {
        if(!domain.totalAmount){
            return 100;
        }
        return Math.ceil(domain.usedAmount / domain.totalAmount * 100);
    }, [domain])

    if(!domain.totalAmount){
        return null;
    }

    return <section className="customer-summary">
        <Row gutter={15}>
            <Col span={12}>
                <div className="cdn-block">
                    <Row gutter={15}>
                        <Col flex={1}>
                            <p className="cdn-block-title">域名额度</p>
                            <div className="label-text">
                                <div>{domain.usedAmount}/{domain.totalAmount}</div>
                                <div className="label-text-square">
                                    <Space>
                                        <span className="unUsed" />
                                        <span>未用</span>
                                        <span className="used" />
                                        <span>已用</span>
                                    </Space>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <Progress
                                width={150}
                                type="circle"
                                strokeLinecap="square"
                                percent={percent}
                                format={(percent) => {
                                    return <ProgressCenter>
                                        <span className="domain">
                                            <span className="total">
                                                {domain.totalAmount}
                                            </span>
                                            <br/>
                                            <span className="percent">
                                                {percent}%已用
                                            </span>
                                        </span>
                                    </ProgressCenter>
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col span={12}>
                <div className="cdn-block">
                    <Row gutter={15}>
                        <Col flex={1}>
                            <p className="cdn-block-title">防御额度</p>
                            <div className="label-text">
                                <div>{defence.totalAmount === "-1" ? "Unlimited" : `${defence.totalAmount}GB`}</div>
                            </div>
                        </Col>
                        <Col>
                            <Progress
                                width={150}
                                type="circle"
                                strokeLinecap="square"
                                percent={0}
                                format={() => {
                                    return <ProgressCenter>
                                        <span className="defence">
                                            <span className="total">
                                                {defence.totalAmount === "-1" ? "Unlimited" : defence.totalAmount}
                                                {defence.totalAmount !== "-1" && <em>GB</em>}
                                            </span>
                                        </span>
                                    </ProgressCenter>
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </section>
}

export default CustomerSummary
