import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import Template from "@/common/template";
import {Descriptions} from "antd";
import CDNDomainFilter from "./filters";
import CDNDomainFilterMobile from "./filterMobile";
import FormItem from "@/common/Form/formItem";
import isMobile from "@/app/isMobile";
import msgModal from "@/store/message/service";
import View from "@/common/popup/view";
import EllipsisTooltip from "@/common/ellipsisTooltip";
import {json} from "./json"
import {dateFomatter} from "@/common/utilsx";
import {operateLogService} from "@/store/apis/log";
import {IPageResult} from "@/store/apis/dns/common.interface";
import request from "@/store/request";
import {customerService, userService} from "@/store/apis/account";
import {IOperationConfig} from "@/common/template/interface";
import FunctionListSelector from "@/pages/common/functionListSelector";

const functionMap: any = {};

const CDNDomains:FC = () => {
    // 翻译包
    const [transMapList, setTransMapList] = useState<any>({});

    useEffect(() => {
        let obj: any = {};
        Object.values(json).forEach((t: any) => (obj[t.serviceUrl] = t.name));
        setTransMapList(obj);
    }, []);

    const handleDatetime = (dateObj: any[]) => {
        if (!Array.isArray(dateObj) || !dateObj) {
            return ["", ""];
        }
        return Object.values(dateObj).map((t) => dateFomatter(t));
    };


    const query = useCallback(
        async (data) => {
            const { operateDate, ...submitData } = data;
            if (operateDate) {
                const d: string[] = handleDatetime(data.operateDate);
                submitData.startDate = d[0];
                submitData.endDate = d[1];
            }

            const config = operateLogService.FindAccessLog({}, submitData);
            const res = await request<IPageResult<any>>(config);
            if (Object.keys(functionMap).length < 1) {
                const functionListRes = await request<
                    Array<{ serviceUrl: string; name: string }>
                    >(userService.queryFunctionResourceList());
                if (functionListRes.isSuccess && functionListRes.result) {
                    functionListRes.result.forEach((menu) => {
                        functionMap[menu.serviceUrl] = menu.name;
                    });
                }
            }
            const ids = res?.result?.content.map((x) => (x?.userId || 0))
            const config2 = customerService.FetchCustomerByUserIds({}, ids);
            const res2: any = await request(config2);

            if (res.isSuccess && res.result) {
                return {
                    ...res.result,
                    content: res.result.content.map((t) => {
                        const containsDirectCustomer =  res2[t.userId]?.name;
                        return {
                            ...t,
                            view_name: containsDirectCustomer ? `${t.userName} | ${containsDirectCustomer}`  : `${t.userName} | -`,
                            requestUriName: functionMap[t.requestUri] || "-",
                        };
                    }),
                };
            }
            return null;
        },
        []
    );
    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: "查看",
                    event: (data:any) => {
                        const {requestUriName,view_name,requestUri,logTime,requestArgs,requestBody} = data
                        const formatData: any = [
                            {label:"功能",content:requestUriName},
                            {label:"操作者",content:view_name},
                            {label:"请求地址",content:requestUri},
                            {label:"操作时间",content:dateFomatter(logTime, "YYYY/MM/DD HH:mm:ss")},
                            {label:"URL参数",content:requestArgs},
                            {label:"请求体",content:requestBody},
                        ]
                        if(isMobile){
                            const value = {
                                node: <View dataList={formatData} />,
                            }
                            msgModal.createEvent("popup", value)
                        }
                        else{
                            const value = {
                                title: "查看",
                                width:1000,
                                content: <Descriptions bordered column={2} size={"middle"}>
                                    {formatData.map((item:any)=>
                                        <Descriptions.Item key={item.id} label={item.label} labelStyle={{width:200}} contentStyle={{width:400}}>
                                            {item.content}
                                        </Descriptions.Item>
                                    )}
                                </Descriptions>,
                            }
                            msgModal.createEvent("modal", value)
                        }
                    },
                }]
        ]
    }, [])

    return <Template
        filter={isMobile?<CDNDomainFilterMobile/>:<CDNDomainFilter />}
        queryDataFunction={query}
        optList={options}
        primarySearch={primarySearch}
        columns={isMobile?columnMobile(transMapList):columns(transMapList)}
        rowKey="id"
    />
}

export default CDNDomains;

const columns = (transObj: any) =>
[
    {
        title: "菜单",
        dataIndex: "method",
        render: (t:string) => {
            return t === "web" ? "页面操作" : t
        }
    },
    {
        title: "功能",
        dataIndex: "requestUri",
        render: (t:any) => {
            const _t = transObj[t];
            const _f = _t ? _t : t;
            return (
                <EllipsisTooltip title={_f} >
                    {_f}
                </EllipsisTooltip>
            );
        },
    },
    {
        key: "userName",
        title: "执行人",
        dataIndex: "userName",
    },
    {
        key: "logTime",
        title: "执行时间",
        dataIndex: "logTime",
        render: (item:any) => dateFomatter(item, "YYYY/MM/DD HH:mm:ss")
    },
]
const columnMobile = (transObj: any) =>[
    {
        title: "菜单",
        dataIndex: "method",
        width:60,
        render: (t:string) => {
            return t === "web" ? "页面操作" : t
        }
    },
    {
        title: "功能",
        dataIndex: "requestUri",
        width:120,
        render: (t:any) => {
            const _t = transObj[t];
            const _f = _t ? _t : t;
            return (
                <EllipsisTooltip title={_f} >
                    {_f}
                </EllipsisTooltip>
            );
        },
    },

]

const primarySearch=<>
    <FormItem noStyle name="requestUri">
        <FunctionListSelector bordered style={{ width: "70vw" }}/>
    </FormItem>
</>