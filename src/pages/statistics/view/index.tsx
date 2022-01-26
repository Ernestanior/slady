import {FC} from "react";
import useUrlParamsId from "@/hooks/useUrlParams";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import CustomerSummary from "@/pages/statistics/view/charts/summary";

const ViewStatistics:FC = () => {
    const id = useUrlParamsId("/statistics/:id")

    if(!id){
        return null
    }

    return <section>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <Link to= "/statistics">
                    <HomeOutlined />
                    <span style={{marginLeft: 5}}>统计报表</span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>查看</Breadcrumb.Item>
        </Breadcrumb>
        <section>
            <CustomerSummary id={id} />
        </section>
    </section>
}

export default ViewStatistics
