import React, {FC, useCallback} from "react";
import Template from "@/common/template/indexWithPagination";
import {accessLogService} from "@/store/apis/log";
import moment from "moment";
import {useTranslation} from "react-i18next";
import Query from "./query";
import { handleDatetime } from "@/common/utilsx";
import { IPageResult } from "@/store/apis/account/common.interface";
import request from "@/store/request";
import { cashService } from "@/store/apis/cash";
import CreateMember from "./create";
const Cash:FC = () => {
    const [t]=useTranslation()
    const [createFlag,setCreateFlag]=useState<boolean>(false)

    // const operateMap:any = {
    //     "/user/create":t('CREATE_ACCOUNT')
    // }

    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDateTime = d[0]+" 00:00:00";
            filters.endDateTime = d[1]+" 23:59:59";
        }
        const queryParams = {
            ...filters,
        }
        
        const config = cashService.CashPage({},{...queryParams})
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            return res.result
        }
        return null
    },[])
    
    const columns:any = [
        {
            dataIndex: "id",
            title: t('ID'),
            fixed:"left",
            width:100
        },
        {
            dataIndex: "amount",
            title: t('AMOUNT'),
            fixed:"left",
            width:200
        },
        {
            dataIndex: "remark",
            title: t('REMARK'),
          },
        {
            dataIndex: "createDate",
            title:  t('OPERATION_TIME'),
            fixed:"right",
            width:200,
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
            scroll={{ x: 1500 }}
        />
                <CreateMember onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateMember>

    </section>
}

export default Cash



function useState<T>(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}

