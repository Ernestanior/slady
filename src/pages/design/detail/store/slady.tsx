import React, {FC, useMemo, useState} from "react";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import {itemService} from "@/store/apis/item";
import {useRouteMatch} from "react-router-dom";
import EditStock from "@/pages/design/detail/store/editStock";
import Replenish from "@/pages/design/detail/store/replenish";

interface IProps{
}
const Slady: FC<IProps> = () => {
    // const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editStock,setEditStock]=useState<boolean>(false)
    const [replenish,setReplenish]=useState<boolean>(false)
    const [selectedItem,setSelectedItem] = useState<any>()
    const [type,setType]=useState<boolean>(true)
    const url = useRouteMatch<{id:string }>("/item/detail/:id");
    const designId = useMemo(()=>url?.params.id,[url])
    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "修改库存",
                    event(data) {
                        setSelectedItem(data)
                        setEditStock(true)
                    },
                },
                {
                    text: "店补",
                    event(data) {
                        setSelectedItem(data)
                        setReplenish(true)
                    },
                },
                {
                    text: "客订",
                    event(data) {
                        setSelectedItem(data)
                        setReplenish(true)
                    },
                },
            ]
        ]
    }, [])
    return (
        <section style={{padding:20}}>
            <h3>库存</h3>
            <Template
                columns={columns}
                queryData={(data)=>itemService.ItemList({},{
                    designId,
                    warehouseName:"Slady一店",
                    ...data
                })}
                // queryDataFunction={queryData}
                optList={options}
                rowKey="email"
            />
            <EditStock onOk={()=>setEditStock(false)} visible={editStock} data={selectedItem}></EditStock>
            <Replenish onOk={()=>setReplenish(false)} visible={replenish} data={selectedItem}></Replenish>

        </section>
    );
};

export default Slady;

const columns:any = [
    {
        dataIndex: "color",
        title: "颜色",
    },
    {
        dataIndex: "size",
        title: "尺寸",
    },
    {
        dataIndex: "stock",
        title: "库存数量",
    },
]



