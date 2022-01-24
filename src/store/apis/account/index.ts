import RoleAPI from "@/store/apis/account/role";
import ResourceAPI from "@/store/apis/account/resource";
import SaleAPI from "@/store/apis/account/sale";
import AuthAPI from "@/store/apis/account/auth";
import UserAPI from "@/store/apis/account/user";

export const authService = new AuthAPI();

export const roleService = new RoleAPI ();

export const resourceService = new ResourceAPI();

export const saleService = new SaleAPI();

export const userService = new UserAPI();
