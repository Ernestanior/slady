export interface IAccessForm {
    accessEnable: number;
    siteId: number;
    siteName: string;
    siteUniqueName: string;
}
export interface IAccessRateForm {
    ltConnections: number;
    ltIpRate: string;
    ltRate: number;
    ltUriRate: string;
    siteId: number;
    switchStatus: number;
}
export interface IAdvanceFilter {
    clientIp: string;
    countryCode: string;
    customerName: string;
    rate: string;
    siteName: string;
    type: string;
    uri: string;
}
export interface IAgentSummaryDto {
    bandwidthCustomerCount: number;
    certCount: number;
    masterDomainCount: number;
    officialCustomerCount: number;
    probationCustomerCount: number;
    recordCount: number;
    siteCount: number;
    validCertCount: number;
}
export interface IAlert5xxForm {
    lt5xxAlert: number;
    siteId: number;
    switchStatus: number;
}
export interface IAntiLeechForm {
    safetyChainList: string[];
    siteId: number;
    switchStatus: number;
}
export interface IAreaDto {
    category: string;
    description: string;
    id: number;
    name: string;
    type: string;
}
export interface IBalanceSummaryDto {
    usedBandwidth: number;
    usedCerts: number;
    usedCnames: number;
    usedCustomPorts: number;
    usedMasterNames: number;
    usedPorts: number;
}
export interface IBandwidthForm {
    ltBandwidth: number;
    siteId: number;
    switchStatus: number;
}
export interface IBaseCertForm {
    sslCrt: string;
    sslKey: string;
}
export interface IBaseRespDto {
    code: number;
    msg: string;
}
export interface IBatchCertFrom {
    certs: IBaseCertForm[];
    siteId: number;
}
export interface IBlackCommonCustomPageForm {
    content: string;
    id: number;
    siteId: number;
    status: number;
}
export interface IBlackTimeForm {
    ltBlackTime: number;
    siteId: number;
    switchStatus: number;
}
export interface IBrandDto {
    customerId: number;
    description: string;
    id: number;
    name: string;
    uid: string;
}
export interface IBrandForm {
    customerId: number;
    description: string;
    id: number;
    name: string;
    siteIds: number[];
}
export interface IBrandListDto {
    customerId: number;
    customerName: string;
    id: number;
    name: string;
    siteCounts: number;
    uid: string;
}
export interface IBrandListForm {
    customerId: string;
    keyWord: string;
    name: string;
    searchPage: ISearchPage;
}
export interface ICacheConfigDto {
    cacheControl: string;
    cacheExpire: string;
    cacheExt: string;
    cacheIgnoreArgs: number;
    cacheMethod: string;
    id: number;
}
export interface ICacheForm {
    cacheControl: string;
    cacheExt: string;
    cacheMethod: string;
    ignoreArgs: number;
}
export interface ICacheInfoDto {
    cache: number;
    cacheConfig: ICacheConfigDto;
    cacheUri: number;
    proxyUri: number;
    siteCacheUriList: ISiteCacheUriDto[];
    sitePreUriList: ISitePreUriDto[];
    siteProxyUriList: ISiteProxyUriDto[];
    sliceInfo: ISliceInfo;
}
export interface ICacheNode {
    type: string;
    uri: string;
}
export interface ICertAssignForm {
    certId: number;
    domainList: ISiteDomainDto[];
}
export interface ICertDetailDto {
    id: number;
    sslCrt: string;
    sslKey: string;
}
export interface ICertDto {
    algorithm: string;
    customerId: number;
    customerName: string;
    domains: string;
    endDate: string;
    id: number;
    issuer: string;
    pubKeyAlg: string;
    pubKeyLen: string;
    sslAuto: number;
    sslDomains: string;
    sslExpire: string;
    startDate: string;
    subject: string;
}
export interface ICertExtraDto {
    algorithm: string;
    domains: string;
    endDate: string;
    issuer: string;
    pubKeyAlg: string;
    pubKeyLen: string;
    siteDomainList: ISiteDomainDto[];
    sslDomains: string;
    sslExpire: string;
    startDate: string;
    subject: string;
}
export interface ICertForm {
    customerId: number;
    id: number;
    siteId: number;
    sslAutoEnable: number;
    sslCrt: string;
    sslForceEnable: number;
    sslKey: string;
}
export interface ICertListDto {
    createDate: string;
    customerId: number;
    customerName: string;
    id: number;
    sslAuto: number;
    sslDomains: string;
    sslExpire: string;
}
export interface ICertListForm {
    customerId: number;
    domainName: string;
    domainNamePreciseSearch: number;
    expireState: string;
    keyWord: string;
    searchPage: ISearchPage;
    siteId: number;
    siteName: string;
    siteNamePreciseSearch: number;
    sslAuto: number;
}
export interface ICertMgntListDto {
    certCount: number;
    certPage: IPageResult<ICertSiteListDto>;
    dueCertCount: number;
}
export interface ICertRequestForm {
    customerId: number;
    certSupplier: string;
    forceHttps: number;
    domains: string[];
}
export interface ICertSiteListDto {
    certId: number;
    siteId: number;
    siteName: string;
    siteUniqueName: string;
    sslAuto: number;
    sslDomains: string;
    sslExpire: string;
}
export interface ICertUploadForm {
    customerId: number;
    siteDomainList: ISiteDomainDto[];
    sslDomains: string;
}
export interface ICharsetForm {
    charset: string;
    siteId: number;
    switchStatus: number;
}
export interface IClearFrozenIpFrom {
    category: string;
    customerId: number;
    ip: string;
    siteId: number;
}
export interface ICommonCacheForm {
    cacheNodeList: ICacheNode[];
    siteId: number;
    switchStatus: number;
}
export interface ICommonCustomPageForm {
    pageList: ICommonSitePageForm[];
    siteId: number;
    status: number;
}
export interface ICommonRespDto<IAgentSummaryDto> {
    code: number;
    data: IAgentSummaryDto;
    msg: string;
}
export interface ICommonSitePageForm {
    code: string;
    content: string;
    id: number;
}
export interface ICompressionForm {
    compress: string;
    compressLevel: number;
    siteId: number;
    switchStatus: number;
}
export interface ICondition {
    all: boolean;
    custom: boolean;
    oneDay: boolean;
}
export interface IConnectionForm {
    proxyTime: number;
    siteId: number;
    switchStatus: number;
}
export interface ICustomPortDto {
    id: number;
    port: number;
    type: string;
}
export interface ICustomPortForm {
    id: number;
    port: number;
    type: string;
}
export interface ICustomRedirectPageForm {
    redirectList: IRedirectForm[];
    siteId: number;
}
export interface ICustomUriForm {
    siteId: number;
    switchStatus: number;
    uriList: IWafUriForm[];
}
export interface ICustomerFrozenIpListForm {
    clientIp: string;
    country: string;
    customerId: number;
    endDate: string;
    rate: string;
    siteId: number;
    startDate: string;
    type: string;
    uri: string;
}
export interface ICustomerSummaryDto {
    blackIpCount: number;
    certCount: number;
    masterDomainCount: number;
    recordCount: number;
    siteCount: number;
    siteGroupCount: number;
    surplusMasterDomain: number;
    validCertCount: number;
}
export interface IDateTimeNode {
    endTime: string;
    startTime: string;
}
export interface IDomainDelForm {
    customerIds: number[];
    domains: string;
}
export interface IDomainForm {
    nameList: string[];
    siteId: number;
    sslEnable: number;
}
export interface IDomainHttpsDto {
    domainId: number;
    forceHttps: number;
    name: string;
}
export interface IDomainListDto {
    createDate: string;
    customerId: number;
    customerName: string;
    displayMasterName: string;
    displayName: string;
    dnsStatus: number;
    id: number;
    masterName: string;
    name: string;
    siteId: number;
    siteName: string;
    siteUniqueName: string;
    sslAuto: number;
    sslEnable: number;
    sslExpire: string;
    upstream: string;
    wwwRedirect: number;
}
export interface IDomainListForm {
    customerId: number;
    displayName?: string;
    dnsStatus?: number;
    domainNamePreciseSearch?: number;
    isDeleted?: number;
    keyWord?: string;
    masterName?: string;
    searchPage: ISearchPage;
    siteId?: number;
    siteName?: string;
    siteNamePreciseSearch?: number;
    siteUniqueName?: string;
}
export interface IDomainMgntListDto {
    domainCount: number;
    domainPage: IPageResult<IDomainListDto>;
    recordCount: number;
}
export interface IForwardForm {
    id: number;
    name: string;
    siteId: number;
    targetUrl: string;
    type: string;
}
export interface IForwardListDto {
    customerId: number;
    domain: string;
    id: number;
    record: string;
    siteId: number;
    siteUniqueName: string;
    targetUrl: string;
    type: string;
}
export interface IForwardListForm {
    keyWord: string;
    searchPage: ISearchPage;
    siteId: number;
}
export interface IFrozenIpListForm {
    advanceFilter: IAdvanceFilter;
    condition: ICondition;
    dateTime: IDateTimeNode;
    keyWord: string;
    searchPage: ISearchPage;
}
export interface IHeadForm {
    headKey: string;
    headValue: string;
    id: number;
    type: string;
}
export interface IHostForm {
    overwriteHost: string;
    siteId: number;
    switchStatus: number;
}
export interface IHstsForm {
    hstsMax: number;
    hstsPreLoad: number;
    hstsSubDomain: number;
    siteId: number;
    switchStatus: number;
}
export interface IIdsForm {
    ids: number[];
    siteId: number;
}
export interface IJSONObject {
}
export interface IMcnSummaryDto {
    blackIpCount: number;
    certCount: number;
    cnameSiteCount: number;
    siteCount: number;
    siteGroupCount: number;
    surplusCname: number;
    validCertCount: number;
}
export interface INoticeDto {
    botToken: string;
    cacheNotice: number;
    ccNotice: number;
    dueCertNotice: number;
    ltNotice: number;
    method: string;
    mvNotice: number;
    receiver: string;
}
export interface INoticeForm {
    botToken: string;
    cacheNotice: number;
    ccNotice: number;
    dueCertNotice: number;
    ltNotice: number;
    method: string;
    mvNotice: number;
    receiver: string;
}
export interface IPageResult<IBrandListDto> {
    content: IBrandListDto[];
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface IPortForm {
    httpPort: number;
    httpsPort: number;
    siteId: number;
    switchStatus: number;
}
export interface IPortUsageDto {
    totalUsedPort: number;
    usedPortList: number[];
}
export interface IProxyPortDto {
    description: string;
    id: number;
    nodePort: number;
    proxyProtocol: number;
    type: string;
    upstream: string;
}
export interface IProxyPortForm {
    description: string;
    id: number;
    nodePort: number;
    proxyProtocol: number;
    siteId: number;
    sourceList: ISourceDto[];
    type: string;
}
export interface IProxyPortListForm {
    searchPage: ISearchPage;
    siteId: number;
}
export interface IRedirectForm {
    category: number;
    displayCountryList: string[];
    domainId: number;
    method: string;
    status: number;
    target: string;
    type: string;
    userAgentList: string[];
}
export interface IReplaceContentForm {
    pageReplace: number;
    pageReplaceOnce: number;
    replaceFormList: IReplaceForm[];
    siteId: number;
}
export interface IReplaceForm {
    id: number;
    newValue: string;
    oldValue: string;
}
export interface IRootRateForm {
    ltRootRate: string;
    siteId: number;
    switchStatus: number;
}
export interface ISearchForm {
    keyWord: string;
    searchPage: ISearchPage;
}
export interface ISearchPage {
    desc: number;
    page: number;
    pageSize: number;
    sort: string;
}
export interface ISiteAreaStatDto {
    areaId: number;
    description: string;
    name: string;
    siteCount: number;
}
export interface ISiteCacheListDto {
    cronEnable: number;
    cronExp: string;
    id: number;
    keyword: string;
    operateType: string;
    siteId: number;
    type: string;
    uniqueName: string;
}
export interface ISiteCacheUriDto {
    id: number;
    siteId: number;
    type: string;
    uri: string;
}
export interface ISiteConfDto {
    charset: string;
    charsetSwitch: number;
    compress: string;
    compressLevel: number;
    compressionSwitch: number;
    crossAccessSwitch: number;
    customHeadSwitch: number;
    customPortList: ICustomPortDto[];
    customPortSwitch: number;
    headList: ISiteHeadDto[];
    httpPort: number;
    httpsPort: number;
    id: number;
    overwriteHost: string;
    overwriteHostSwitch: number;
    proxyTime: number;
    proxyTimeSwitch: number;
    safetyChainList: string[];
    safetyChainSwitch: number;
    websocketSwitch: number;
}
export interface ISiteConfPortForm {
    customPortList: ICustomPortForm[];
    siteId: number;
    switchStatus: number;
}
export interface ISiteDnsForm {
    dnsValue: string;
    siteId: number;
}
export interface ISiteDomainDto {
    name: string;
    siteId: number;
}
export interface ISiteDto {
    backup: number;
    brandId: number;
    cloneId: number;
    createDate: string;
    customerId: number;
    customerName: string;
    description: string;
    dnsValue: string;
    domains: number;
    id: number;
    middle: number;
    name: string;
    portAreaId: number;
    records: number;
    status: number;
    type: string;
    uniqueName: string;
    upstream: string;
    upstreamBalance: string;
    upstreamDetail: string;
    upstreamKeepalive: number;
    upstreamPortFlag: number;
    upstreamProtocol: string;
}
export interface ISiteFirewallDto {
    countryFlag: number;
    domainFlag: number;
    fwFlag: number;
    id: number;
    ipFlag: number;
    limitIpFlag: number;
    proxyDenyFlag: number;
    ruleFlag: number;
    uaFlag: number;
    uriFlag: number;
}
export interface ISiteFirewallForm {
    countryFlag: number;
    domainFlag: number;
    fwFlag: number;
    id: number;
    ipFlag: number;
    limitIpFlag: number;
    proxyDenyFlag: number;
    ruleFlag: number;
    uaFlag: number;
    uriFlag: number;
}

export interface IUpstreamConfigForm {
    checkInterval: number;
    defaultDown: number;
    fallCount: number;
    riseCount: number;
    siteId: number;
    switchStatus: number;
    timeout: number;
    type: string
}

export interface ISiteFirewallListDto {
    cname: string;
    customerName: string;
    firewallState: number;
    id: string;
    name: string;
}
export interface ISiteFirewallListForm {
    cname: string;
    customerName: string;
    firewallState: number;
    keyWord: string;
    searchPage: ISearchPage;
}
export interface ISiteForm {
    category: string;
    cloneId: number;
    customerId: number;
    description: string;
    id: number;
    name: string;
    type: string;
    upstreamBalance: string;
    upstreamList: ISourceDto[];
    upstreamProtocol: string;
    websocketFlag: number;
}
export interface ISiteHeadDto {
    headKey: string;
    headValue: string;
    id: number;
    type: string;
}
export interface ISiteHeadForm {
    headList: IHeadForm[];
    siteId: number;
    switchStatus: number;
}
export interface ISiteLimitRateDto {
    groupLimitId: number;
    id: number;
    limitRateGroupName: string;
    lt5xxAlert: number;
    lt5xxAlertSwitch: number;
    ltAccessSwitch: number;
    ltAutoThreshold: number;
    ltBandwidth: number;
    ltBandwidthSwitch: number;
    ltBlackTime: number;
    ltBlackTimeSwitch: number;
    ltConnections: number;
    ltCustomUrisSwitch: number;
    ltIpRate: string;
    ltRate: number;
    ltReleaseBlackSwitch: number;
    ltRootRate: string;
    ltRootSwitch: number;
    ltStatusCode: number;
    ltStatusCodeSwitch: number;
    ltSwitch: number;
    ltType: string;
    ltUriRate: string;
    uriList: IWafUriDto[];
}
export interface ISiteLimitRateForm {
    ltAutoThreshold: number;
    ltType: string;
    siteId: number;
}
export interface ISiteListDto {
    customerId: number;
    customerName: string;
    description: string;
    domains: number;
    id: number;
    name: string;
    records: number;
    status: number;
    type: string;
    uniqueName: string;
    upstream: string;
}
export interface ISiteListForm {
    customerId: number;
    customerName: string;
    keyWord: string;
    searchPage: ISearchPage;
    siteName: string;
    status: number;
    type: string;
    uniqueName: string;
    upstream: string;
}
export interface ISitePreUriDto {
    fullUri: string;
    id: number;
    siteId: number;
    uri: string;
}
export interface ISiteProxyUriDto {
    id: number;
    siteId: number;
    type: string;
    uri: string;
}
export interface ISitePurgeDto {
    cronEnable: number;
    cronExp: string;
    id: number;
    keyword: string;
    operateType: string;
    siteId: number;
    type: string;
    uniqueName: string;
}
export interface ISitePurgeForm {
    cronEnable: number;
    cronExp: string;
    keyword: string;
    operateType: string;
    siteId: number;
    type: string;
}
export interface ISiteSslDto {
    forceHttpsSwitch: number;
    hstsMax: number;
    hstsPreLoad: number;
    hstsSubDomain: number;
    hstsSwitch: number;
    sslTls: string;
}
export interface ISiteSwitchForm {
    name: string;
    siteId: number;
    switchStatus: number;
}
export interface ISiteUserForm {
    siteAccessList: IAccessForm[];
    userId: number;
}
export interface ISiteUserListDto {
    accessEnable: number;
    siteId: number;
    siteName: string;
    siteUniqueName: string;
    status: number;
}
export interface ISiteUserListForm {
    keyWord: string;
    searchPage: ISearchPage;
    siteName: string;
    status: number;
    uniqueName: string;
    userId: number;
}
export interface ISiteWafBasicDto {
    blackArea: string[];
    blackDomain: string[];
    blackGroupName: string;
    blackIpList: IPageResult<IWafBlackIpDto>;
    blackMethod: string[];
    blackReferer: string[];
    blackUa: string[];
    ccCookie302: number;
    ccJschallenge: number;
    ccSwitch: number;
    ccType: string;
    displayBlackArea: string[];
    displayWhiteArea: string[];
    groupBlackId: number;
    groupWhiteId: number;
    id: number;
    wafBlackSwitch: number;
    wafSwitch: number;
    wafWhiteCrawler: number;
    wafWhiteDeny: number;
    wafWhiteSwitch: number;
    whiteArea: string[];
    whiteCrawler: string[];
    whiteDenyCategory: string;
    whiteGroupName: string;
    whiteIpList: IPageResult<IWafWhiteIpDto>;
    whiteUa: string[];
    whiteUri: string[];
    whiteUriMethodList: IWafWhiteUriDto[];
}
export interface ISiteWafCcForm {
    ccAutoThreshold: number;
    ccCookie302: number;
    ccJschallenge: number;
    ccProxyDeny: number;
    ccRecaptcha: number;
    ccSwitch: number;
    ccType: string;
    siteId: number;
    wafMonitorUa: number;
    wafUaDeny: number;
    wafUaFormat: number;
}
export interface ISiteWafDefDto {
    ccAutoThreshold: number;
    ccCookie302: number;
    ccJschallenge: number;
    ccProxyDeny: number;
    ccRecaptcha: number;
    ccSwitch: number;
    ccType: string;
    id: number;
    naxisRuleList: string[];
    token: string;
    tokenExpired: number;
    tokenGlobalSwitch: number;
    uriList: string[];
    wafApiToken: number;
    wafMonitorUa: number;
    wafSqlDeny: number;
    wafSwitch: number;
    wafUaDeny: number;
    wafUaFormat: number;
    wafXssDeny: number;
}
export interface ISiteWafDto {
    blackArea: string;
    blackDomain: string;
    blackMethod: string;
    blackReferer: string;
    blackUa: string;
    ccAutoThreshold: number;
    ccType: string;
    displayBlackArea: string;
    displayWhiteArea: string;
    fwBlackTime: number;
    groupBlackId: number;
    groupLimitId: number;
    groupWhiteId: number;
    id: number;
    lt5xxAlert: number;
    ltAutoThreshold: number;
    ltBandwidth: number;
    ltBlackTime: number;
    ltConnections: number;
    ltIpRate: string;
    ltRate: number;
    ltRootRate: string;
    ltStatusCode: number;
    ltType: string;
    ltUriRate: string;
    naxsiRules: string;
    token: string;
    tokenCheckList: string;
    tokenExpired: number;
    tokenGlobalSwitch: number;
    whiteArea: string;
    whiteCrawler: string;
    whiteUa: string;
    whiteUri: string;
}
export interface ISiteWafForm {
    areaList: string[];
    crawlerList: string[];
    domainList: string[];
    ipFormList: IWafIpForm[];
    methodList: string[];
    refererList: string[];
    siteId: number;
    switchStatus: number;
    uaList: string[];
    uriList: string[];
    whiteUriMethodList: IWafWhiteUriForm[];
}
export interface ISiteWafGroupForm {
    id: number;
    name: string;
    siteId: number;
    type: string;
}
export interface ISliceForm {
    cacheSliceExt: string;
    cacheSliceSize: number;
    siteId: number;
    switchStatus: number;
}
export interface ISliceInfo {
    cacheSlice: number;
    cacheSliceExt: string;
    cacheSliceSize: number;
}
export interface ISourceDto {
    host: string;
    port: number;
}
export interface ISpecialPortDto {
    message: string;
    port: number;
}
export interface ISpecialPortListDto {
    customerId: number;
    customerName: string;
    port: number;
    siteId: number;
    siteName: string;
    siteUniqueName: string;
    type: string;
}
export interface ISpecialPortListForm {
    keyWord: string;
    port: string;
    searchPage: ISearchPage;
    siteName: string;
    siteUniqueName: string;
}
export interface IStatLimitListDto {
    clientIp: string;
    countryCode: string;
    countryName: string;
    counts: number;
    customerId: number;
    customerName: string;
    rate: string;
    reportTime: string;
    siteId: number;
    siteName: string;
    type: string;
    uri: string;
}
export interface IStatusCodeForm {
    ltStatusCode: number;
    siteId: number;
    switchStatus: number;
}
export interface ISwitchForm {
    siteId: number;
    switchStatus: number;
}
export interface ITlsForm {
    siteId: number;
    sslTls: string;
    switchStatus: number;
}
export interface ITopDomainListDto {
    children: IDomainListDto[];
    displayMasterName: string;
    domainCount: number;
}
export interface IUpstreamBatchForm {
    customerId: number;
    newUpstream: string;
    oldUpstream: string;
    siteIds: number[];
}
export interface IUpstreamForm {
    id: number;
    loadBalance: string;
    protocol: string;
    sourceList: ISourceDto[];
    upstreamDetail: string;
    upstreamPortFlag: number;
}

export interface IUpstreamKeepAliveForm {
    id: number;
    upstreamKeepalive: number;
    upstreamKeepaliveRequests: number;
    upstreamKeepaliveTimeout: number;
}

export interface IOperateAdminForm {
    actionType: string;
    ids: string[];
}

export interface IUpstreamListDto {
    id: number;
    name: string;
    upstream: string;
}
export interface IUpstreamListForm {
    customerId: number;
    searchPage: ISearchPage;
    upstream: string;
}
export interface IAdminListForm {
    searchPage: ISearchPage;
    customerId: number;
    customerName: string;
    keyWord: string;
    siteName: string;
    status: number;
    type: string;
    uniqueName: string;
    upstream: string;
}

export interface IUpstreamViewDto {
    sourceList: ISourceDto[];
    upstreamBalance: string;
    upstreamDetail: string;
    upstreamPortFlag: number;
    upstreamProtocol: string;
}
export interface IWafAccessAuthForm {
    siteId: number;
    token: string;
    tokenExpired: number;
    tokenGlobalSwitch: number;
    uriList: string[];
    wafApiToken: number;
}
export interface IWafBlackGroupForm {
    blackDomain: string[];
    blackIps: string[];
    blackMethod: string[];
    blackReferer: string[];
    blackUa: string[];
    displayBlackArea: string[];
    id: number;
}
export interface IWafBlackIpDto {
    blackIp: string;
    remark: string;
    siteId: number;
}
export interface IWafConfigOpsForm {
    actionType: string;
    customerId: number;
    dataList: string[];
    isAllSites: number;
    newData: string;
    oldData: string;
    siteIds: number[];
    targetType: string;
}
export interface IWafGroupDto {
    id: number;
    name: string;
    type: string;
}
export interface IWafGroupIpForm {
    id: number;
    ipList: string[];
}
export interface IWafGroupIpListForm {
    id: number;
    keyWord: string;
    searchPage: ISearchPage;
}
export interface IWafGroupListForm {
    siteId: number;
    type: string;
}
export interface IWafInjectionForm {
    naxisRuleList: string[];
    siteId: number;
    wafSqlDeny: number;
    wafXssDeny: number;
}
export interface IWafIpForm {
    ip: string;
    remark: string;
}
export interface IWafIpListForm {
    keyWord: string;
    searchPage: ISearchPage;
    siteId: number;
}
export interface IWafLimitGroupForm {
    id: number;
    lt5xxAlert: number;
    lt5xxAlertSwitch: number;
    ltAccessSwitch: number;
    ltAutoThreshold: number;
    ltBandwidth: number;
    ltBandwidthSwitch: number;
    ltBlackTime: number;
    ltBlackTimeSwitch: number;
    ltConnections: number;
    ltCustomUrisSwitch: number;
    ltIpRate: string;
    ltRate: number;
    ltReleaseBlackSwitch: number;
    ltRootRate: string;
    ltRootSwitch: number;
    ltStatusCode: number;
    ltStatusCodeSwitch: number;
    ltSwitch: number;
    ltType: string;
    ltUriRate: string;
    uriList: IWafUriForm[];
}
export interface IWafPolicyGroupDto {
    id: number;
    name: string;
    siteList: ISiteListDto[];
}
export interface IWafPolicyGroupForm {
    customerId: number;
    id: number;
    name: string;
    siteIds: number[];
    type: string;
}
export interface IWafPolicyGroupListDto {
    id: number;
    name: string;
    type: string;
    userName: string;
}
export interface IWafPolicyGroupListForm {
    customerId: number;
    keyWord: string;
    searchPage: ISearchPage;
    type: string;
}
export interface IWafUriDto {
    id: number;
    rate: string;
    uri: string;
}
export interface IWafUriForm {
    id: number;
    rate: string;
    uri: string;
}
export interface IWafWhiteDenyForm {
    category: string;
    siteId: number;
    switchStatus: number;
}
export interface IWafWhiteGroupForm {
    displayWhiteArea: string[];
    id: number;
    whiteCrawler: string[];
    whiteCrawlerSwitch: number;
    whiteDenyCategory: string;
    whiteDenySwitch: number;
    whiteIps: string[];
    whiteUa: string[];
    whiteUri: string[];
    whiteUriMethodList: IWafWhiteUriForm[];
}
export interface IWafWhiteIpDto {
    remark: string;
    siteId: number;
    whiteIp: string;
}
export interface IWafWhiteUriDto {
    id: number;
    method: string;
    uri: string;
}
export interface IWafWhiteUriForm {
    id: number;
    method: string;
    uri: string;
}
export interface ICheckDomainDuplicate {
}

export interface IRequestWebValidate {
}

export interface IValidateDomainDNS {
}

export interface IDomainBlockCreate {
}

export interface IDomainBlockDelete {
}

export interface IDomainBlockExport {
}

export interface IDomainBlockList {
}

export interface IDomainBlockModify {

}

export interface IDomainBlockBatchCreate {
    
}