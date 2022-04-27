import {FC, useEffect, useMemo, useState} from "react";
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import {Link, useRouteMatch} from "react-router-dom";
import {agentService, customerService} from "@/store/apis/account";
import {from} from "rxjs";
import request from "@/store/request";
import {E_L_CUSTOMER_TYPE, E_L_USER_TYPE} from "@/common/const";
import ModifyCustomer from "@/pages/customer/parts/modifyCustomer";


const ModifyCustomerPage:FC = () => {
    const [customer, setCustomer] = useState<any>(null)
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
                            // 移除 0
                            delete _customer.agentId;
                            // 直属
                            _customer.customerType = E_L_CUSTOMER_TYPE[0].id;
                        }else{
                            _customer.customerType = E_L_CUSTOMER_TYPE[1].id;
                        }
                        setCustomer(_customer)
                        ModifyCustomer.loadData({
                            ..._customer,
                            isModify: true
                        })
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
                        setCustomer(_customer)
                        ModifyCustomer.loadData({
                            ..._customer,
                            isModify: true
                        })
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
        <ModifyCustomer.UI visible={!!customer} />
    </section>
}

export default ModifyCustomerPage;
