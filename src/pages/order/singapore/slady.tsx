import React, {FC, useCallback, useMemo } from "react";
import Template from "@/common/template";
import {IOperationConfig} from "@/common/template/interface";
import {orderService} from "@/store/apis/order";
import {areaType, orderType} from "@/pages/order";
import {reqAndReload} from "@/common/utils";
import msgModal from "@/store/message/service";
import moment from "moment";
import request, {dev_url} from "@/store/request";
import {WAREHOUSE} from "@/common/const";
import {IPageResult} from "@/store/apis/log/common.interface";
import Query from "@/pages/order/singapore/query";
import {handleDatetime} from "@/common/utilsx";
import {useTranslation} from "react-i18next";

const OrderList: FC = () => {
    const [t]=useTranslation()

    const options: IOperationConfig = useMemo(() => [
            {
                text: t("CANCEL_ORDER"),
                hide: (data) => data.status,
                event(data) {
                    const value = {
                        title: t("CANCEL_ORDER"),
                        content: `${t("CONFIRM")}${t("CANCEL_ORDER")}: ${data.design} ？`,
                        onOk: () => {
                            const config = orderService.OrderDelete({}, [data.id]);
                            reqAndReload(config);
                        }
                    }
                    msgModal.createEvent("modal", value)
                }
            },
            {
                text: t("REQUEST_CANCEL_ORDER"),
                hide: (data) => data.status !== orderType.PENDING,
                event(data) {
                    const value = {
                        title: t("REQUEST_CANCEL_ORDER"),
                        content: `${t("CONFIRM")}${t("REQUEST_CANCEL_ORDER")}: ${data.design} ？`,
                        onOk: () => {
                            console.log(data)
                            const config = orderService.OrderModify({}, {...data,status:"4"});
                            reqAndReload(config);
                        }
                    }
                    msgModal.createEvent("modal", value)
                }
            },
        {
            text: t("RECALL_REQUEST"),
            hide: (data) => data.status !== orderType.CANCELREQUEST,
            event(data) {
                const value = {
                    title: t("RECALL_REQUEST"),
                    content: `${t("CONFIRM_RECALL_CANCEL_ORDER_REQUEST")}: ${data.design} ？`,
                    onOk: () => {
                        const config = orderService.OrderModify({}, {...data,status:"1"});
                        reqAndReload(config);
                    }
                }
                msgModal.createEvent("modal", value)
            }
        },
        {
            text: t("HAVE_RECEIVED"),
            hide: (data) => data.status !== orderType.SEND,
            event(data) {
                const value = {
                    title: t("RECEIVED_ITEM"),
                    content: `${t("CONFIRM_RECEIVED_ITEM")}: ${data.design} ？`,
                    onOk: async() => {
                        console.log(data)
                        const config = orderService.OrderModify({}, {...data,status:"5"});
                        reqAndReload(config);
                    }
                }
                msgModal.createEvent("modal", value)
            }
        },
    ], [t])

    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
        }
        const config = orderService.OrderList({},{
            areaType:areaType.SINGAPORE,
            warehouseName:WAREHOUSE.SLADY,
            status:['0','1','2','3','4'],
            ...filters
        })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            return res.result
        }
        return null
    },[])
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
                optList={options}
            />
        </section>
    );
};


export default OrderList;

