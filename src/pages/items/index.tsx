import React, {FC, useCallback, useMemo, useState} from "react";
import Template from "@/common/template";
import {INormalEvent} from "@/common/interface";
import {Button, Input, notification, TableColumnProps} from "antd";
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
import item1 from '../../assets/1.jpg'
import item2 from '../../assets/2.jpg'
import item3 from '../../assets/3.jpg'
import item4 from '../../assets/4.jpg'
import item5 from '../../assets/5.jpg'
import item6 from '../../assets/6.jpg'
import {RightOutlined} from "@ant-design/icons";
import Filter from "@/common/template/filter";
import Search from "antd/es/input/Search";
const AdminList: FC = () => {
    const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()
    const buttons: INormalEvent[] = useMemo(() => {
        return [
            {
                text: "Create",
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

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "详情",
                    event(data) {
                        setSelectData(data)
                        setEditFlag(true)
                    },
                },
                {
                    text: "修改",
                    event(data) {
                        setSelectData(data)
                        setEditFlag(true)
                    },
                },
                {
                    text: "删除",
                    event(data) {
                        // deleteCustomer(data);
                        const value = {
                            title: "删除",
                            content: `确定删除该商品: ${data.email} ？`,
                            onOk: () => {
                                const config = adminService.UserDelete({}, [data.id]);
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }]
        ]
    }, [ ])

    return (
        <section>
            <Search  style={{width:300,marginBottom:30,marginRight:30}} enterButton/>
            <Button type={"primary"}>新增</Button>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {staticData.content.map((item)=><div style={{backgroundColor:"#fff",width:500,display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd"}}>
                        <img style={{height:"100%"}} src={item.pic}/>
                        <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between"}}>
                            <div>
                                <h3>{item.designId}</h3>
                                <div style={{marginBottom:5}}>库存：{item.sum}</div>
                                价格：<span style={{color:"#fa9829"}}>${item.price}</span>
                            </div>
                            <a style={{display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}}>详情<RightOutlined /></a>
                        </div>
                    </div>
                )}
            </div>
            <CreateAdmin onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateAdmin>
            <ModifyAdmin onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyAdmin>
        </section>
    );
};

export default AdminList;

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
        title: "库存",
        dataIndex: "sum",
    },
    {
        title: "价格",
        dataIndex: "price",
    },
];
const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:2,
    content:[
        {designId:"618-212", pic:item1, sum:5, price:199.01},
        {designId:"618-212", pic:item2, sum:5, price:199.01},
        {designId:"618-212", pic:item5, sum:5, price:199.01},
        {designId:"618-212", pic:item4, sum:5, price:199.01},
        {designId:"618-212", pic:item5, sum:5, price:199.01},
        {designId:"618-212", pic:item6, sum:5, price:199.01},
        {designId:"618-212", pic:item1, sum:5, price:199.01},
        {designId:"618-212", pic:item2, sum:5, price:199.01},
        {designId:"618-212", pic:item4, sum:5, price:199.01},

    ]
}
