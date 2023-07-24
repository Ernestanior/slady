import React, {FC, useMemo, useState} from "react";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import {itemService} from "@/store/apis/item";
import {useRouteMatch} from "react-router-dom";
import EditStock from "@/pages/design/detail/store/editStock";
import Replenish from "@/pages/design/detail/store/replenish";
import {INormalEvent} from "@/common/interface";
import CreateItem from "@/pages/design/detail/store/createItem";
import {reqAndReload} from "@/common/utils";
import {notification} from "antd";
import msgModal from "@/store/message/service";
import CustomerOrder from "@/pages/design/detail/store/customerOrder";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";

interface IProps{
}
const Slady: FC<IProps> = () => {
    const userInfo = useAccountInfo()
    // const [createFlag,setCreateFlag]=useState<boolean>(false)
    const [editStock,setEditStock]=useState<boolean>(false)
    const [replenish,setReplenish]=useState<boolean>(false)
    const [cusOrder,setCusOrder]=useState<boolean>(false)
    const [selectedItem,setSelectedItem] = useState<any>()
    const [createFlag,setCreateFlag]=useState<boolean>(false)

    const url = useRouteMatch<{id:string }>("/item/detail/:id");
    const designId = useMemo(()=>url?.params.id,[url])

    const buttons: INormalEvent[] = useMemo(() => {
        return userInfo?.type===E_USER_TYPE.SALER ? []:
            [
                {
                    text: "Create",
                    primary: true,
                    event() {
                        setCreateFlag(true)
                    },

                },
            ];
    }, [userInfo?.type]);

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
                        setCusOrder(true)
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
                    hide:()=>userInfo?.type===E_USER_TYPE.SALER
                }
            ]
        ]
    }, [userInfo?.type])
    return (
        <section style={{padding:20}}>
            <h3>库存</h3>
            <Template
                event={buttons}
                columns={columns}
                queryData={(data)=>itemService.ItemList({},{
                    designId,
                    warehouseName:"SL二店",
                    ...data
                })}
                // queryDataFunction={queryData}
                optList={options}
                rowKey="email"
            />
            <EditStock onOk={()=>setEditStock(false)} visible={editStock} data={selectedItem}></EditStock>
            <Replenish onOk={()=>setReplenish(false)} visible={replenish} data={selectedItem}></Replenish>
            <CustomerOrder onOk={()=>setCusOrder(false)} visible={cusOrder} data={selectedItem}></CustomerOrder>

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



