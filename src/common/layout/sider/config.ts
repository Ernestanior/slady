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
        url: '/customer',
        text: "员工管理",
        icon:"icongeren2"
    },
    {
        url: "/item",
        text: "商品",
        icon:"icongeren2"
    },
    {
        text: "订单物流",
        icon:"icongeren2",
        childs: [
            {
                url: "/contents/slady",
                text: "Slady一店"
            },
            {
                url: "/contents/sl",
                text: "SL二店"
            },
        ]
    },
    {
        url: "/top10",
        icon:"icongeren2",
        text: "爆款"
    },
    {
        url: "/bot10",
        icon:"icongeren2",
        text: "爆冷款"
    },
]

export default menuList;
