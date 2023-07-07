import React, {FC, useCallback, useMemo, useState} from "react";
import Template from "@/common/template";
import {Input, Popconfirm, TableColumnProps} from "antd";
import FormItem from "@/common/Form/formItem";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import moment from "moment/moment";
const OrderList: FC = () => {
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()
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
            />
        </section>
    );
};

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

