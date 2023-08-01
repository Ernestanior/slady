import React, {FC, useCallback} from "react";
import Template from "@/common/template/indexWithPagination";
import {accessLogService} from "@/store/apis/log";
import request, {dev_url} from "@/store/request";
import {IPageResult} from "@/store/apis/log/common.interface";
import moment from "moment";
const Import:FC = () => {

    const query = useCallback(async(data)=>{
        const config = accessLogService.FindAccessLog({},{
            ...data,uri:"/item/modify-stock"
        })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            const content=res?.result?.content.map((item)=> {
                return ({...JSON.parse(item.body),...item})
            })
            return ({...res.result,content}) as any
        }
        return null
    },[])
    return <section>
        <Template
            columns={columns}
            queryDataFunction={query}
            rowKey="id"
        />
    </section>
}

export default Import

const columns = [
    {
        dataIndex: "previewPhoto",
        title: "商品",
        render:(item:any)=><img style={{height:150,width:120}} alt="" src={dev_url+item}/>
    },
    {
        dataIndex: "design",
        title: "商品编号",
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
        dataIndex: "warehouseName",
        title: "仓库",
    },
    {
        dataIndex: "stock",
        title: "原库存",
    },
    {
        dataIndex: "newStock",
        title: "新库存",
    },
    {
        dataIndex: "userName",
        title: "操作者",
    },
    {
        dataIndex: "modifyDate",
        title: "操作时间",
        render:(value:any)=>moment(value).format("YYYY-MM-DD HH:mm:ss")
    },
]


