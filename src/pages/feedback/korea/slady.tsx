import React, {FC, useCallback, useEffect, useState} from "react";
import Template from "@/common/template";
import {Button, Input, notification} from "antd";
import FormItem from "@/common/Form/formItem";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import moment from "moment/moment";
import {from} from "rxjs";
import request, {dev_url} from "@/store/request";
import {IPageResult} from "@/store/apis/log/common.interface";
import {reqAndReload} from "@/common/utils";
const OrderList: FC = () => {

    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [data,setData]=useState<any>()
    const [totalPrice,setTotalPrice] = useState<any>()
    useEffect(()=>{
        const config = orderService.OrderCount({},{})
        from(request(config)).subscribe((res:any)=>{
            if (res.isSuccess){
                const data = res.result.filter((item:any)=>item.warehouseName==="Slady一店")
                data.length && setTotalPrice(data[0].count)
            }
        })
    },[])

    const query = useCallback(async()=>{
        const config = orderService.OrderList({},{
            areaType:areaType.KOREA,
            warehouseName:"Slady一店",
            status:2,
            paymentStatus:0,
            searchPage:{desc:1,page:1,pageSize:999,sort:"create_date"}
        })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            setData(res.result)
            return res.result
        }
        return null
    },[])

    const changeStatus = async() =>{
        if(!data.length){
            notification.error({message:"当前无未结清的订单"})
            return
        }
        const ids = data.map((item:any)=>item.id)
        const config = orderService.OrderModifyStatus({status:1},ids)
        reqAndReload(config)
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
                filter={<FormItem span={5} noStyle name="keyWord">
                    <Input/>
                </FormItem>}
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

