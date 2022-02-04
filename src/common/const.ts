export const E_L_CUSTOMER_TYPE = [
    {
        id: 1,
        name: "直属客户"
    },
    {
        id: 2,
        name: "代理下客户"
    }
]

export const E_L_USER_TYPE = [
    ...E_L_CUSTOMER_TYPE,
    {
        id: 3,
        name: "代理"
    }
]

/**
 * 查看的客户为直属还是代理客户
 * @param customer
 */
export const queryCustomerType = (customer: any) => {
    return !customer.agentId ? E_L_CUSTOMER_TYPE[0] : E_L_CUSTOMER_TYPE[1]
}

export enum E_COLOR{
    enable="#8BDEB0",
    disable="#F0615B"
}
