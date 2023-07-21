import AuthAPI from "@/store/apis/account/auth";
import UserAPI from "@/store/apis/account/user";
import AdminAPI from "@/store/apis/account/admin";
import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import {IAccountInfo} from "@/store/account/interface";
import accountService from "@/store/account/service";

export const authService = new AuthAPI();


export const userService = new UserAPI();


export const adminService = new AdminAPI();

const useAccountInfo = () => {
    return useBehaviorSubject<IAccountInfo>(accountService.info$);
}
export default useAccountInfo;
