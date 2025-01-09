import React, {FC, useCallback} from "react";
import Template from "@/common/template/indexWithPagination";
import {accessLogService} from "@/store/apis/log";
import request, {dev_url} from "@/store/request";
import {IPageResult} from "@/store/apis/log/common.interface";
import moment from "moment";
import {useTranslation} from "react-i18next";
import Query from "./query";
import { handleDatetime } from "@/common/utilsx";

const Index:FC = () => {
    const [t]=useTranslation()
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
        const config = accessLogService.FindAccessLog({},{
            ...queryParams,uri:"/item/modify-stock"
        })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            const content=res?.result?.content.map((item)=> {
                return item.body?({...JSON.parse(item.body),...item}):item
            })            
            return ({...{...res.result,content}}) as any
        }
        return null
    },[])
    const columns = [
        {
            dataIndex: "previewPhoto",
            title: t("ITEM"),
            render:(item:any)=><img style={{height:150,width:120}} alt="" src={dev_url+item}/>
        },
        {
            dataIndex: "design",
            title: t("DESIGN_CODE"),
        },
        {
            dataIndex: "color",
            title: t("COLOR"),
        },
        {
            dataIndex: "size",
            title: t("SIZE"),
        },
        {
            dataIndex: "warehouseName",
            title: t("WAREHOUSE"),
        },
        {
            dataIndex: "stock",
            title: t("ORIGIN_STOCK"),
        },
        {
            dataIndex: "newStock",
            title: t("NEW_STOCK"),
        },
        {
            dataIndex: "userName",
            title: t("OPERATOR"),
        },
        {
            dataIndex: "createDate",
            title: t("OPERATION_TIME"),
            render:(value:any)=>{
                console.log(value,moment(value).format("YYYY-MM-DD HH:mm:ss"),'oooo');
                
                return moment(value).format("YYYY-MM-DD HH:mm:ss")
            }
        },
    ]

    return <section>
        <Template
            filter={<Query/>}
            columns={columns}
            queryDataFunction={query}
            rowKey="id"
        />
    </section>
}

export default Index



