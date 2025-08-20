import React, {FC, useCallback} from "react";
import Template from "@/common/template/indexWithPagination";
import moment from "moment";
import {useTranslation} from "react-i18next";
import Query from "./query";
import { IPageResult } from "@/store/apis/account/common.interface";
import request from "@/store/request";
import { printService } from "@/store/apis/print";
import { handleDatetime } from "@/common/utilsx";
import { Button, Tag } from "antd";
import useAccountInfo from "@/store/account";
import accountService from "@/store/account/service";

const ReceiptCheck:FC = () => {
    const [t]=useTranslation()
    const userInfo:any = useAccountInfo();
    const shop = userInfo.name.includes(1)?'Slady Fashion Pte. Ltd.':'SL Studio Pte. Ltd.';
    
    const query = useCallback(async(data)=>{
        const {createDate,...filters}=data
        if (createDate) {
            const d: any[] = handleDatetime(data.createDate);
            filters.startDateTime = d[0]+" 00:00:00";
            filters.endDateTime = d[1]+" 23:59:59";
        }
        const queryParams = {
            ...filters,
            shop
        }
        const config = printService.ReceiptPage({},{...queryParams})
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            return res.result
        }
        return null
    },[])
    
    const columns = [
        {
            dataIndex: "refNo",
            title: t('REFNO'),
        },
        {
            dataIndex: "receiptDate",
            title:  t('DATE'),
        },
        {
            dataIndex: "totalPrice",
            title:  t('POS'),
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
            <Button type="primary" onClick={()=> accountService.autoLogout() } style={{marginRight:20}}>Logout</Button>

    </section>
}

export default ReceiptCheck;



