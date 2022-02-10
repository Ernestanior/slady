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
import {agentService, customerService} from "@/store/apis/account";
import {analysisDnsServer} from "@/pages/customer/service/dnsServer";
import {from, Subject} from "rxjs";
import request from "@/store/request";
import historyService from "@/store/history";
import ConditionShow from "@/common/conditionShow";
import {IDisableModule} from "@/common/interface";
import FormItem from "@/common/Form/formItem";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";
import SaleSelector from "@/pages/sale/saleSelector";
import useAsyncData from "@/common/event/async";
import useFieldsChange from "@/common/event/useFieldsChange";
import {E_L_CUSTOMER_TYPE, E_L_USER_TYPE} from "@/common/const";

const customer$ = new Subject<any>();

// 类型不可编辑
const disableMap: IDisableModule = {
    disableProperty: {
        type: true,
        customerType: true
    }
}

/**
 * 表单
 * @constructor
 */
const ModifyCustomer:FC = () => {
    const info = useAccountInfo();
    const [customer, setCustomer] = useState<any>({})
    const [form] = useForm();

    // 创建客户
    const modifyCustomer = useCallback(() => {
        let data = form.getFieldsValue();
        data = {...customer, ...data}
        let config;
        // 代理编辑
        if(data.customerType === E_L_USER_TYPE[2].id){
            config = agentService.ModifyAgent({}, {
                id: data.id,
                name: data.name,
                email: data.email,
                dnsValue: data.dnsValue,
                saleId: data.saleId
            })
        }else{
            // 创建的带宽单位是MB，后台接受的带宽是B
            data.limitBandwidth = data.limitBandwidth * 1000000;
            data = analysisDnsServer(data);
            // 直属客户，删除agentId
            if(data.customerType === E_L_CUSTOMER_TYPE[0].id){
                delete data.agentId;
            }
            config = customerService.ModifyCustomer({}, data);
        }
        from(request(config)).subscribe((res) => {
            if (res.isSuccess) {
                historyService.push("/customer")
            }
        });
    },[form, customer]);

    // 创建表单同步
    const [data$, loadData] = useAsyncData();

    useEffect(() => {
        const sub = customer$.subscribe(customer => {
            form.setFieldsValue({...customer})
            setCustomer(customer);
            // 计算直属还是销售客户
            loadData({...customer});
        })
        return () => sub.unsubscribe();
    }, [form, loadData])

    // 特殊设置
    const fieldChangeEvent = useCallback((res) => {
        loadData(res);
        if(res.hasOwnProperty("limitMasterDomains")){
            form.setFieldsValue({
                limitCerts: res.limitMasterDomains
            })
        }
    }, [form, loadData])

    const onFieldsChange = useFieldsChange(fieldChangeEvent);

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>修改</div>
        <Form layout="vertical" form={form} onFieldsChange={onFieldsChange}>
            <ConditionShow removeMode visible={!!Object.keys(customer).length}>
                <section className="cdn-block">
                    <Row gutter={15}>
                        <FormItem name="saleId" span={12} hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} label="选择销售">
                            <SaleSelector/>
                        </FormItem>
                    </Row>
                </section>
                <section style={{ marginTop: 15 }}>
                    <Account isModify event$={data$} />
                </section>
                <ConditionShow  visible={customer.customerType !== E_L_USER_TYPE[2].id}>
                    <section style={{ marginTop: 15 }}>
                        <CdnService initialSwitch={1} event$={data$} disableProperty={disableMap.disableProperty}/>
                    </section>
                </ConditionShow>
                {/*<section style={{ marginTop: 15 }}>*/}
                {/*    <DnsService form={form} initialValue={customer} />*/}
                {/*</section>*/}
                <section style={{ marginTop: 15 }}>
                    <Description />
                </section>
                <Footer marginBottom={30} submit={modifyCustomer} cancel={() => { form.setFieldsValue({...customer}) }} />
            </ConditionShow>
        </Form>
    </section>
}

const ModifyCustomerPage:FC = () => {
    const [customer, setCustomer] = useState<any>()
    const url = useRouteMatch<{ id: string, type: string }>("/customer/modify/:type/:id");
    const id = useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return parseInt(url.params.id)
            }
        }
    }, [url])

    const type = useMemo(() => {
        if(url && url.params){
            return url.params.type
        }
    }, [url])

    useEffect(() => {
        if(id && type){
            if(type !== "agent"){
                const config = customerService.FindOne({id}, {});
                const sub = from(request(config)).subscribe(res => {
                    if(res.isSuccess && res.result){
                        const _customer:any = res.result;
                        // 压缩带宽单位
                        _customer.limitBandwidth = _customer.limitBandwidth / 1000000;
                        // 客户
                        // 计算直属or代理客户
                        if(!_customer.agentId){
                            // 直属
                            _customer.customerType = E_L_CUSTOMER_TYPE[0].id;
                        }else{
                            _customer.customerType = E_L_CUSTOMER_TYPE[1].id;
                        }
                        setCustomer(_customer)
                        customer$.next(_customer)
                    }
                })
                return () => sub.unsubscribe();
            }else{
                const config = agentService.FindOne({agentId: id}, {});
                const sub = from(request<any>(config)).subscribe(res => {
                    if(res.isSuccess && res.result){
                        const _customer:any = {
                            name: res.result.userName,
                            email: res.result.userEmail,
                            dnsValue: res.result.dnsValue,
                            id: res.result.id,
                            saleId: res.result.saleId,
                            customerType: E_L_USER_TYPE[2].id
                        };
                        customer$.next(_customer)
                        setCustomer(_customer)
                    }
                })
                return () => sub.unsubscribe();
            }
        }
    }, [id, type])

    return <section key={id}>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <Link to= "/customer">
                    <HomeOutlined />
                    <span style={{marginLeft: 5}}>客户管理</span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                客户: {customer && customer.name}
            </Breadcrumb.Item>
        </Breadcrumb>
        <ModifyCustomer />
    </section>
}

export default ModifyCustomerPage;
