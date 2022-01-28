import {FC, useCallback} from "react";
import {Breadcrumb, Form} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import Account from "@/pages/customer/service/account";
import CdnService from "@/pages/customer/service/cdnService";
import {useForm} from "antd/es/form/Form";
import Footer from "@/common/Form/footer";
import Description from "@/pages/customer/service/description";
// import DnsService from "@/pages/customer/service/dnsService";
import {Link} from "react-router-dom";
import {customerService} from "@/store/apis/account";
import {analysisDnsServer} from "@/pages/customer/service/dnsServer";
import {from} from "rxjs";
import request from "@/store/request";
import historyService from "@/store/history";

/**
 * 表单
 * @constructor
 */
const CreateCustomer:FC = () => {
    const [form] = useForm();

    // 创建客户
    const createCustomer = useCallback(() => {
        let data = form.getFieldsValue();
        // 创建的带宽单位是MB，后台接受的带宽是B
        data.limitBandwidth = data.limitBandwidth * 1000000;
        data = analysisDnsServer(data);
        const config = customerService.CreateCustomer({}, data);
        from(request(config)).subscribe((res) => {
            if (res.isSuccess) {
                historyService.push("/customer")
            }
        });
    },[form]);

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>新增</div>
        <Form layout="vertical" form={form}>
            <Account form={form} />
            <section style={{ marginTop: 15 }}>
                <CdnService form={form} initialSwitch={1} />
            </section>
            {/*<section style={{ marginTop: 15 }}>*/}
            {/*    <DnsService form={form} />*/}
            {/*</section>*/}
            <section style={{ marginTop: 15 }}>
                <Description />
            </section>
            <Footer marginBottom={30} submit={createCustomer} cancel={() => { historyService.push("/sale") }} />
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
