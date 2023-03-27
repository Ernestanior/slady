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
        url: "/admin",
        text: "Administrative",
        icon:"icongeren2"
    },
    {
        url: '/customer',
        text: "Customers",
        icon:"icongeren2"
    },
    {
        text: "Contents",
        icon:"icongeren2",
        childs: [
            {
                url: "/contents/classifications",
                text: "Classifications"
            },
            {
                url: "/contents/video",
                text: "Video"
            },
            {
                url: "/contents/stream",
                text: "Stream"
            }
        ]
    },
    {
        url: "/profile",
        icon:"icongeren2",
        text: "My Profile"
    },

]

export default menuList;
