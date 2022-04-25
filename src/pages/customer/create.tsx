import {FC} from "react";
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom";
import CreateCustomer from "@/pages/customer/parts/createCustomer";

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
        <CreateCustomer.UI />
    </section>
}

export default CreateCustomerPage;
