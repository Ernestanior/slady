import React, {FC, useCallback, useEffect, useState} from "react";
import Template from "@/common/template";
import {Button, notification} from "antd";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import moment from "moment/moment";
import {from} from "rxjs";
import request, {dev_url} from "@/store/request";
import {IPageResult} from "@/store/apis/log/common.interface";
import {reqAndReload} from "@/common/utils";
import {WAREHOUSE} from "@/common/const";
import Query from "./query";
import {handleDatetime} from "@/common/utilsx";
import msgModal from "@/store/message/service";
const OrderList: FC = () => {

    const [data,setData]=useState<any>()
    const [totalPrice,setTotalPrice] = useState<any>()
    // const [dateRange,setDateRange] = useState<any>()
    useEffect(()=>{
        const config = orderService.OrderCount({},{
            areaType:areaType.KOREA,
            warehouseName:WAREHOUSE.SLADY,
            // status:['2','3','5'],
            paymentStatus:0,
            searchPage:{desc:1,page:1,pageSize:999,sort:"create_date"}
        })
        from(request(config)).subscribe((res:any)=>{
            if (res.isSuccess){
                const data = res.result.filter((item:any)=>item.warehouseName===WAREHOUSE.SLADY)
                data.length && setTotalPrice(data[0].count)
            }
        })
    },[])

    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
            // setDateRange({startDate:d[0]+" 00:00:00",endDate:d[1]+" 23:59:59"})
        }
        const config = orderService.OrderList({},{
            areaType:areaType.KOREA,
            warehouseName:WAREHOUSE.SLADY,
            // status:['2','3','5'],
            paymentStatus:0,
            ...filters
        })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            setData(res.result)
            return res.result
        }
        return null
    },[])

    const changeStatus = async() =>{
        const value = {
            title: "清空",
            content: `确定清空订单？`,
            onOk: () => {
                if(!data.length){
                    notification.error({message:"当前无未结清的订单"})
                    return
                }
                const ids = data.map((item:any)=>item.id)
                const config = orderService.OrderModifyStatus({},{orderIds:ids,paymentStatus:1})
                reqAndReload(config)
            }
        }
        msgModal.createEvent("modal", value)
    }

    const onPrint = async() =>{
        if(!data.length){
            notification.error({message:"当前无未结清的订单"})
            return
        }
        const config = orderService.OrderExport({},{})
        const res = await request(config)
        res.isSuccess && window.open(dev_url+res.result)
    }
    return (
        <section>
            <Template
                filter={<Query/>}
                columns={columns}
                queryDataFunction={query}
                rowKey="id"
            />
            <div style={{padding:20,display:"flex",justifyContent:"space-between"}}>
                <span style={{fontWeight:"600"}}>总价: $ {totalPrice}</span>
                <div>
                    <Button style={{marginRight:20}} onClick={onPrint}>打印</Button>
                    <Button onClick={changeStatus}>清空</Button>
                </div>
            </div>
        </section>
    );
};

export default OrderList;

const columns: any = [
    {
        title: "下单日期",
        dataIndex: "date",
        render:(value:any)=>moment(value).format("YYYY-MM-DD")
    },
    {
        title: "照片",
        dataIndex: "previewPhoto",
        render:(value:any)=>{
            return <img style={{height:150,width:120}} alt="" src={dev_url+value}/>
        }
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
        title: "单价",
        dataIndex: "quotedPrice",
        render:(value:any)=>`$${value}`
    },
    {
        title: "总价",
        dataIndex: "quotedPrice",
        render:(value:any,item:any)=>`$${value*item.amount}`
    },
    {
        title: "备注",
        dataIndex: "note",
        render:()=>"加急"
    },
];

