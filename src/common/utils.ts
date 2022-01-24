/**
 * 字符串转大写
 */
export const upperCasePlx = (value: string | number) =>
    typeof value === "string" ? value.toUpperCase() : value;