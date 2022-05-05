import {FC, useCallback} from "react";
import createObserverForm, {IObserverForm} from "@/hoc/createObserverForm";
import useAccountInfo from "@/store/account";
import useObserver from "@/hoc/useObserver";
import {E_L_CUSTOMER_TYPE, E_L_USER_TYPE} from "@/common/const";
import {notification, Row} from "antd";
import {agentService, customerService} from "@/store/apis/account";
import {from} from "rxjs";
import request from "@/store/request";
import historyService from "@/store/history";
import ConditionShow from "@/common/conditionShow";
import {E_USER_TYPE} from "@/store/account/interface";
import FormItem from "@/common/Form/formItem";
import SaleSelector from "@/pages/sale/saleSelector";
import Description from "@/pages/customer/service/description";
import Footer from "@/common/Form/footer";
import Account from "@/pages/customer/parts/account";
import CDN from "@/pages/customer/parts/cdn";
import DNS, {setDnsData} from "@/pages/customer/parts/dns";

/**
 * 表单
 * @constructor
 */
const CustomerForm:FC<IObserverForm> = ({form, data$}) => {
    const info = useAccountInfo();

    const formData = useObserver(data$, {
        customerType: E_L_USER_TYPE[0].id
    })

    const modifyEvent = useCallback(() => {
        let data = form.getFieldsValue();
        if(data.email){
            data.email = data.email.trim();
        }
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
            // DNS设置转换
            data = setDnsData(data)
            // 创建的带宽单位是MB，后台接受的带宽是B
            data.limitBandwidth = data.limitBandwidth * 1000000;
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
    }, [form])

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>修改</div>
        <ConditionShow className="cdn-block" visible={!!info && info.type === E_USER_TYPE.SALE_MANAGER}>
            <Row gutter={15}>
                <FormItem name="saleId" span={12} hidden={!!info && info.type !== E_USER_TYPE.SALE_MANAGER} label="选择销售">
                    <SaleSelector/>
                </FormItem>
            </Row>
        </ConditionShow>
        <section style={{ marginTop: 15 }}>
            <Account form={form} data$={data$}/>
        </section>
        <FormItem hidden={formData.customerType === E_L_USER_TYPE[2].id}>
            <section style={{ marginTop: 15 }}>
                <CDN form={form} data$={data$}/>
            </section>
        </FormItem>
        <FormItem hidden={formData.customerType === E_L_USER_TYPE[2].id}>
            <section style={{ marginTop: 15 }}>
                <DNS form={form} data$={data$}/>
            </section>
        </FormItem>
        <section style={{ marginTop: 15 }}>
            <Description />
        </section>
        <Footer marginBottom={30} submit={modifyEvent} cancel={() => { historyService.push("/customer") }} />
    </section>
}

const ModifyCustomer = createObserverForm(CustomerForm, {
    layout: "vertical"
})

export default ModifyCustomer
