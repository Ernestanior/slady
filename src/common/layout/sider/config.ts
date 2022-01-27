import {IRoleLimitModule} from "@/common/interface";
import {E_USER_TYPE} from "@/store/account/interface";

interface IMenu extends IRoleLimitModule{
    url: string;
    text: string;
}

const menuList: IMenu[] = [
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
    }
]

export default menuList;
