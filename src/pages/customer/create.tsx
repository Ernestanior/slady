import {FC} from "react";
import {Breadcrumb, Form} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import Account from "@/pages/customer/service/account";

/**
 * 表单
 * @constructor
 */
const CreateCustomer:FC = () => {
    return <section>
        <div>新增</div>
        <Form layout="vertical">
            <Account />
        </Form>
    </section>
}

const CreateCustomerPage:FC = () => {
    return <section>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <HomeOutlined />
                <span style={{marginLeft: 5}}>客户管理</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>新增客户</Breadcrumb.Item>
        </Breadcrumb>
        <CreateCustomer />
    </section>
}

export default CreateCustomerPage;