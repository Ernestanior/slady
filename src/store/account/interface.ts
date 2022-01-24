export enum E_USER_TYPE{
    SALE = "saler",
    SALE_MANAGER = 'sales_manager'
}

export interface IAccountInfo{
    /** 用户id */
    id: number;
    /** 用户类型 */
    type: E_USER_TYPE;
    /** 密码过期状态
     * 0: 无需更新
     * 1: 30天内更新
     * 2: 强制更新
     */
    pwdStatus: 0 | 1 | 2;
    /**启用2FA校验 */
    authFlag: -1 | 1 | 2;
}
