import React, {FC, useCallback, useMemo, useState} from "react";
import Template from "@/common/template";
import {INormalEvent} from "@/common/interface";
import {Input, notification, Popconfirm, TableColumnProps} from "antd";
import {adminService} from "@/store/apis/account";
import { reqAndReload} from "@/common/utils";
import request from "@/store/request";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import FormItem from "@/common/Form/formItem";
import CreateAdmin from "@/pages/items/create";
import ModifyAdmin from "@/pages/items/modify";
import Status from "@/common/status";
import {E_COLOR} from "@/common/const";
import item1 from '../../../assets/1.jpg'
import item2 from '../../../assets/2.jpg'
import item3 from '../../../assets/3.jpg'
import item4 from '../../../assets/4.jpg'
import item5 from '../../../assets/5.jpg'
import item6 from '../../../assets/6.jpg'
const OrderList: FC = () => {
    const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()
    const buttons: INormalEvent[] = useMemo(() => {
        return [
            {
                text: "新增",
                primary: true,
                event() {
                    setCreateFlag(true)
                },
            },
        ];
    }, []);

    const queryDataFunction = useCallback(async (filters) => {
        // const cusList = await request(adminService.UserList({}, {type:'admin',...filters}));
        // if (cusList.isSuccess && cusList.result) {
        //     const data: any = cusList.result;
        //     return data;
        // }
        return staticData;
    }, []);
    const onCancel=()=>{

    }

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
    const columns: TableColumnProps<any>[] = [
        {
            title: "照片",
            dataIndex: "pic",
            render:(item)=>{
                console.log(item)
                switch (item){
                    case 1:
                        return <img src={item1}/>
                    case 2:
                        return <img src={item2}/>
                    case 3:
                        return <img src={item3}/>
                    case 4:
                        return <img src={item4}/>
                    case 5:
                        return <img src={item5}/>
                    case 6:
                        return <img src={item6}/>
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
        {
            title:"状态",
            dataIndex:"status",
        },
        {
            title:"待定日期",
            dataIndex:"pendingData",
            render:(value:any)=>{
                return value && <>
                    <div>{value}</div>
                    <Popconfirm title="确定取消?" onConfirm={onCancel} okText={"确定"} cancelText={"取消"}>
                        <a>取消订单</a>
                    </Popconfirm>
                </>
            }
        },
    ];

    return (
        <section>
            <Template
                filter={<FormItem span={5} noStyle name="keyWord">
                    <Input/>
                </FormItem>}
                event={buttons}
                columns={columns}
                queryDataFunction={queryDataFunction}
                rowKey="id"
                optList={options}
            />
            <CreateAdmin onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateAdmin>
            <ModifyAdmin onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyAdmin>
        </section>
    );
};

export default OrderList;

const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:2,
    content:[
        {designId:"204-612", pic:1, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:2, sum:5, customer:"Slady",size:"M",color:"白色",status:"待定",pendingData:'2023.6.23',note:"加急"},
        {designId:"204-612", pic:6, sum:5, customer:"Slady",size:"M",color:"白色",status:"已发货",note:"加急"},
        {designId:"204-612", pic:4, sum:5, customer:"Slady",size:"M",color:"白色",status:"已取消",note:"加急"},
        {designId:"204-612", pic:5, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:1, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:2, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:4, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:4, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:5, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:6, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:1, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
        {designId:"204-612", pic:2, sum:5, customer:"Slady",size:"M",color:"白色",status:"OK",note:"加急"},
    ]
}
