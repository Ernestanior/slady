export interface IAgentSummaryDto{
    bandwidthCustomerCount: number;
    certCount: number;
    masterDomainCount: number;
    officialCustomerCount: number;
    probationCustomerCount: number;
    recordCount: number;
    siteCount: number;
    validCertCount: number;
}
export interface IBlockLogDto{
    clientIp: string;
    customerId: number;
    customerName: string;
    reportTime: string;
    siteId: number;
    siteName: string;
    type: string;
}
export interface IBlockLogListForm{
    customerId: number;
    endTime: string;
    ip: string;
    searchPage: ISearchPage;
    siteId: number;
    startTime: string;
    type: string;
}
export interface ICommonRespDto<IAgentSummaryDto>{
    code: number;
    data: IAgentSummaryDto;
    msg: string;
}
export interface ICustomerFrozenIpListFrom{
    clientIp: string;
    customerId: number;
    searchPage: ISearchPage;
    siteId: number;
    statForm: IStatForm;
    type: string;
}
export interface ICustomerListBandwidthDto{
    currentMonthBandwith: number;
    customerId: number;
    oneMonthAgoBandwith: number;
    twoMonthAgoBandwith: number;
}
export interface ICustomerSummaryDto{
    blackIpCount: number;
    certCount: number;
    masterDomainCount: number;
    recordCount: number;
    siteCount: number;
    siteGroupCount: number;
    surplusMasterDomain: number;
    validCertCount: number;
}
export interface IDailyCustomerDto{
    bandwidth95: number;
    customerId: number;
    statDate: string;
}
export interface IDefenceStatForm{
    codes: number [];
    statForm: IStatForm;
    type: string;
}
export interface IJSONObject{
}
export interface IListSiteStatDto{
    siteId: number;
    siteName: string;
    siteUniqueName: string;
    statDataValue: number;
}
export interface IListSiteStatForm{
    dataType: string;
    searchPage: ISearchPage;
    secondaryType: string;
    statBandwithForm: IStatBandWithForm;
    statForm: IStatForm;
}
export interface IMcnSummaryDto{
    blackIpCount: number;
    certCount: number;
    cnameSiteCount: number;
    siteCount: number;
    siteGroupCount: number;
    surplusCname: number;
    validCertCount: number;
}
export interface IPageResult<IBlockLogDto>{
    content: IBlockLogDto [];
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface ISearchPage{
    desc: number;
    page: number;
    pageSize: number;
    sort: string;
}
export interface IStatBandWithForm{
    dateType: string;
    statDate: string;
}
export interface IStatForm{
    customerId: number;
    endDate: string;
    reportType: string;
    siteIds: number [];
    startDate: string;
}
export interface IStatNode{
    key: number;
    value: number;
}
export interface IStatSpeedLimitTimeForm{
    keyWord: string;
    searchPage: ISearchPage;
    siteId: number;
    statForm: IStatForm;
}
export interface IStatSpeedLimitTimeList{
    clientIp: string;
    count: number;
    country: string;
    payload: string;
    rate: string;
    reportTime: string;
    siteId: number;
    siteName: string;
    type: string;
    uri: string;
}
export interface IStatStateDto{
    sts0NodeList: IStatNode [];
    stsNodeList: IStatNode [];
}
export interface IStatStateListForm{
    fields: string[];
    statForm: IStatForm;
}
export interface IType{
    typeName: string;
}


type IString = string;

interface IMap<T, S>{
    code: T,
    name: S
}
