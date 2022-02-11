import {FC, useCallback, useEffect, useState} from "react";
import {Breadcrumb, Form, notification, Row} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import Account from "@/pages/customer/service/account";
import CdnService from "@/pages/customer/service/cdnService";
import {useForm} from "antd/es/form/Form";
import Footer from "@/common/Form/footer";
import Description from "@/pages/customer/service/description";
// import DnsService from "@/pages/customer/service/dnsService";
import {Link} from "react-router-dom";
import {agentService, customerService} from "@/store/apis/account";
import {analysisDnsServer} from "@/pages/customer/service/dnsServer";
import {from} from "rxjs";
import request from "@/store/request";
import historyService from "@/store/history";
import useFieldsChange from "@/common/event/useFieldsChange";
import useAsyncData from "@/common/event/async";
import FormItem from "@/common/Form/formItem";
import {E_USER_TYPE} from "@/store/account/interface";
import SaleSelector from "@/pages/sale/saleSelector";
import useAccountInfo from "@/store/account";
import useSaleInfo from "@/store/account/useSaleInfo";
import {E_L_USER_TYPE} from "@/common/const";
import ConditionShow from "@/common/conditionShow";

/**
 * 表单
 * @constructor
 */
const CreateCustomer:FC = () => {
    const info = useAccountInfo();
    const saleInfo = useSaleInfo();
    const [form] = useForm();

    // 创建代理
    const [createAgent, setCreateAgent] = useState(false);

    // 创建客户
    const createCustomer = useCallback(() => {
        let data = form.getFieldsValue();
        // 创建的带宽单位是MB，后台接受的带宽是B
        data.limitBandwidth = data.limitBandwidth * 1000000;
        data = analysisDnsServer(data);
        if(data.customerType === E_L_USER_TYPE[1].id){
            if(!data.agentId){
                // 客户类型为代理下的客户，但是并未选择代理
                if(!data.agentId){
                    notification.error({
                        message: "客户类型为代理下的客户，但是并未选择代理!"
                    })
                }
                return;
            }
        }
        let config;
        // 创建代理
        if(data.customerType === E_L_USER_TYPE[2].id){
            config = agentService.CreateAgent({},{
                name: data.name,
                email: data.email,
                dnsValue: data.dnsValue,
                saleId: data.saleId
            })
        }else{
            // 创建客户
            config = customerService.CreateCustomer({}, data);
        }
        from(request(config)).subscribe((res) => {
            if (res.isSuccess) {
                historyService.push("/customer")
            }
        });
    },[form]);

    // 创建表单同步
    const [data$, loadData] = useAsyncData();

    // 特殊设置
    const fieldChangeEvent = useCallback((res) => {
        loadData(res);
        if(res.hasOwnProperty("limitMasterDomains")){
            form.setFieldsValue({
                limitCerts: res.limitMasterDomains
            })
        }
        if(res.hasOwnProperty("customerType")){
            setCreateAgent(res.customerType === E_L_USER_TYPE[2].id);
        }
    }, [form, loadData])

    const onFieldsChange = useFieldsChange(fieldChangeEvent);

    useEffect(() => {
        // 自动设置当前销售
        if(saleInfo && saleInfo.type !== E_USER_TYPE.SALE_MANAGER){
            fieldChangeEvent({
                saleId: saleInfo.id
            })
            form.setFieldsValue({
                saleId: saleInfo.id
            })
        }
    }, [info, saleInfo, fieldChangeEvent, form])

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>新增</div>
        <Form layout="vertical" form={form} onFieldsChange={onFieldsChange}>
            <ConditionShow className="cdn-block" visible={!!info && info.type === E_USER_TYPE.SALE_MANAGER}>
                <Row gutter={15}>
                    <FormItem name="saleId" span={12} hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} label="选择销售">
                        <SaleSelector/>
                    </FormItem>
                </Row>
            </ConditionShow>
            <section style={{ marginTop: 15 }}>
                <Account event$={data$}/>
            </section>
            <FormItem hidden={createAgent}>
                <section style={{ marginTop: 15 }}>
                    <CdnService event$={data$} initialSwitch={1} />
                </section>
            </FormItem>
            {/*<section style={{ marginTop: 15 }}>*/}
            {/*    <DnsService form={form} />*/}
            {/*</section>*/}
            <section style={{ marginTop: 15 }}>
                <Description />
            </section>
            <Footer marginBottom={30} submit={createCustomer} cancel={() => { historyService.push("/customer") }} />
        </Form>
    </section>
}

const CreateCustomerPage:FC = () => {
    return <section>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <Link to= "/customer">
                    <HomeOutlined />
                    <span style={{marginLeft: 5}}>客户管理</span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>新增客户</Breadcrumb.Item>
        </Breadcrumb>
        <CreateCustomer />
    </section>
}

export default CreateCustomerPage;
