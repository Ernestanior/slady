import {FC, useEffect, useMemo, useState} from "react";
import FormItem from "@/common/Form/formItem";
import {Checkbox, CheckboxOptionType, Col, Input, Row} from "antd"
import {agentService, saleService} from "@/store/apis/account";
import {forkJoin} from "rxjs";
import request from "@/store/request";
import isMobile from "@/app/isMobile";
const CheckboxGroup = Checkbox.Group;

const AssignCustomerForm:FC = () => {
    const [customerList, setCustomerList] = useState<CheckboxOptionType[]>([]);
    const [agentList, setAgentList] = useState<CheckboxOptionType[]>([]);
    const span = useMemo(()=>isMobile?24:8,[])

    useEffect(() => {
        const config = saleService.QueryAllCustomerCanAssign({}, {});
        const config2 = agentService.FindAll({}, {});
        const sub = forkJoin([request<any[]>(config), request<any[]>(config2)]).subscribe(res => {
            if(res[0].isSuccess && res[0].result){
                // const {assigned, unAssigned} = res[0].result;
                setCustomerList(res[0].result.map(item => ({
                    value: item.id,
                    label: `${item.name}`
                })))
            }
            if(res[1].isSuccess && res[1].result){
                setAgentList(res[1].result.map(item => ({
                    value: item.id,
                    label: `${item.userEmail}`
                })))
            }
        })
        return () => sub.unsubscribe()
    }, [])

    return <section>
        <section className="cdn-block" style={{width: "100%"}}>
            <FormItem label={<h3>直属客户</h3>} name="customerIds">
                <CheckboxGroup>
                    <Row gutter={[15, 15]}>
                        {
                            customerList.map(item => (<Col key={item.value as string} span={span}>
                                <Checkbox value={item.value}>{item.label}</Checkbox>
                            </Col>))
                        }
                    </Row>
                </CheckboxGroup>
            </FormItem>
        </section>
        <br/>
        <section className="cdn-block" style={{width: "100%"}}>
            <FormItem label={<h3>代理</h3>} name="agentIds">
                <CheckboxGroup>
                    <Row gutter={[15, 15]}>
                        {
                            agentList.map(item => (<Col key={item.value as string} span={span}>
                                <Checkbox value={item.value}>{item.label}</Checkbox>
                            </Col>))
                        }
                    </Row>
                </CheckboxGroup>
            </FormItem>
        </section>
        <FormItem hidden name="saleId">
            <Input />
        </FormItem>
    </section>
}

export default AssignCustomerForm
