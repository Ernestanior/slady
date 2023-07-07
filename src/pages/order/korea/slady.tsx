import React, {FC, useMemo, useState} from "react";
import Template, {reloadMainList} from "@/common/template";
import {Input, Popconfirm} from "antd";
import {IOperationConfig} from "@/common/template/interface";
import FormItem from "@/common/Form/formItem";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import ModifyStatus from "./modify";
import moment from "moment";
import request from "@/store/request";
import {reqAndReload} from "@/common/utils";


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

    return (
        <section>
            <Template
                filter={<FormItem span={5} noStyle name="keyWord">
                    <Input/>
                </FormItem>}
                columns={columns}
                queryData={(data)=>orderService.OrderList({},{
                    areaType:areaType.KOREA,
                    warehouseName:"Slady一店",
                    ...data
                })}
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
        dataIndex: "preViewPhoto",
        render:(item:any)=><img style={{height:150,width:120}} alt="" src={item}/>
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
            }
        }
    },
    {
        title:"待定日期",
        dataIndex:"pendingDate",
        width:110,
        render:(value:any,item:any)=>{
            console.log(item)
            return value && <>
                <div>{moment(value).format('YYYY-MM-DD')}</div>
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
