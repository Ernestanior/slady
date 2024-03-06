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
import {WAREHOUSE} from "@/common/const";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";
import {useTranslation} from "react-i18next";

interface IProps{
    onRefresh?:any
}
const Slady: FC<IProps> = ({onRefresh}:any) => {
    const userInfo = useAccountInfo()
    const [t]=useTranslation()
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
                text: t("CREATE"),
                primary: true,
                event() {
                    setCreateFlag(true)
                },

            },
        ];
    }, [userInfo?.type]);

    const columns:any = [
        {
            dataIndex: "color",
            title: t("COLOR"),
        },
        {
            dataIndex: "size",
            title: t("SIZE"),
        },
        {
            dataIndex: "stock",
            title: t("STOCK"),
        },
    ]

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: t("MODIFY_STOCK"),
                    event(data) {
                        setSelectedItem(data)
                        setEditStock(true)
                    },
                },
                {
                    text: t("SUPPLEMENT"),
                    event(data) {
                        setSelectedItem(data)
                        setReplenish(true)
                    },
                },
                {
                    text: t("CUSTOMER_ORDER"),
                    event(data) {
                        setSelectedItem(data)
                        setCusOrder(true)
                    },
                },
                {
                    text: t("DELETE"),
                    event(data) {
                        const value = {
                            title: "Delete",
                            content: `${t("CURRENT_STOCK")}${data.stock}，${t("CONFIRM_DELETE")}: ${data.color}/ ${data.size} ？`,
                            onOk: () => {
                                const config = itemService.ItemDelete({},[data.id])
                                reqAndReload(config, () => {
                                    onRefresh();
                                    notification.success({message: t("DELETE_SUCCESS")})
                                });
                            }
                        }
                        msgModal.createEvent("modal", value)
                    },
                    hide:()=>userInfo?.type===E_USER_TYPE.SALER
                }
            ]
        ]
    }, [onRefresh,userInfo?.type,t])
    return (
        <section style={{padding:20}}>
            <h3>{t("STOCK")}</h3>
            <Template
                event={buttons}
                columns={columns}
                queryData={(data)=>itemService.ItemList({},{
                    designId,
                    warehouseName:WAREHOUSE.SLADY,
                    ...data
                })}
                // queryDataFunction={queryData}
                optList={options}
                rowKey="email"
            />
            <EditStock onOk={()=>{onRefresh();setEditStock(false)}} visible={editStock} data={selectedItem}></EditStock>
            <Replenish onOk={()=>setReplenish(false)} visible={replenish} data={selectedItem}></Replenish>
            <CustomerOrder onOk={()=>setCusOrder(false)} visible={cusOrder} data={selectedItem}></CustomerOrder>
            <CreateItem onOk={()=>{onRefresh();setCreateFlag(false)}} visible={createFlag} designId={designId}></CreateItem>
        </section>
    );
};

export default Slady;




