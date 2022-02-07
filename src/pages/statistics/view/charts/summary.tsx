import {FC, useEffect, useMemo, useState} from "react";
import {IIDModule} from "@/common/interface";
import {Col, Progress, Row, Space} from "antd";
import {from} from "rxjs";
import request from "@/store/request";
import {customerService} from "@/store/apis/account";
import ProgressCenter from "@/pages/statistics/view/charts/progressCenter";
import "./summary.less"

const CustomerSummary:FC<IIDModule> = ({id}) => {
    // 域名额度
    const [domain, setDomain] = useState({
        totalAmount: 0,
        usedAmount: 0
    })

    const percent = useMemo(() => {
        if(!domain.totalAmount){
            return 100;
        }
        return Math.ceil(domain.usedAmount / domain.totalAmount * 100);
    }, [domain])

    // 防御额度
    const [defence, setDefence] = useState<any>({
        totalAmount: 0,
        usedAmount: 0
    })

    useEffect(() => {
        if(id){
            const sub = from(request<any>(customerService.GetCustomerPackage({ id }, {}))).subscribe(res => {
                if(res.isSuccess && res.result){
                    setDomain({
                        totalAmount: parseInt(res.result.domainBalance.totalAmount),
                        usedAmount: parseInt(res.result.domainBalance.usedAmount)
                    })
                    setDefence(res.result.defenceBalance)
                }else{
                    setDomain({
                        totalAmount: 0,
                        usedAmount: 0
                    })
                    setDefence({
                        totalAmount: 0,
                        usedAmount: 0
                    })
                }
            })
            return () => sub.unsubscribe()
        }
    }, [id])

    if(!id){
        return null;
    }

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
                                        <span>未用</span>
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
