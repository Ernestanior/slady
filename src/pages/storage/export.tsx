import React, {FC} from "react";
import Template from "@/common/template";
import {accessLogService} from "@/store/apis/log";
const Export:FC = () => {


    return <section>
         <Template
            columns={columns}
            queryData={(data)=>accessLogService.FindAccessLog({},{
                ...data,uri:"/item/modify-stock"
            })}
            rowKey="id"
        />
    </section>
}

export default Export

const columns = [
    {
        dataIndex: "pic",
        title: "出库商品",
    },
    {
        dataIndex: "designId",
        title: "设计师号",
    },
    {
        dataIndex: "operator",
        title: "操作者",
    },
    {
        dataIndex: "time",
        title: "时间",
    },
]

