import AuthAPI from "@/store/apis/account/auth";
import UserAPI from "@/store/apis/account/user";
import AdminAPI from "@/store/apis/account/admin";

export const authService = new AuthAPI();


export const userService = new UserAPI();


export const adminService = new AdminAPI();
