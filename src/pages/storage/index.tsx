import React, {FC, useCallback} from "react";
import Template from "@/common/template/indexWithPagination";
import {accessLogService} from "@/store/apis/log";
import request, {dev_url} from "@/store/request";
import {IPageResult} from "@/store/apis/log/common.interface";
import moment from "moment";
import {useTranslation} from "react-i18next";
const Import:FC = () => {
    const [t]=useTranslation()
    const query = useCallback(async(data)=>{
        console.log('aad',data)
        const config = accessLogService.FindAccessLog({},{
            ...data,uri:"/item/modify-stock"
        })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            const content=res?.result?.content.map((item)=> {
                return item.body?({...JSON.parse(item.body),...item}):item
            })
            return ({...res.result,content}) as any
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
            dataIndex: "modifyDate",
            title: t("OPERATION_TIME"),
            render:(value:any)=>moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
    ]

    return <section>
        <Template
            columns={columns}
            queryDataFunction={query}
            rowKey="id"
        />
    </section>
}

export default Import



