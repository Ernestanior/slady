import React, {FC, useCallback, useMemo, useState} from "react";
import Template from "@/common/template";
import {Popconfirm} from "antd";
import {IOperationConfig} from "@/common/template/interface";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import ModifyStatus from "./modify";
import request, {dev_url} from "@/store/request";
import {reqAndReload} from "@/common/utils";
import {WAREHOUSE} from "@/common/const";
import Query from "./query";
import {handleDatetime} from "@/common/utilsx";
import {IPageResult} from "@/store/apis/log/common.interface";


const OrderList: FC = () => {
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "修改状态",
                    event(data) {
                        setSelectData(data)
                        setEditFlag(true)
                    },
                }
            ]
        ]
    }, [])

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
            status:['0','1','2','3','4'],
            ...filters,
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
                optList={options}
            />
            <ModifyStatus onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyStatus>
        </section>
    );
};

const cancelOrder= async (item:any)=>{
    const config = orderService.OrderDelete({},[item.id])
    reqAndReload(config);
}
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
        title: "备注",
        dataIndex: "remark",
    },
    {
        title:"状态",
        dataIndex:"status",
        render:(value:string)=>{
            switch (value){
                case '0':
                    return ''
                case '1':
                    return '待定'
                case '2':
                    return 'OK'
                case '3':
                    return '已发货'
                case '4':
                    return '待定(请求取消)'
                case '5':
                    return '已收到'
            }
        }
    },
    {
        title:"待定日期",
        dataIndex:"pendingDate",
        width:110,
        render:(value:any,item:any)=>{
            return value && <>
                {/*<div>{moment(value).format('YYYY-MM-DD')}</div>*/}
                <div>{value}</div>
                {
                    item.status==="4" &&
                    <Popconfirm title="确定取消?" onConfirm={()=>cancelOrder(item)} okText={"确定"} cancelText={"取消"}>
                        <span style={{color:"red",cursor:"pointer"}}>取消订单</span>
                    </Popconfirm>
                }
            </>
        }
    },
];
