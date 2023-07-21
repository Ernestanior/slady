import React, {FC} from "react";
import Template from "@/common/template";
import {accessLogService} from "@/store/apis/log";
const Import:FC = () => {

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

export default Import

const columns = [
    {
        dataIndex: "pic",
        title: "入库商品",
        render:(pic:string)=><img alt="" src={pic}/>
    },
    {
        dataIndex: "designId",
        title: "设计师号",
    },
    {
        dataIndex: "color",
        title: "颜色",
    },
    {
        dataIndex: "size",
        title: "尺码",
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


