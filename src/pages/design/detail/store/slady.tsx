import React, {FC, useMemo, useState} from "react";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import {itemService} from "@/store/apis/item";
import {useRouteMatch} from "react-router-dom";
import EditStock from "@/pages/design/detail/store/editStock";
import Replenish from "@/pages/design/detail/store/replenish";
import {INormalEvent} from "@/common/interface";
import CreateCustomer from "@/pages/staff/create";
import CreateItem from "@/pages/design/detail/store/createItem";
import {userService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import {notification} from "antd";
import msgModal from "@/store/message/service";

interface IProps{
}
const Slady: FC<IProps> = () => {
    // const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editStock,setEditStock]=useState<boolean>(false)
    const [replenish,setReplenish]=useState<boolean>(false)
    const [selectedItem,setSelectedItem] = useState<any>()
    const [type,setType]=useState<boolean>(true)
    const [createFlag,setCreateFlag]=useState<boolean>(false)

    const url = useRouteMatch<{id:string }>("/item/detail/:id");
    const designId = useMemo(()=>url?.params.id,[url])

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
                {
                    text: "删除",
                    event(data) {
                        const value = {
                            title: "删除",
                            content: `目前库存为${data.stock}，确定删除: ${data.color}/ ${data.size} ？`,
                            onOk: () => {
                                const config = itemService.ItemDelete({},[data.id])
                                reqAndReload(config, () => notification.success({message: "Delete Success"}));
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                }
            ]
        ]
    }, [])
    return (
        <section style={{padding:20}}>
            <h3>库存</h3>
            <Template
                event={buttons}
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
            <CreateItem onOk={()=>setCreateFlag(false)} visible={createFlag} designId={designId}></CreateItem>

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



