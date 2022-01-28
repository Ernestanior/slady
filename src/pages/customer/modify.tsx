import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Breadcrumb, Form, Row} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import Account from "@/pages/customer/service/account";
import CdnService from "@/pages/customer/service/cdnService";
import {useForm} from "antd/es/form/Form";
import Footer from "@/common/Form/footer";
import Description from "@/pages/customer/service/description";
// import DnsService from "@/pages/customer/service/dnsService";
import {Link, useRouteMatch} from "react-router-dom";
import {customerService} from "@/store/apis/account";
import {analysisDnsServer} from "@/pages/customer/service/dnsServer";
import {from, Subject} from "rxjs";
import request from "@/store/request";
import historyService from "@/store/history";
import ConditionShow from "@/common/conditionShow";
import CustomerListSelector from "@/pages/common/customerListSelector";
import {IDisableModule} from "@/common/interface";
import FormItem from "@/common/Form/formItem";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";

const customer$ = new Subject<any>();

// 类型不可编辑
const disableMap: IDisableModule = {
    disableProperty: {
        type: true
    }
}

/**
 * 表单
 * @constructor
 */
const ModifyCustomer:FC = () => {
    const info = useAccountInfo();
    const [customer, setCustomer] = useState({})
    const [form] = useForm();
    // 创建客户
    const modifyCustomer = useCallback(() => {
        let data = form.getFieldsValue();
        data = {...customer, ...data}
        // 创建的带宽单位是MB，后台接受的带宽是B
        data.limitBandwidth = data.limitBandwidth * 1000000;
        data = analysisDnsServer(data);
        const config = customerService.ModifyCustomer({}, data);
        from(request(config)).subscribe((res) => {
            if (res.isSuccess) {
                historyService.push("/customer")
            }
        });
    },[form, customer]);

    useEffect(() => {
        const sub = customer$.subscribe(customer => {
            form.setFieldsValue(customer)
            setCustomer(customer);
        })
        return () => sub.unsubscribe();
    }, [form])

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>修改</div>
        <Form layout="vertical" form={form}>
            <ConditionShow removeMode visible={!!Object.keys(customer).length}>
                <section className="cdn-block">
                    <Row gutter={15}>
                        <FormItem hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} label="选择销售">

                        </FormItem>
                    </Row>
                </section>
                <Account form={form} initialValue={customer} />
                <section style={{ marginTop: 15 }}>
                    <CdnService form={form} initialSwitch={1} initialValue={customer} disableProperty={disableMap.disableProperty}/>
                </section>
                {/*<section style={{ marginTop: 15 }}>*/}
                {/*    <DnsService form={form} initialValue={customer} />*/}
                {/*</section>*/}
                <section style={{ marginTop: 15 }}>
                    <Description />
                </section>
                <Footer marginBottom={30} submit={modifyCustomer} cancel={() => { historyService.push("/customer") }} />
            </ConditionShow>
        </Form>
    </section>
}

const ModifyCustomerPage:FC = () => {
    const url = useRouteMatch<{ id: string }>("/customer/modify/:id");
    const id = useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return parseInt(url.params.id)
            }
        }
    }, [url])

    useEffect(() => {
        if(id){
                const config = customerService.FindOne({id}, {});
                const sub = from(request(config)).subscribe(res => {
                    if(res.isSuccess && res.result){
                        const _customer:any = res.result;
                        // 压缩带宽单位
                        _customer.limitBandwidth = _customer.limitBandwidth / 1000000;
                        // 解决试用期的问题
                        if(_customer.probation){
                            console.log(_customer.probationPeriod)
                        }
                        customer$.next(_customer)
                    }
                })
                return () => sub.unsubscribe();
        }
    }, [id])

    return <section key={id}>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <Link to= "/customer">
                    <HomeOutlined />
                    <span style={{marginLeft: 5}}>客户管理</span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                客户:
                <CustomerListSelector
                    value={id}
                    onChange={customerId => {
                        historyService.push(`/customer/modify/${customerId}`)
                    }}
                />
                {/*{customer && customer.name}*/}
            </Breadcrumb.Item>
        </Breadcrumb>
        <ModifyCustomer />
    </section>
}

export default ModifyCustomerPage;
