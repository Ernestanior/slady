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




const menuList: any[] = [
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
        text: "ORDER_HISTORY",
        icon:"icon-order",
        url: "/historyOrder",
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
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.PRODUCTMANAGEMENT,E_USER_TYPE.SALER]

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
    {
        url: "/member",
        icon:"icon-customer",
        text: "MEMBER",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.SALER]
    },
]

export default menuList;
