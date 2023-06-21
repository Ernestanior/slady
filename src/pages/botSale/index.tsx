import React, {FC, useCallback, useMemo, useState} from "react";
import {INormalEvent} from "@/common/interface";
import {Button, notification, TableColumnProps} from "antd";
import {adminService} from "@/store/apis/account";
import { reqAndReload} from "@/common/utils";
import {IOperationConfig} from "@/common/template/interface";
import msgModal from "@/store/message/service";
import item1 from '../../assets/1.jpg'
import item2 from '../../assets/2.jpg'
import item3 from '../../assets/3.jpg'
import item4 from '../../assets/4.jpg'
import item5 from '../../assets/5.jpg'
import item6 from '../../assets/6.jpg'
import {RightOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import IconFont from "@/common/icon";
const BotSale: FC = () => {
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
            <div>
                {staticData.content.map((item,index)=><div style={{backgroundColor:"#fff",display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd"}}>
                        <img style={{height:"100%"}} src={item.pic}/>
                        <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                                <h3>{item.designId}</h3>
                                <div style={{marginBottom:5}}>销量：{item.sum}</div>
                                价格：<span style={{color:"#fa9829"}}>${item.price}</span>

                            </div>
                            <a style={{display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}}>详情<RightOutlined /></a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BotSale;

const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:2,
    content:[
        {designId:"618-212", pic:item1, sum:2, price:199.01},
        {designId:"618-212", pic:item2, sum:4, price:199.01},
        {designId:"618-212", pic:item5, sum:7, price:199.01},
        {designId:"618-212", pic:item4, sum:13, price:199.01},
        {designId:"618-212", pic:item5, sum:15, price:199.01},
        {designId:"618-212", pic:item6, sum:15, price:199.01},
        {designId:"618-212", pic:item1, sum:18, price:199.01},
        {designId:"618-212", pic:item2, sum:19, price:199.01},
        {designId:"618-212", pic:item4, sum:19, price:199.01},

    ]
}
