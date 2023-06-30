import React, {FC, useMemo, useState} from "react";
import Template from "@/common/template";
import {Input, Popconfirm} from "antd";
import {IOperationConfig} from "@/common/template/interface";
import FormItem from "@/common/Form/formItem";
import {orderService} from "@/store/apis/order";
import {areaType, orderType} from "@/pages/order";
import {reqAndReload} from "@/common/utils";
import msgModal from "@/store/message/service";
import moment from "moment";
// import ModifyStatus from "./modify";


const OrderList: FC = () => {
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()

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
                        content: `确定发生取消订单请求: ${data.design} ？`,
                        onOk: () => {
                            const config = orderService.OrderDelete({}, [data.id]);
                            reqAndReload(config);
                        }
                    }
                    msgModal.createEvent("modal", value)
                }
            }
    ], [])

    return (
        <section>
            <Template
                filter={<FormItem span={5} noStyle name="keyWord">
                    <Input/>
                </FormItem>}
                columns={columns}
                queryData={(data)=>orderService.OrderList({},{
                    areaType:areaType.SINGAPORE,
                    warehouseName:"Slady一店",
                    ...data
                })}
                rowKey="id"
                optList={options}
            />
        </section>
    );
};

const cancelOrder=(e:any)=>{
    console.log(e)
}
export default OrderList;

const columns: any = [
    {
        title: "照片",
        dataIndex: "preViewPhoto",
        render:(item:any)=><img alt="" src={item}/>
    },
    {
        title: "设计师",
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
            }
        }
    },
    {
        title:"待定日期",
        dataIndex:"pendingData",
    },
];
