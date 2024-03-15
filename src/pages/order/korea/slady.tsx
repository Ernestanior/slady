import React, {FC, useCallback, useMemo, useState} from "react";
import Template from "@/common/template";
import {Button, Popconfirm} from "antd";
import {IOperationConfig} from "@/common/template/interface";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import ModifyStatus from "./modify";
import request, {dev_url} from "@/store/request";
import {reqAndReload} from "@/common/utils";
import {WAREHOUSE} from "@/common/const";
import Query from "./query";
import {handleDatetime} from "@/common/utilsx";
import {IPageResult} from "@/store/apis/log/common.interface";
import {useTranslation} from "react-i18next";


const OrderList: FC = () => {
    const [t]=useTranslation()
    const [editFlag,setEditFlag]=useState<boolean>(false)
    const [selectData,setSelectData] = useState<any>()
    const [queryParams,setQueryParams]=useState<any>({})

    const options: IOperationConfig = useMemo(() => {
        return [
            [
                {
                    text: t('MODIFY_STATUS'),
                    event(data) {
                        setSelectData(data)
                        setEditFlag(true)
                    },
                }
            ]
        ]
    }, [t])

    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
        }
        const queryParams = {
            areaType:areaType.KOREA,
            warehouseName:WAREHOUSE.SLADY,
            ...filters,
            status:filters.status?[filters.status]:['0','1','2','3','4'],
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
            render:(item:any)=><img style={{height:150,width:120}} alt="" src={dev_url+item}/>
        },
        {
            title: t('DESIGN_CODE'),
            dataIndex: "designCode",
        },
        {
            title: t('CUSTOMER'),
            dataIndex:"warehouseName",
        },
        {
            title: t('COLOR'),
            dataIndex: "color",
            render:(res:string)=>t(res)
        },
        {
            title: t('SIZE'),
            dataIndex: "size",
        },
        {
            title: t('AMOUNT'),
            dataIndex: "amount",
        },
        {
            title:t('REMARK') ,
            dataIndex: "remark",
            render:()=>'加急'
        },
        {
            title:t('STATUS'),
            dataIndex:"status",
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
            title:t('PENDING_DATE'),
            dataIndex:"pendingDate",
            width:110,
            render:(value:any,item:any)=>{
                return value && <>
                    <div>{value}</div>
                    {
                        item.status==="4" &&
                        <Popconfirm title={t('CONFIRM_CANCEL')} onConfirm={()=>cancelOrder(item)} okText={t('CONFIRM')} cancelText={t('CANCEL')}>
                            <span style={{color:"red",cursor:"pointer"}}>{t('CANCEL_ORDER')}</span>
                        </Popconfirm>
                    }
                </>
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
            <ModifyStatus onOk={()=>setEditFlag(false)} visible={editFlag} data={selectData}></ModifyStatus>
            <div style={{padding:20}}>
                <Button style={{marginRight:20}} onClick={onPrint}>{t("PRINT")}</Button>
            </div>
        </section>
    );
};

const cancelOrder= async (item:any)=>{
    const config = orderService.OrderDelete({},[item.id])
    reqAndReload(config);
}
export default OrderList;

