import {FC, useCallback, useEffect, useState} from "react";
import {Breadcrumb, Form} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import {useForm} from "antd/es/form/Form";
import Footer from "@/common/Form/footer";
import {Link} from "react-router-dom";
import {saleService} from "@/store/apis/account";
import {forkJoin, from} from "rxjs";
import request from "@/store/request";
import historyService from "@/store/history";
import {reqAndCallback} from "@/common/utils";
import useUrlParamsId from "@/hooks/useUrlParams";
import AssignCustomerForm from "@/pages/sale/assignCustomerForm";

/**
 * 表单
 * @constructor
 */
const AssignSale:FC = () => {
    const [form] = useForm();

    const id = useUrlParamsId("/sale/assign/:id");

    useEffect(() => {
        if(id){
            const config1 = saleService.QueryCustomerBySaleId({saleId: id}, {});
            const config2 = saleService.QueryAgentBySaleId({saleId: id}, {});
            const sub = forkJoin([request<any>(config1), request<any>(config2)]).subscribe(res => {
                let customerIds = [];
                let agentIds = []
                if(res[0].isSuccess && res[0].result){
                    const list:any[] = res[0].result[id] || [];
                    customerIds = list.map(customer => customer.id);
                }
                if(res[1].isSuccess && res[1].result){
                    agentIds  = res[1].result[id] || [];
                }
                form.setFieldsValue({
                    saleId: id,
                    customerIds,
                    agentIds
                })
            })
            return () => sub.unsubscribe();
        }
    }, [id, form])

    // 创建客户
    const assignCustomer = useCallback(() => {
        let data = form.getFieldsValue();
        const config = saleService.AssignCustomer({}, data);
        reqAndCallback(config, () => {
            historyService.push("/sale")
        })

    },[form]);

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>分配</div>
        <Form layout="vertical" form={form}>
            <AssignCustomerForm />
            <Footer marginBottom={30} submit={assignCustomer} cancel={() => { form.resetFields(); historyService.push("/sale") }} />
        </Form>
    </section>
}

const SaleAssignPage:FC = () => {
    const [sale, setSale] = useState<any>(null)

    const id = useUrlParamsId("/sale/assign/:id");

    useEffect(() => {
        if(id){
            const config = saleService.FindOne({saleId: id}, {});
            const sub = from(request(config)).subscribe(res => {
                if(res.isSuccess && res.result){
                    const sale:any = res.result;
                    setSale(sale)
                }
            })
            return () => sub.unsubscribe();
        }
    }, [id])

    return <section>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <Link to= "/sale">
                    <HomeOutlined />
                    <span style={{marginLeft: 5}}>销售管理</span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>销售: {sale && sale.name}</Breadcrumb.Item>
        </Breadcrumb>
        <AssignSale />
    </section>
}

export default SaleAssignPage;
