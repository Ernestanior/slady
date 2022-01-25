import NameServerAPI from "@/store/apis/dns/nameServer";
import PlanAPI from "@/store/apis/dns/plan";
import DomainPlanAPI from "@/store/apis/dns/domainPlan";

export const nameServerService = new NameServerAPI();

export const dnsPlanService = new PlanAPI();

export const dnsDomainPlainService = new DomainPlanAPI();