import {FC, useEffect} from "react";
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom";
import CreateCustomer from "@/pages/customer/parts/createCustomer";
import useSaleInfo from "@/store/account/useSaleInfo";
import {E_USER_TYPE} from "@/store/account/interface";

const CreateCustomerPage:FC = () => {
    const info = useSaleInfo();

    useEffect(() => {
        if(info && info.type === E_USER_TYPE.SALE){
            CreateCustomer.loadData({
                saleId: info.id
            })
        }
    }, [info])

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
        <CreateCustomer.UI visible={!!info} />
    </section>
}

export default CreateCustomerPage;
