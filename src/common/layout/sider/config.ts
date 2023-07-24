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
        text: "员工管理",
        icon:"icon-customer",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.SUPERADMIN]
    },
    {
        url: "/item",
        text: "商品",
        icon:"icon-shopping",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.SALER,E_USER_TYPE.PRODUCTMANAGEMENT]
    },
    {
        text: "订单物流",
        icon:"icon-order",
        url: "/order",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.LOGISTICS,E_USER_TYPE.SALER]
    },
    {
        text: "韩国反馈",
        icon:"icon-order",
        url: "/feedback",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.LOGISTICS,E_USER_TYPE.FINANCE]
    },
    {
        url: "/rank",
        icon:"icon-top-raning",
        text: "爆/冷款",
        role:[E_USER_TYPE.ADMIN,E_USER_TYPE.PRODUCTMANAGEMENT]

    },
    {
        url: "/storageRecord",
        icon:"icon-writing",
        text: "库存修改记录",
        role:[E_USER_TYPE.ADMIN]
    },
    {
        url: "/operate",
        icon:"icon-writing",
        text: "员工操作历史记录",
        role:[E_USER_TYPE.ADMIN]
    },
]

export default menuList;
