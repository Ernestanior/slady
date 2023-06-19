import {IRoleLimitModule} from "@/common/interface";
import {XOR} from "ts-xor";

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
        icon:"icon-customer"
    },
    {
        url: "/item",
        text: "商品",
        icon:"icon-shopping"
    },
    {
        text: "订单物流",
        icon:"icon-order",
        url: "/contents",

    },
    {
        url: "/top10",
        icon:"icon-top-raning",
        text: "爆款"
    },
    {
        url: "/bot10",
        icon:"icon-cry",
        text: "冷款"
    },
    {
        url: "/bot10",
        icon:"icon-writing",
        text: "员工操作历史记录"
    },
]

export default menuList;
