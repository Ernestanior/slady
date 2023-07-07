import React, {FC, useCallback, useMemo, useState} from "react";
import Template from "@/common/template";
import {INormalEvent} from "@/common/interface";
import {Input, TableColumnProps} from "antd";
import FormItem from "@/common/Form/formItem";
import item1 from '../../../assets/1.jpg'
import item2 from '../../../assets/2.jpg'
import item3 from '../../../assets/3.jpg'
import item4 from '../../../assets/4.jpg'
import item5 from '../../../assets/5.jpg'
import item6 from '../../../assets/6.jpg'
const OrderList: FC = () => {
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()

    const queryDataFunction = useCallback(async (filters) => {
        // const cusList = await request(adminService.UserList({}, {type:'admin',...filters}));
        // if (cusList.isSuccess && cusList.result) {
        //     const data: any = cusList.result;
        //     return data;
        // }
        return staticData;
    }, []);



    return (
        <section>
            <Template
                filter={<FormItem span={5} noStyle name="keyWord">
                    <Input/>
                </FormItem>}
                columns={columns}
                queryDataFunction={queryDataFunction}
                rowKey="id"
            />
        </section>
    );
};

export default OrderList;

const columns: TableColumnProps<any>[] = [
    {
        title: "照片",
        dataIndex: "pic",
        render:(item)=>{
            console.log(item)
            switch (item){
                case 1:
                    return <img alt={""} src={item1}/>
                case 2:
                    return <img alt={""} src={item2}/>
                case 3:
                    return <img alt={""} src={item3}/>
                case 4:
                    return <img alt={""} src={item4}/>
                case 5:
                    return <img alt={""} src={item5}/>
                case 6:
                    return <img alt={""} src={item6}/>
            }

        }

    },
    {
        title: "设计编号",
        dataIndex: "designId",
    },
    {
        title: "客户",
        dataIndex:"customer",
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
        dataIndex: "sum",
    },
    {
        title: "备注",
        dataIndex: "note",
    },
];
const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:2,
    content:[
        {designId:"204-612", pic:1, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:2, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:6, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:4, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:5, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:1, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:2, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:4, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:4, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:5, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:6, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:1, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
        {designId:"204-612", pic:2, sum:5, customer:"SL",size:"M",color:"白色",note:"加急"},
    ]
}