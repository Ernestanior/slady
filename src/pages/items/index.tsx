import React, {FC, useMemo, useState} from "react";
import {INormalEvent} from "@/common/interface";
import {Button, TableColumnProps} from "antd";
import CreateAdmin from "@/pages/items/create";
import ModifyAdmin from "@/pages/items/modify";
import item1 from '../../assets/1.jpg'
import item2 from '../../assets/2.jpg'
import item3 from '../../assets/3.jpg'
import item4 from '../../assets/4.jpg'
import item5 from '../../assets/5.jpg'
import item6 from '../../assets/6.jpg'
import {RightOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import historyService from "@/store/history";
const ItemList: FC = () => {
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

    const goDetail=()=>{
        historyService.push("/item/detail")
    }

    return (
        <section>
            <Search  style={{width:300,marginBottom:30,marginRight:30}} enterButton/>
            <Button type={"primary"}>新增</Button>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {staticData.content.map((item,index)=><div key={index} style={{backgroundColor:"#fff",width:500,display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd"}}>
                        <img style={{height:"100%"}} src={item.pic}/>
                        <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between"}}>
                            <div>
                                <h3>{item.designId}</h3>
                                <div style={{marginBottom:5}}>库存：{item.sum}</div>
                                价格：<span style={{color:"#fa9829"}}>${item.price}</span>
                            </div>
                            <a style={{display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}} onClick={goDetail}>详情<RightOutlined /></a>
                        </div>
                    </div>
                )}
            </div>
            <CreateAdmin onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateAdmin>
            <ModifyAdmin onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyAdmin>
        </section>
    );
};

export default ItemList;

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
