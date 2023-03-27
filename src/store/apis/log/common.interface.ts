export interface IAccessLogDto {
    accessTime: string;
    clientIp: string;
    loginId: string;
    region: string;
    token: string;
    userAgent: string;
    userId: number;
}
export interface IAccessLogForm {
    keyWord?:string;
    searchPage: ISearchPage;
}
export interface IBaseRespDto {
    code: number;
    msg: string;
}
export interface IBlockIpDto {
    category: string;
    clientIp: string;
    customerId: number;
    customerName: string;
    fwBlackSec: number;
    ipBlackSec: number;
    nodeIp: string;
    payload: string;
    reportTime: string;
    siteId: number;
    siteUniqueName: string;
    type: string;
}
export interface ICacheClearForm {
    endDate: string;
    keyWord: string;
    method: string;
    searchPage: ISearchPage;
    startDate: string;
    type: string;
    userId: number;
}
export interface ICacheClearListDto {
    detail: string;
    email: string;
    id: number;
    method: string;
    operateDate: string;
    siteName: string;
    type: string;
    userId: number;
}
export interface ICacheLogForm {
    customerId: number;
    customerName: string;
    detail: string;
    method: string;
    operateDate: string;
    siteId: number;
    siteName: string;
    siteUniqueName: string;
    type: string;
    userId: number;
    userName: string;
}
export interface ICacheLogListDto {
    cacheRatio: number;
    customerName: string;
    operateDate: string;
    siteId: number;
    siteName: string;
    siteUniqueName: string;
}
export interface ICacheLogListForm {
    customerId: number;
    customerName: string;
    keyWord: string;
    searchPage: ISearchPage;
    siteName: string;
    uniqueName: string;
}
export interface ICertGenLogDto {
    category: string;
    completeTime: string;
    customerId: number;
    domain: string;
    errorCode: string;
    id: string;
    operateTime: string;
    status: number;
    type: string;
}
export interface IClearBlockIpForm {
    blackIp: string;
    siteId: number;
}
export interface ICommonListForm {
    customerId: number;
    keyWord: string;
    searchPage: ISearchPage;
    siteId: number;
}
export interface ICommonRespDto<IDdosLogDto> {
    code: number;
    data: IDdosLogDto;
    msg: string;
}
export interface IDdosLogDto {
}
export interface IDdosLogForm {
}
export interface IDdosLogListForm {
    searchPage: ISearchPage;
}
export interface IEmailLogDto {
}
export interface IEmailLogForm {
}
export interface IEmailLogListForm {
    searchPage: ISearchPage;
}
export interface IGeoIpDto {
    cityName: string;
    countryName: string;
    regionName: string;
}
export interface ILogConfigForm {
    enableFlag: number;
    fieldName: string;
}
export interface INoticeLogDto {
}
export interface INoticeLogForm {
}
export interface INoticeLogListForm {
    searchPage: ISearchPage;
}
export interface IOperateLogDto {
    categoryId: number;
    entityId: string;
    logTime: string;
    method: string;
    name: string;
    requestArgs: string;
    requestBody: string;
    requestMethod: string;
    requestUri: string;
    userId: string;
    userName: string;
    userType: string;
}
export interface IOperateLogForm {
    searchPage: ISearchPage;
    userId: number | null;
    startDate: string;
    endDate: string;
    keyWord?: string;
}
export interface IPageResult<IAccessLogDto> {
    content: IAccessLogDto[];
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface ISearchPage {
    desc: number;
    page: number;
    pageSize: number;
    sort: string;
}
export interface IServerLogConfigDto {
    enableFlag: number;
    fieldName: string;
}
export interface IServerLogConfigForm {
    configList: ILogConfigForm[];
    customerId: number;
}
export interface IServerLogListDto {
    args: string;
    bodyBytesSent: number;
    contentLength: number;
    customerId: number;
    displayUpstreamAddr: string;
    geoip: IGeoIpDto;
    httpCookie: string;
    httpHost: string;
    httpReferer: string;
    httpUserAgent: string;
    httpXForwardedFor: string;
    mobileRequest: string;
    nodeIp: string;
    remoteAddr: string;
    remotePort: number;
    requestLength: number;
    requestMethod: string;
    requestTime: number;
    requestUri: string;
    scheme: string;
    sentHttpCacheControl: string;
    sentHttpContentType: string;
    serverProtocol: string;
    siteId: number;
    siteUniqueName: string;
    sslProtocol: string;
    status: number;
    timeLocal: string;
    upstreamAddr: string[];
    upstreamCacheStatus: string;
    upstreamResponseTime: number;
    upstreamStatus: number;
}
export interface IServerLogListForm {
    endDate?: string;
    fieldList?: string[];
    httpHost?: string;
    keyWord?: string;
    remoteAddr?: string;
    requestUri?: string;
    searchPage?: ISearchPage;
    siteUniqueName?: string;
    startDate?: string;
    status?: string;
    timezone?: string;
}
export interface IDnsLogListForm {
    endDate: string;
    operateType: string;
    operator: string;
    record: string;
    searchPage: ISearchPage;
    startDate: string;
}

export interface IDomainLogListForm {
    keyWord?: string;
    searchPage?: ISearchPage;
    customerId: number;
    domain: string;
}

export interface ICertgenLogListForm {
    customerId: number;
    domain: string;
    keyWord: string;
    searchPage: ISearchPage;
    status: number;
}

export interface IFindCacheLogBySiteIdsForm {

}

export interface IDomainExportListForm {}
