export interface IDateItemOne {
    attackType: string;
    description: string;
    endTime: string;
    flow: string;
    startTime: string;
}
export interface IDateItemtwo {
    clientIp: string;
    region: string;
    country: string;
    reportTime: string;
}
export enum EChartKeys {
    BLACK = 0,
    RSBAC = 1,
    MALICIOUSACCESS = 2,
    TOP30IPS = 3
}
export enum Tableinfotext {
    CURRENT = "CURRENT",
    MAX = "BIGGEST",
    MIN = "SMALLEST",
    AVG = "AVERAGE"
}

export interface BlackListInterFace<T = any> {
    uaBlackList: T[];//黑名单UA
    countryBlackList: T[];//区域黑名单
    requestBlackList: T[];//请求方式黑名单
    domainBlackList: T[];//Domain黑名单
    refererBlackList: T[];//referer黑名单
    refererChainList: T[];//防盗链
    uriBlackList: T[];//uri 黑名单
    ipBlackList: T[]
}

export interface numFunInter {
    current: number;
    max: number;
    min: number;
    avg: number;
}

//防御统计状态码
export enum DefensiveKeys {
    /**未定义缺省值*/
    // UNDEFINDEDVALUE = 600,
    /**控制台配置黑名单拦截*/
    CONSOLEBLACKLIST = 600,
    /**限速黑名单拦截 */
    SPEEDLIMITBLACKLIST=601,
    /**请求方法黑名单检测 */
    REQUESTMETHODBLACKLIST=602,
    /**UA黑名单检测*/
    UABLACKLIST=603,
    /**referer黑名单*/
    REFERERBLACKLIST=604,
    /**referer防盗链拦截*/
    REFERERANTILEECH=605,
    /**domain黑名单拦截*/
    DOMAINBLACKLIST=606,
    /**国家白名单拦截 */
    COUNTRYWHITELIST=607,
    /**国家黑名单拦截 */
    COUNTRYBLACKLIST=608,
    /**地区黑名单拦截 */
    REGIONBLACKLIST=609,
    /**单链接访问速率限制 */
    SINGLELINKACCESSRETE=610,
    /**禁止携带 x_forwarded_for 访问拦截 */
    FORBIDX_FORWARDED_FOR=611,
    /**站点并未配置或者未指向 */
    SITENOTDIRECTED=612,
    /**用户访问了禁用站点 */
    ACCESSBANNEDSITE=613,
    /**客户未存在 */
    CUSTOMERDOESNOTEXIST=614,
    /**用户访问了禁用客户 */
    ACCESSBANNEDCUSTOMER=615,
    /**站点跳转出错 */
    SITEJUMPERROR=616,
    /**域名不存在 */
    DOMAINDOESNOTEXIST=617,
    /**URI黑名单 */
    URIBLACKLIST=618,
    /**API token非法 */
    ILLEGALAPITOKEN =619,
    /**访问了非法端口 */
    INVALIDACCESSEDPORT=620,
    /**sql 注入 */
    SQL_INJECTION=621,
    /**xss 注入 */
    XSS_INJECTION=622,
    /** */
    RESTSCODE=623,
}