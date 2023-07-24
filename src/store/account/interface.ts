export enum E_USER_TYPE{
    ADMIN="ADMIN",
    SALER="SALER",
    FINANCE="FINANCE",
    LOGISTICS="LOGISTICS",

    SUPERADMIN="SUPERADMIN",
    PRODUCTMANAGEMENT="PRODUCTMANAGEMENT"
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
    locale:string;
}

export interface ISaleInfo{
    // saleId
    id: number;
    type: E_USER_TYPE;
    email: string;
    name: string;
}
