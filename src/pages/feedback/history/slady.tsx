import React, {FC, useCallback} from "react";
import Template from "@/common/template";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import request, {dev_url} from "@/store/request";
import {WAREHOUSE} from "@/common/const";
import {handleDatetime} from "@/common/utilsx";
import {IPageResult} from "@/store/apis/log/common.interface";
import Query from "./query";
const OrderList: FC = () => {


    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
        }
        const config = orderService.OrderList({},{
            areaType:areaType.KOREA,
            warehouseName:WAREHOUSE.SLADY,
            status:['2','3','5'],
            paymentStatus:1,
            ...filters
        })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            return res.result
        }
        return null
    },[])

    return (
        <section>
            <Template
                filter={<Query/>}
                columns={columns}
                queryDataFunction={query}
                rowKey="id"
            />
        </section>
    );
};

export default OrderList;

const columns: any = [
    {
        title: "照片",
        dataIndex: "previewPhoto",
        render:(item:any)=><img style={{height:150,width:120}} alt="" src={dev_url+item}/>
    },
    {
        title: "设计编号",
        dataIndex: "designCode",
    },
    {
        title: "客户",
        dataIndex:"warehouseName",
    },
    {
        title: "颜色",
        dataIndex: "color",
    },
    {
        title: "尺码",
        dataIndex: "size",
    },
    {
        title: "数量",
        dataIndex: "amount",
    },
    {
        title: "价格",
        dataIndex: "quotedPrice",
        render:(value:any)=>`$${value}`
    },
    {
        title: "备注",
        dataIndex: "note",
        render:()=>"加急"
    },
];

