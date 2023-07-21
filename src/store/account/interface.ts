export enum E_USER_TYPE{
    ADMIN="admin",
    SALER="saler",
    OPERATOR="operator",
    LOGISTICS="kr-logistics",

    SUPERADMIN="superAdmin"
}

export enum E_All_USER_TYPE{
    CUSTOMER="customer",
    AGENT="agent"
}

export interface IAccountInfo{
    /** 用户id */
    id: number;
    /** 用户类型 */
    type: E_USER_TYPE;
    entityId:number;
    name:string;
    email:string;
    createDate:string;
}

export interface ISaleInfo{
    // saleId
    id: number;
    type: E_USER_TYPE;
    email: string;
    name: string;
}
