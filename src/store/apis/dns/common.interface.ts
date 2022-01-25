export interface IBaseRespDto {
    code: number;
    msg: string;
}
export interface ICaaForm {
    flags: number;
    tag: string;
}
export interface ICommonRespDto {
    code: number;
    data: IDomainDto[];
    msg: string;
}
export interface IDnsPlanForm {
    customerId: number;
    dedicatedPlanFlag: number;
    dedicatedPlanId: number;
    limitDedicatedPlans: number;
}
export interface IDomain {
    groupId: number;
    name: string;
    planId: number;
    remark: string;
}
export interface IDomainCloneForm {
    domainId: number;
    domainList: string[];
}
export interface IDomainDto {
    customerId: number;
    customerName: string;
    groupId: number;
    id: number;
    name: string;
    remark: string;
    status: number;
}
export interface IDomainForm {
    customerId: number;
    domainList: IDomain[];
}
export interface IDomainGroupDto {
    id: number;
    name: string;
    remark: string;
}
export interface IDomainGroupForm {
    domainIds: number[];
    id: number;
    name: string;
    remark: string;
}
export interface IDomainGroupListForm {
}
export interface IDomainListDto {
    customerId: number;
    customerName: string;
    groupName: string;
    id: number;
    name: string;
    remark: string;
    status: number;
}
export interface IDomainListForm {
    customerId?: number;
    customerName?: string;
    groupId?: number;
    keyWord: string;
    name?: string;
    searchPage: ISearchPage;
    status?: number;
}
export interface IDomainPlanForm {
    domainId: number;
    planId: number;
}
export interface IDomainPlanListDto {
    availability: number;
    batchImportLimit: number;
    cnameResolution: number;
    customisedLine: number;
    defence: string;
    domainChange: number;
    domainCloneLimit: number;
    domainId: number;
    domainName: string;
    endDate: string;
    intelligentResolution: number;
    lineGroup: number;
    linePrecision: string;
    loadBalancing: number;
    minMonitorFrequency: number;
    minTtl: number;
    monitoring: number;
    period: number;
    planId: number;
    qps: number;
    rank: number;
    recordLimit: number;
    sla: string;
    startDate: string;
    type: string;
    urlForwarding: number;
    visibility: number;
    wildcard: number;
}
export interface IDomainPlanListForm {
    customerId: number;
    domainName: string;
    keyWord: string;
    planType: string;
    searchPage: ISearchPage;
}
export interface ILineGroupDto {
    id: number;
    lineIds: number[];
    name: string;
}
export interface ILineGroupForm {
    domainId: number;
    id: number;
    lineIds: number[];
    name: string;
}
export interface ILineGroupListForm {
    domainId: number;
    keyWord: string;
    name: string;
    searchPage: ISearchPage;
}
export interface ILineRangeDto {
    id: number;
    name: string;
    value: string;
}
export interface ILineRangeForm {
    domainId?: number;
    id: number;
    ipRange: string[];
    name: string;
}
export interface ILineRangeListForm {
    domainId: number;
    keyWord: string;
    name: string;
    searchPage: ISearchPage;
}
export interface ILineViewDto {
    lineId: number;
    lineType: string;
    name: string;
}
export interface INameServerDto {
    defaultFlag: number;
    domains: string;
    id: number;
    ips: string;
    name: string;
}
export interface INameServerForm {
    domains: string[];
    id: number;
    ips: string[];
    name: string;
}
export interface INameServerListDto {
    domains: string[];
    id: number;
    ips: string[];
    name: string;
}
export interface INameServerListForm {
    domain: string;
    ip: string;
    keyWord: string;
    name: string;
    searchPage: ISearchPage;
}
export interface INameServerSummaryDto {
    customizedNameServers: string[];
    defaultNameServers: string[];
    isUsedCustomisedNameServer: number;
    nodeIps: string[];
}
export interface IPageResult<IDomainGroupDto> {
    content: IDomainGroupDto[];
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface IPlanListDto {
    availability: number;
    batchImportLimit: number;
    cnameResolution: number;
    customisedLine: number;
    defence: string;
    domainChange: number;
    domainCloneLimit: number;
    id: number;
    intelligentResolution: number;
    lineGroup: number;
    linePrecision: string;
    loadBalancing: number;
    minMonitorFrequency: number;
    minTtl: number;
    monitoring: number;
    qps: number;
    rank: number;
    recordLimit: number;
    sla: string;
    type: string;
    urlForwarding: number;
    visibility: number;
    wildcard: number;
}
export interface IPlanListForm {
    keyWord: string;
    searchPage: ISearchPage;
}
export interface IPlanQuotaDto {
    id: number;
    quantity: number;
}
export interface IPlanUsageDto {
    totalAmount: number;
    type: string;
    usedAmount: number;
}
export interface IQuotaForm {
    customerId: number | null;
    planList: IPlanQuotaDto[];
}
export interface IRecordBatchForm {
    customerId: number;
    recordFormList: IRecordForm[];
    removeFlag: number;
}
export interface IRecordBatchOperateForm {
    actionType: string;
    caaForm: ICaaForm;
    customerId: number;
    domainList: string[];
    lineId: number;
    lineType: string;
    name: string;
    newType: string;
    newValue: string;
    srvForm: ISrvForm;
    type: string;
    value: string;
}
export interface IRecordForm {
    caaForm: ICaaForm;
    domain: string;
    id: number;
    lineId: number;
    lineType: string;
    name: string;
    priority: number;
    remark: string;
    srvForm: ISrvForm;
    ttl: number;
    type: string;
    value: string;
    weight: number;
}
export interface IRecordListDto {
    customerId: number;
    customerName: string;
    id: number;
    lineId: number;
    lineType: string;
    name: string;
    remark: string;
    status: number;
    ttl: number;
    type: string;
    value: string;
    weight: number;
}
export interface IRecordListForm {
    customerId: number;
    domain?: string;
    keyWord?: string;
    lineId?: number;
    lineType?: string;
    name?: string;
    searchPage?: ISearchPage;
    status?: number;
    type?: string;
    value?: string;
}
export interface ISearchPage {
    desc: number;
    page: number;
    pageSize: number;
    sort: string;
}
export interface ISrvForm {
    port: number;
    priority: number;
    weight: number;
}

export interface IModifyDomainForm {
    id: number;
    remark: string;
}

// type IString = string;

// interface IMap<T, S> {
//     code: T,
//     name: S
// }