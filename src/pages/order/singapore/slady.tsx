import React, {FC, useCallback, useMemo, useState} from "react";
import Template, { reloadMainList } from "@/common/template/indexWithPagination";
import {IOperationConfig} from "@/common/template/interface";
import {orderService} from "@/store/apis/order";
import {areaType} from "../index";
import {reqAndCallback} from "@/common/utils";
import msgModal from "@/store/message/service";
import moment from "moment";
import request, {dev_url} from "@/store/request";
import {WAREHOUSE} from "@/common/const";
import {IPageResult} from "@/store/apis/log/common.interface";
import Query from "@/pages/order/singapore/query";
import {handleDatetime} from "@/common/utilsx";
import {useTranslation} from "react-i18next";
import {Button, notification} from "antd";
import useAccountInfo from "@/store/account";
import ModifyStatus from "./modify";
import Sent from "./sent";

const OrderList: FC = () => {
    const [t]=useTranslation()
    const [queryParams,setQueryParams]=useState<any>({})
    const info:any = useAccountInfo();
    const [selectData,setSelectData] = useState<any>()
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [sentFlag,setSentFlag]=useState<boolean>(false)
    const [exportStatus,setExportStatus]=useState<boolean>(false)
    
    const options: IOperationConfig = useMemo(() => [
            {
                text: t('MODIFY_ORDER'),
                // hide: ()=>info.type!=='ADMIN',
                event(data) {
                    setSelectData(data)
                    setEditFlag(true)
                },
            },
            {
                text: t("DELETE_ORDER"),
                event(data) {
                    const value = {
                        title: t("DELETE_ORDER"),
                        content: `${t("CONFIRM")}${t("CANCEL_ORDER")}: ${data.design} ？`,
                        onOk: () => {
                            const config = orderService.OrderDelete({}, [data.id]);
                            reqAndCallback(config,()=>{
                                reloadMainList()
                            });
                        }
                    }
                    msgModal.createEvent("modal", value)
                }
            },
            {
                text: t("SENT"),
                event(data) {
                    setSelectData(data)
                    setSentFlag(true)
                }
            },
            {
                text: t("OK"),
                event(data) {
                    const value = {
                        title: t("OK"),
                        content: `${t("CONFIRM")} ${t("OK")}: ${data.design} ？`,
                        onOk: async() => {
                            const config = orderService.OrderModify({}, {...data,status:"2",pendingDate:''});
                            reqAndCallback(config,()=>{
                                reloadMainList()
                            });
                        }
                    }
                    msgModal.createEvent("modal", value)
                }
            },
            {
                text: t("OUT_OF_STOCK"),
                event(data) {
                    const value = {
                        title: t("OUT_OF_STOCK"),
                        content: `${t("CONFIRM")} ${t("OUT_OF_STOCK")}: ${data.design} ？`,
                        onOk: () => {
                            const config = orderService.OrderModify({}, {...data,status:"3",pendingDate:''});
                            reqAndCallback(config,()=>{
                                reloadMainList()
                            });
                        }
                    }
                    msgModal.createEvent("modal", value)
                }
            },
    
            {
                text: t("DAMAGED"),
                event(data) {
                    const value = {
                        title: t("DAMAGED"),
                        content: `${t("CONFIRM")} ${t("DAMAGED")}: ${data.design} ？`,
                        onOk: async() => {
                            const config = orderService.OrderModify({}, {...data,status:"4",pendingDate:''});
                            reqAndCallback(config,()=>{
                                reloadMainList()
                            });
                        }
                    }
                    msgModal.createEvent("modal", value)
                }
            },
            {
                text: t("RESET_STATUS"),
                event(data) {
                    const value = {
                        title: t("RESET_STATUS"),
                        content: `${t("CONFIRM")} ${t("RESET_STATUS")}: ${data.design} ？`,
                        onOk: () => {
                            const config = orderService.OrderModify({}, {...data,status:"0",pendingDate:'',});
                            reqAndCallback(config,()=>{
                                reloadMainList()
                            });
                        }
                    }
                    msgModal.createEvent("modal", value)
                }
            },

    ], [t])

    const query = useCallback(async(data:any)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
        }
        const queryParams = {
            areaType:areaType.SINGAPORE,
            warehouseName:WAREHOUSE.SLADY,
            ...filters,
            status:filters.status?[filters.status]:['0','1','2','3','4'],
        }
        setQueryParams(queryParams)
        const config = orderService.OrderPage({},queryParams)
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            return res.result
        }
        return null
    },[])

    const onPrint = async() =>{
        setExportStatus(true)
        notification.info({
            message: '导出中，请稍候',
        })
        const config = orderService.OrderExport(queryParams)
        const res = await request(config)
        res.isSuccess && window.open(dev_url+res.result)
        setExportStatus(false)
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
            render:(res:string)=>t(res)
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
                        return t('PENDING')
                    case '1':
                        return t('SENT')
                    case '2':
                        return t('OK')
                    case '3':
                        return t('OUT_OF_STOCK')
                    case '4':
                        return t('DAMAGED')
                }
            }
        },
        {
            title: `${t('SHIPPING_DATE')}`,
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
            <ModifyStatus onOk={()=>{setEditFlag(false);reloadMainList();}} onCancel={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyStatus>
            <Sent onOk={()=> {setSentFlag(false);reloadMainList();}} visible={sentFlag} data={selectData}></Sent>
            <div style={{padding:20}}>
                <Button disabled={exportStatus} loading={exportStatus} style={{marginRight:20}} onClick={onPrint}>{t("PRINT")}</Button>
            </div>
        </section>
    );
};


export default OrderList;

