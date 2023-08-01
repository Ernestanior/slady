import React, {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import {orderService} from "@/store/apis/order";
import {areaType, orderType} from "@/pages/order";
import {reqAndReload} from "@/common/utils";
import msgModal from "@/store/message/service";
import moment from "moment";
import request, {dev_url} from "@/store/request";
import {WAREHOUSE} from "@/common/const";
import {IPageResult} from "@/store/apis/log/common.interface";
import Query from "@/pages/order/singapore/query";
import {handleDatetime} from "@/common/utilsx";

const OrderList: FC = () => {

    const options: IOperationConfig = useMemo(() => [
        {
            text: "取消订单",
            hide: (data) => data.status,
            event(data) {
                const value = {
                    title: "取消订单",
                    content: `确定取消订单: ${data.design} ？`,
                    onOk: () => {
                        const config = orderService.OrderDelete({}, [data.id]);
                        reqAndReload(config);
                    }
                }
                msgModal.createEvent("modal", value)
            }
        },
        {
            text: "请求取消订单",
            hide: (data) => data.status !== orderType.PENDING,
            event(data) {
                const value = {
                    title: "请求取消订单",
                    content: `确定发送取消订单请求: ${data.design} ？`,
                    onOk: () => {
                        console.log(data)
                        const config = orderService.OrderModify({}, {...data,status:"4"});
                        reqAndReload(config);
                    }
                }
                msgModal.createEvent("modal", value)
            }
        },
        {
            text: "撤回请求",
            hide: (data) => data.status !== orderType.CANCELREQUEST,
            event(data) {
                const value = {
                    title: "撤回请求",
                    content: `确定撤回取消订单的请求: ${data.design} ？`,
                    onOk: () => {
                        const config = orderService.OrderModify({}, {...data,status:"1"});
                        reqAndReload(config);
                    }
                }
                msgModal.createEvent("modal", value)
            }
        }
    ], [])


    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
        }
        const config = orderService.OrderList({},{
            areaType:areaType.SINGAPORE,
            warehouseName:WAREHOUSE.SL,
            status:['0','1','2','3','4'],
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
                optList={options}
            />
        </section>
    );
};


export default OrderList;

const columns: any = [
    {
        title: "照片",
        dataIndex: "previewPhoto",
        width: 120,
        render:(item:any)=><img style={{height:150,width:120}} alt="" src={dev_url+item}/>
    },
    {
        title: "编号",
        dataIndex: "design",
    },
    {
        title: "价格",
        dataIndex: "salePrice",
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
        title: "时间",
        dataIndex: "date",
        width:110,
        render:(data:string)=>moment(data).format('YYYY-MM-DD')
    },
    {
        title: "备注",
        dataIndex: "remark",
    },
    {
        title:"状态",
        dataIndex:"status",
        width:130,
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
        render:(value:any)=>{
            // return value && <div>{moment(value).format('YYYY-MM-DD')}</div>
            return value && <div>{value}</div>
        }
    },
];
