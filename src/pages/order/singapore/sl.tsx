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
                filter={<>
                    <FormItem span={5} noStyle label={"设计编号"} name="keyWord">
                        <Input/>
                    </FormItem>
                </>
                }
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
        dataIndex: "preViewPhoto",
        render:(item)=>{
            console.log(item)
            switch (item){
                case 1:
                    return <img alt="" src={item1}/>
                case 2:
                    return <img alt="" src={item2}/>
                case 3:
                    return <img alt="" src={item3}/>
                case 4:
                    return <img alt="" src={item4}/>
                case 5:
                    return <img alt="" src={item5}/>
                case 6:
                    return <img alt="" src={item6}/>
            }

        }

    },
    {
        title: "设计师",
        dataIndex: "designId",
    },
    {
        title: "价格",
        dataIndex: "price",
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
        title: "时间",
        dataIndex: "time",
    },
    {
        title: "备注",
        dataIndex: "note",
    },
    {
        title:"状态",
        dataIndex:"status",
    },
    {
        title:"待定日期",
        dataIndex:"pendingDate",
    },
];
const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:2,
    content:[
        {designId:"0411", pic:1, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"店补"},
        {designId:"0411", pic:2, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"待定",pendingDate:"2023.6.23",note:"serene 90001100 已付"},
        {designId:"0411", pic:6, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"已发货",pendingDate:"",note:"已付"},
        {designId:"0411", pic:4, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:5, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:1, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:2, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:4, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:4, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:5, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:6, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:1, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
        {designId:"0411", pic:2, sum:5, price:199,size:"M",color:"白色",time:"2023-6-20",status:"OK",pendingDate:"",note:"已付"},
    ]
}
