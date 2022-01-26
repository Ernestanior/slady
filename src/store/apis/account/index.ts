import RoleAPI from "@/store/apis/account/role";
import ResourceAPI from "@/store/apis/account/resource";
import SaleAPI from "@/store/apis/account/sale";
import AuthAPI from "@/store/apis/account/auth";
import UserAPI from "@/store/apis/account/user";
import CustomerAPI from "@/store/apis/account/customer";
import AgentAPI from "@/store/apis/account/agent";

export const authService = new AuthAPI();

export const roleService = new RoleAPI ();

export const resourceService = new ResourceAPI();

export const saleService = new SaleAPI();

export const userService = new UserAPI();

export const customerService = new CustomerAPI()

export const agentService = new AgentAPI();
