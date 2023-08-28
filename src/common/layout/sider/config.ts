import {IRoleLimitModule} from "@/common/interface";
import {XOR} from "ts-xor";
import {E_USER_TYPE} from "@/store/account/interface";

interface IMenu extends IRoleLimitModule{
    icon?:string;
    url: string;
    text: string;
}

interface IMultipleMenu extends IRoleLimitModule{
    text: string;
    icon:string;
    childs: IMenu[]
}




const menuList: Array<XOR<IMenu, IMultipleMenu>> = [
    {
        url: '/staff',
        text: "STAFF_MANAGEMENT",
        icon:"icon-customer",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.SUPERADMIN]
    },
    {
        url: "/item",
        text: "ITEM",
        icon:"icon-shopping",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.SALER,E_USER_TYPE.PRODUCTMANAGEMENT]
    },
    {
        text: "ORDER_LOGISTICS",
        icon:"icon-order",
        url: "/order",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.LOGISTICS,E_USER_TYPE.SALER]
    },
    {
        text: "KOREA_FEEDBACK",
        icon:"icon-order",
        url: "/feedback",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.LOGISTICS,E_USER_TYPE.FINANCE]
    },
    {
        url: "/rank",
        icon:"icon-top-raning",
        text: "TOP_BOT",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.PRODUCTMANAGEMENT]

    },
    {
        url: "/storageRecord",
        icon:"icon-writing",
        text: "STOCK_RECORD",
        role:[E_USER_TYPE.ADMIN]
    },
    {
        url: "/operate",
        icon:"icon-writing",
        text: "OPERATION_RECORD",
        role:[E_USER_TYPE.ADMIN]
    },
]

export default menuList;
