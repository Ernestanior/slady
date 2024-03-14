import React, {FC, useCallback, useState} from "react";
import Template from "@/common/template";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import moment from "moment";
import request, {dev_url} from "@/store/request";
import {WAREHOUSE} from "@/common/const";
import {IPageResult} from "@/store/apis/log/common.interface";
import Query from "@/pages/order/singapore/query";
import {handleDatetime} from "@/common/utilsx";
import {useTranslation} from "react-i18next";
import {Button} from "antd";

const OrderList: FC = () => {
    const [t]=useTranslation()
    const [queryParams,setQueryParams]=useState<any>({})

    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
        }
        const queryParams = {
            areaType:areaType.SINGAPORE,
            warehouseName:WAREHOUSE.SLADY,
            status:['5'],
            ...filters
        }
        setQueryParams(queryParams)
        const config = orderService.OrderList({},queryParams)
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            return res.result
        }
        return null
    },[])

    const onPrint = async() =>{
        const config = orderService.OrderExport(queryParams)
        const res = await request(config)
        res.isSuccess && window.open(dev_url+res.result)
    }

    const columns: any = [
        {
            title: t('PHOTO'),
            dataIndex: "previewPhoto",
            width: 120,
            render:(item:any)=><img style={{height:150,width:120}} alt="" src={dev_url+item}/>
        },
        {
            title:  t('CODE'),
            dataIndex: "design",
        },
        {
            title:  t('PRICE'),
            dataIndex: "salePrice",
        },

        {
            title:  t('COLOR'),
            dataIndex: "color",
        },
        {
            title:  t('SIZE'),
            dataIndex: "size",
        },
        {
            title: t('AMOUNT') ,
            dataIndex: "amount",
        },
        {
            title:  t('TIME'),
            dataIndex: "date",
            width:110,
            render:(data:string)=>moment(data).format('YYYY-MM-DD')
        },
        {
            title:  t('REMARK'),
            dataIndex: "remark",
        },
        {
            title: t('STATUS'),
            dataIndex:"status",
            width:130,
            render:(value:string)=>{
                switch (value){
                    case '0':
                        return ''
                    case '1':
                        return '待定'
                    case '2':
                        return 'OK'
                    case '3':
                        return '已发货'
                    case '4':
                        return '待定(请求取消)'
                    case '5':
                        return '已收到'
                }
            }
        },
        {
            title: t('PENDING_DATE'),
            dataIndex:"pendingDate",
            width:110,
            render:(value:any)=>{
                // return value && <div>{moment(value).format('YYYY-MM-DD')}</div>
                return value && <div>{value}</div>
            }
        },
    ];


    return (
        <section>
            <Template
                filter={<Query/>}
                columns={columns}
                queryDataFunction={query}
                rowKey="id"
            />
            <div style={{padding:20}}>
                <Button style={{marginRight:20}} onClick={onPrint}>{t("PRINT")}</Button>
            </div>
        </section>
    );
};


export default OrderList;

