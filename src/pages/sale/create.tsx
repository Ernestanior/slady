import {E_USER_TYPE} from "@/store/account/service";
import {Breadcrumb, Form, Row} from "antd";
import {FC, useCallback} from "react";
import Footer from "@/common/Form/footer";
import {useForm} from "antd/es/form/Form";
import {saleService} from "@/store/apis/account";
import {reqAndCallback} from "@/common/utils";
import historyService from "@/store/history";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import SaleForm from "@/pages/sale/form";

export const SALE_LIST = [
    {
        id: E_USER_TYPE.SALE,
        name: "销售"
    },
    {
        id: E_USER_TYPE.SALE_MANAGER,
        name: "销售经理"
    }
]

const CreateSale:FC = () => {
    const [form] = useForm()

    const submit = useCallback(() => {
        const data = form.getFieldsValue();
        const config = saleService.CreateSale({}, data);
        reqAndCallback(config, () => {
            historyService.push("/sale")
        })
    }, [form])

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>新增</div>
        <Form layout="vertical" form={form}>
            <section className="cdn-block">
                <Row gutter={15}>
                    <SaleForm />
                </Row>
            </section>
            <Footer marginBottom={30} submit={submit} cancel={() => { form.resetFields(); historyService.push("/sale") }} />
        </Form>
    </section>
}

const CreateSalePage:FC = () => {
    return <section>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <Link to= "/sale">
                    <HomeOutlined />
                    <span style={{marginLeft: 5}}>销售管理</span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>新增销售</Breadcrumb.Item>
        </Breadcrumb>
        <CreateSale />
    </section>
}

export default CreateSalePage;