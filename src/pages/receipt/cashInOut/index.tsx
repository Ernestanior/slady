import React, {FC, useCallback, useMemo, useState} from "react";
import Template from "@/common/template";
import moment from "moment";
import {useTranslation} from "react-i18next";
import Query from "./query";
import { handleDatetime } from "@/common/utilsx";
import { IPageResult } from "@/store/apis/account/common.interface";
import request from "@/store/request";
import { cashService } from "@/store/apis/cash";
import CreateMember from "./create";
import { Button, notification } from "antd";
import { INormalEvent } from "@/common/interface";
import { reqAndReload } from "@/common/utils";
import msgModal from "@/store/message/service";
const Cash:FC = () => {
    const [t]=useTranslation()
    const [createFlag,setCreateFlag]=useState<boolean>(false)
    // const operateMap:any = {
    //     "/user/create":t('CREATE_ACCOUNT')
    // }
    const buttons: INormalEvent[] = useMemo(() => {
        return [
            {
                text: t("Cash In/Out"),
                primary: true,
                event() {
                    setCreateFlag(true)
                },
            },
        ];
    }, [t]);
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
            dataIndex: "createDate",
            title:  t('OPERATION_TIME'),
            fixed:"right",
            width:200,
            render:(value:string)=>moment(value).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            dataIndex: "remark",
            title: t('REMARK'),
          },
          {
            dataIndex: "id",
            title:  t('DELETE'),
            width:150,
            render:(id:number,data:any)=>{
                return <Button onClick={()=>{
                    const value = {
                        title: t("DELETE"),
                        content: `${t("CONFIRM")}${t("DELETE")}: ${data.remark} ？`,
                        onOk: () => {
                            const config = cashService.CashDelete({id},{})
                            reqAndReload(config, () => notification.success({message: "Delete Success"}));
                        }
                    }
                    msgModal.createEvent("modal", value)
                }}>{t("DELETE")}</Button>
            }
        },

    ]

    return <section>
         <Template
            filter={<Query/>}
            columns={columns}
            queryDataFunction={query}
            event={buttons}
            rowKey="id"
        />
        <CreateMember onOk={()=>setCreateFlag(false)} visible={createFlag}></CreateMember>

    </section>
}

export default Cash




