export interface IAccessWhiteDto {
    accessWhiteFlag: number;
    ipList: string[];
}
export interface IAccessWhiteForm {
    ipList: string[];
    switchStatus: number;
}
export interface IAgentDto {
    agentName: string;
    dnsValue: string;
    id: number;
    userEmail: string;
    userName: string;
}
export interface IAgentForm {
    dnsValue: string;
    email: string;
    id?: number;
    name: string;
    saleId?: number
}
export interface IAgentListDto {
    dnsValue: string;
    email: string;
    id: number;
    name: string;
    parentId: number;
}
export interface IAgentListForm {
    keyWord: string;
    searchPage: ISearchPage;
}
export interface IAppTokenDto {
    createDate: string;
    id: string;
    token: string;
    type: string;
}
export interface IAppTokenForm {
    id: string;
    type: string;
}
export interface IAppTokenListForm {
    searchPage: ISearchPage;
}
export interface IAreaDto {
    category: string;
    description: string;
    id: number;
    name: string;
    type: string;
}
export interface IBalanceDto {
    totalAmount: string;
    usedAmount: string;
}
export interface IBaseRespDto {
    code: number;
    msg: string;
}
export interface ICategoryDto {
    deepestFlag: number;
    id: number;
    name: string;
    parentId: number;
    parentName: string;
    type: string;
}
export interface ICategoryForm {
    deepestFlag: number;
    id: number;
    name: string;
    parentId: number;
}
export interface ICategoryListForm {
    deepestFlag: string;
    keyWord: string;
    name: string;
    nameEnUs: string;
    nameZhCn: string;
    nameZhTw: string;
    parentName: string;
    searchPage: ISearchPage;
    type: string;
}
export interface ICategoryStatusForm {
    enableFlag: number;
    id: number;
}
export interface ICommonRespDto<IAccessWhiteDto> {
    code: number;
    data: IAccessWhiteDto;
    msg: string;
}
export interface ICustomerBalanceDto {
    bandWidthBalance: IBalanceDto;
    certBalance: IBalanceDto;
    cnameBalance: IBalanceDto;
    customPortBalance: IBalanceDto;
    defenceBalance: IBalanceDto;
    domainBalance: IBalanceDto;
    email: string;
    name: string;
    portProxyBalance: IBalanceDto;
    probation: number;
    probationPeriod: number;
    probationStart: string;
    subAccountBalance: IBalanceDto;
    tokenBalance: IBalanceDto;
    type: string;
}
export interface ICustomerCateDto {
    deepestFlag: number;
    enableFlag: number;
    id: number;
    name: string;
    parentId: number;
    type: string;
}
export interface ICustomerCateForm {
    categoryList: ICategoryStatusForm[];
    customerId: number;
}
export interface ICustomerDto {
    category: string;
    id: number;
    limitBandwidth: number;
    limitCerts: number;
    limitCnames: number;
    limitCustomPorts: number;
    limitDefence: number;
    limitDomains: number;
    limitMasterDomains: number;
    limitPorts: number;
    limitSiteCerts: number;
    limitSiteDomains: number;
    limitSubAccounts: number;
    limitTokens: number;
    mainlandOpt: number;
    name: string;
    probation: number;
    probationPeriod: number;
    probationStart: string;
    status: number;
    type: string;
    uid: string;
    usedBandwidth: number;
    usedCerts: number;
    usedCnames: number;
    usedCustomPorts: number;
    usedMasterNames: number;
    usedPorts: number;
    usedSubAccounts: number;
    usedTokens: number;
}
export interface ICustomerForm {
    category: string;
    email: string;
    id: number;
    limitBandwidth: number;
    limitCerts: number;
    limitCnames: number;
    limitCustomPorts: number;
    limitDefence: number;
    limitDomains: number;
    limitMasterDomains: number;
    limitPorts: number;
    limitSiteCerts: number;
    limitSubAccounts: number;
    limitTokens: number;
    mainlandOpt: number;
    name: string;
    plainPassword: string;
    probation: number;
    probationPeriod: number;
    type: string;
}
export interface ICustomerInfoDto {
    areaBackupId: number;
    areaMiddleId: number;
    dnsDomainList: string[];
    dnsIp: string;
    dnsValue: string;
    id: number;
    limitSiteDomains: number;
    noticeEmail: string;
    noticeFlag: number;
}
export interface ICustomerInfoForm {
    dnsDomainList: string[];
    dnsIp: string;
    dnsValue: string;
    id: number;
    limitSiteDomains: number;
    noticeEmail: string;
    noticeFlag: number;
}
export interface ICustomerQuarantineParamsForm {
}
export interface ICustomerListDto {
    category: string;
    email: string;
    id: number;
    limitBandwidth: number;
    limitCerts: number;
    limitCnames: number;
    limitCustomPorts: number;
    limitDefence: number;
    limitDomains: number;
    limitMasterDomains: number;
    limitPorts: number;
    limitSiteCerts: number;
    limitSubAccounts: number;
    limitTokens: number;
    mainlandOpt: number;
    name: string;
    probation: number;
    probationPeriod: number;
    probationStart: string;
    status: number;
    type: string;
    userId: number;
}
export interface ICustomerListForm {
    agentId: string;
    category: string;
    email: string;
    id: string;
    keyWord: string;
    name: string;
    probation: string;
    searchPage: ISearchPage;
    status: string;
    type: string;
    uid: string;
}
export interface IFeedbackDto {
    description: string;
    id: number;
    service: string;
    status: string;
    supporterId: string;
    title: string;
    userId: string;
}
export interface IFeedbackForm {
    description: string;
    id: number;
    service: string;
    status: number;
    title: string;
}
export interface IFeedbackListForm {
    keyWord: string;
    searchPage: ISearchPage;
}
export interface ILoginDto {
    locale: string;
    token: string;
    userType: string;
}
export interface ILoginForm {
    password: string;
    username: string;
}
export interface IvalidateTwoFactorPinForm {
    pin: string;
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
export interface IPageResult<IAgentListDto> {
    content: IAgentListDto[];
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface IResourceDto {
    categoryId: number;
    description: string;
    id: number;
    name: string;
    serviceMethod: string;
    serviceUrl: string;
    value: number;
}
export interface IResourceForm {
    categoryId: number;
    description: string;
    id: number;
    name: string;
    serviceMethod: string;
    serviceUrl: string;
}
export interface IResourceListDto {
    category: string;
    description: string;
    id: number;
    name: string;
    serviceMethod: string;
    serviceUrl: string;
}
export interface IResourceListForm {
    keyWord: string;
    name: string;
    searchPage: ISearchPage;
    serviceMethod: string;
    serviceUrl: string;
}
export interface IRoleDto {
    displayName: string;
    id: number;
    name: string;
    remark: string;
    status: number;
    type: string;
}
export interface IRoleForm {
    displayName: string;
    id: number;
    name: string;
    remark: string;
    status: number;
    type: string;
}
export interface IRoleListForm {
    keyWord: string;
    searchPage: ISearchPage;
}
export interface ISearchPage {
    desc: number;
    page: number;
    pageSize: number;
    sort: string;
}
export interface ISubUserDto {
    email: string;
    entityId: number;
    id: number;
    name: string;
    parentEmail: string;
    parentId: number;
    parentName: string;
    status: number;
    subType: string;
    type: string;
}
export interface ISubUserListForm {
    email: string;
    keyWord: string;
    name: string;
    parentId: number;
    parentName: string;
    searchPage: ISearchPage;
    status: string;
    subType: string;
    type: string;
}
export interface ISwitchForm {
    customerId: number;
    switchStatus: number;
}
export interface IUserBasicDto {
    customerIds: number[];
    id: number;
    subType: string;
    type: string;
}
export interface IUserDto {
    email: string;
    entityId: number;
    id: number;
    locale: string;
    loginId: string;
    name: string;
    parentId: number;
    phone: string;
    status: number;
    subType: string;
    timezone: string;
    type: string;
}
export interface IUserForm {
    email: string;
    entityId: number;
    id: number;
    locale: string;
    name: string;
    parentId: number;
    plainPassword: string;
    subType: string;
    timezone: string;
    type: string;
}
export interface IUserListForm {
    email: string;
    keyWord: string;
    name: string;
    searchPage: ISearchPage;
    status: string;
    subType: string;
    type: string;
}
export interface IUserNoticeDto {
    noticeFlag: number;
    noticeList: INoticeDto[];
}
export interface IUserPwdForm {
    newPwd: string;
    oldPwd: string;
}
