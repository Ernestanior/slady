import {IRoleLimitModule} from "@/common/interface";
import {E_USER_TYPE} from "@/store/account/interface";
import {XOR} from "ts-xor";

interface IMenu extends IRoleLimitModule{
    url: string;
    text: string;
}

interface IMultipleMenu extends IRoleLimitModule{
    text: string;
    childs: IMenu[]
}

const menuList: Array<XOR<IMenu, IMultipleMenu>> = [
    {
        url: "/customer",
        text: "客户管理"
    },
    {
        url: '/sale',
        text: "销售部门",
        role: [E_USER_TYPE.SALE_MANAGER]
    },
    {
        url: "/statistics",
        text: "统计报表"
    },
    {
        text: "归档功能",
        childs: [
            {
                url: "/archive/customer",
                text: "归档域名"
            },
            {
                url: "/archive/domain",
                text: "归档客户"
            }
        ]
    }
]

export default menuList;
