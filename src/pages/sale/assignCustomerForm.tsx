import {FC, useEffect, useState} from "react";
import FormItem from "@/common/Form/formItem";
import {Checkbox, CheckboxOptionType, Col, Input, Row} from "antd"
import {agentService, saleService} from "@/store/apis/account";
import {forkJoin} from "rxjs";
import request from "@/store/request";
const CheckboxGroup = Checkbox.Group;

const AssignCustomerForm:FC = () => {
    const [customerList, setCustomerList] = useState<CheckboxOptionType[]>([]);
    const [agentList, setAgentList] = useState<CheckboxOptionType[]>([]);

    useEffect(() => {
        const config = saleService.QueryCustomerBySaleId({}, {});
        const config2 = agentService.FindAll({}, {});
        const sub = forkJoin([request<{assigned: any[]; unAssigned: any[]}>(config), request<any[]>(config2)]).subscribe(res => {
            if(res[0].isSuccess && res[0].result){
                const {assigned, unAssigned} = res[0].result;
                setCustomerList(assigned.concat(unAssigned).map(item => ({
                    value: item.id,
                    label: `${item.email}`
                })))
            }
            if(res[1].isSuccess && res[1].result){
                console.log(res[1].result)
                setAgentList(res[1].result.map(item => ({
                    value: item.id,
                    label: `${item.userEmail}`
                })))
            }
        })
        return () => sub.unsubscribe()
    }, [])

    return <section>
        <section className="cdn-block">
            <FormItem label="直属客户" name="customerIds">
                <CheckboxGroup>
                    <Row gutter={[15, 15]}>
                        {
                            customerList.map(item => (<Col key={item.value as string} span={8}>
                                <Checkbox value={item.value}>{item.label}</Checkbox>
                            </Col>))
                        }
                    </Row>
                </CheckboxGroup>
            </FormItem>
        </section>
        <section className="cdn-block">
            <FormItem label="代理" name="agentIds">
                <CheckboxGroup>
                    <Row gutter={[15, 15]}>
                        {
                            agentList.map(item => (<Col key={item.value as string} span={8}>
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
