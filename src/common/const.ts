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

export enum E_COLOR{
    enable="#8BDEB0",
    disable="#F0615B",
    warn="#FFC96C",
    off="#F0615B"
}

export enum LABEL_COLOR{
    RED= "#FF1600",
    YELLOW="#04E314",
    GREEN="#04E314"
}
