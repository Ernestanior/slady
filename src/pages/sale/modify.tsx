import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Breadcrumb, Form, Row} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import {useForm} from "antd/es/form/Form";
import Footer from "@/common/Form/footer";
import {Link, useRouteMatch} from "react-router-dom";
import {saleService} from "@/store/apis/account";
import {from, Subject} from "rxjs";
import request from "@/store/request";
import SaleForm from "@/pages/sale/form";
import historyService from "@/store/history";
import {reqAndCallback} from "@/common/utils";

const sale$ = new Subject<any>();

/**
 * 表单
 * @constructor
 */
const ModifySale:FC = () => {
    const [sale, setSale] = useState({})
    const [form] = useForm();
    
    // 创建客户
    const modifyCustomer = useCallback(() => {
        let data = form.getFieldsValue();
        data = {...sale, ...data}
        const config = saleService.ModifySale({}, data);
        reqAndCallback(config, () => {
            historyService.push("/sale")
        })
        
    },[form, sale]);

    useEffect(() => {
        const sub = sale$.subscribe(sale => {
            form.setFieldsValue(sale)
            setSale(sale);
        })
        return () => sub.unsubscribe();
    }, [form])

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>修改</div>
        <Form layout="vertical" form={form}>
            <Row gutter={15}>
                <SaleForm />
            </Row>
            <Footer marginBottom={30} submit={modifyCustomer} cancel={() => { form.resetFields(); historyService.push("/sale") }} />
        </Form>
    </section>
}

const ModifySalePage:FC = () => {
    const [sale, setSale] = useState<any>(null)

    const url = useRouteMatch<{ id: string }>("/sale/modify/:id");
    const id = useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return parseInt(url.params.id)
            }
        }
    }, [url])

    useEffect(() => {
        if(id){
            const config = saleService.viewSale({saleId: id}, {});
            const sub = from(request(config)).subscribe(res => {
                if(res.isSuccess && res.result){
                    const sale:any = res.result;
                    setSale(sale)
                    sale$.next(sale)
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
            <Breadcrumb.Item>客户: {sale && sale.name}</Breadcrumb.Item>
        </Breadcrumb>
        <ModifySale />
    </section>
}

export default ModifySalePage;
