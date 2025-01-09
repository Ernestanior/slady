import React, {FC, useCallback} from "react";
import Template from "@/common/template/indexWithPagination";
import {accessLogService} from "@/store/apis/log";
import moment from "moment";
import {useTranslation} from "react-i18next";
import Query from "./query";
import { handleDatetime } from "@/common/utilsx";
import { IPageResult } from "@/store/apis/account/common.interface";
import request from "@/store/request";
const OperationList:FC = () => {
    const [t]=useTranslation()
    // const operateMap:any = {
    //     "/user/create":t('CREATE_ACCOUNT')
    // }

    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
        }
        const queryParams = {
            ...filters,
        }
        
        const config = accessLogService.FindAccessLog({},{...queryParams})
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            return res.result
        }
        return null
    },[])
    
    const columns = [
        {
            dataIndex: "userName",
            title: t('OPERATOR'),
        },
        {
            dataIndex: "uri",
            title: t('INTERFACE'),
            render:(res:any)=>res
        },
        {
            dataIndex: "body",
            title:  t('DETAIL'),
            render:(value:any)=>value
        },
        {
            dataIndex: "createDate",
            title:  t('OPERATION_TIME'),
            render:(value:string)=>moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
    ]

    return <section>
         <Template
            filter={<Query/>}
            columns={columns}
            queryDataFunction={query}
            // queryDataFunction={queryData}
            rowKey="id"
        />
    </section>
}

export default OperationList



