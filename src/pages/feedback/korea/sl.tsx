import React, {FC, useCallback, useEffect, useState} from "react";
import Template from "@/common/template";
import {Button, notification} from "antd";
import {orderService} from "@/store/apis/order";
import {areaType} from "@/pages/order";
import moment from "moment/moment";
import request, {dev_url} from "@/store/request";
import {IPageResult} from "@/store/apis/log/common.interface";
import {reqAndReload} from "@/common/utils";
import {WAREHOUSE} from "@/common/const";
import Query from "./query";
import {handleDatetime} from "@/common/utilsx";
import msgModal from "@/store/message/service";
import {from} from "rxjs";
import {useTranslation} from "react-i18next";
const OrderList: FC = () => {
    const [t]=useTranslation()
    const [data,setData]=useState<any>()
    const [totalPrice,setTotalPrice] = useState<any>()
    useEffect(()=>{
        const config = orderService.OrderCount({},{
            areaType:areaType.KOREA,
            warehouseName:WAREHOUSE.SL,
            // status:['2','3','5'],
            paymentStatus:0,
            searchPage:{desc:1,page:1,pageSize:999,sort:"create_date"}
        })
        from(request(config)).subscribe((res:any)=>{
            if (res.isSuccess){
                const data = res.result.filter((item:any)=>item.warehouseName===WAREHOUSE.SLADY)
                data.length && setTotalPrice(data[0].count)
            }
        })
    },[])

    const query = useCallback(async(data)=>{
        const {operateDate,...filters}=data
        if (operateDate) {
            const d: any[] = handleDatetime(data.operateDate);
            filters.startDate = d[0]+" 00:00:00";
            filters.endDate = d[1]+" 23:59:59";
        }
        const config = orderService.OrderList({},{
            areaType:areaType.KOREA,
            warehouseName:WAREHOUSE.SL,
            // status:['2','3','5'],
            paymentStatus:0,
            ...filters
        })
        const res = await request<IPageResult<any>>(config);
        if (res.isSuccess){
            setData(res.result)
            return res.result
        }
        return null
    },[])

    const changeStatus = async() =>{
        const value = {
            title: t("CLEAR"),
            content: t("SURE_TO_CLEAR_ALL_ORDER"),
            onOk: () => {
                if(!data.length){
                    notification.error({message:t("NO_UNPAID_ORDER_SO_FAR")})
                    return
                }
                const ids = data.map((item:any)=>item.id)
                const config = orderService.OrderModifyStatus({},{orderIds:ids,paymentStatus:1})
                reqAndReload(config)
            }
        }
        msgModal.createEvent("modal", value)
    }
    const onPrint = async() =>{
        if(!data.length){
            notification.error({message:t("NO_UNPAID_ORDER_SO_FAR")})
            return
        }
        const config1 = orderService.OrderExport(
            {areaType:1,
                warehouseName:"SL二店",
                searchPage:{desc:1,page:1,pageSize:999},
                paymentStatus: 0
            })
        const res1 = await request(config1)
        res1.isSuccess && window.open(dev_url+res1.result)

        const config2 = orderService.OrderExport({areaType:2,
            warehouseName:"SL二店",
            searchPage:{desc:1,page:1,pageSize:999},
            paymentStatus: 0
        })
        const res2 = await request(config2)
        res2.isSuccess && window.open(dev_url+res2.result)
    }
    const columns: any = [
        {
            title: t("ORDER_DATE"),
            dataIndex: "date",
            render:(value:any)=>moment(value).format("YYYY-MM-DD")
        },
        {
            title: t("PHOTO"),
            dataIndex: "previewPhoto",
            render:(value:any)=>{
                return <img style={{height:150,width:120}} alt="" src={dev_url+value}/>
            }
        },
        {
            title: t("DESIGN_CODE"),
            dataIndex: "designCode",
        },
        {
            title: t("CUSTOMER"),
            dataIndex:"warehouseName",
        },
        {
            title: t("COLOR"),
            dataIndex: "color",
        },
        {
            title: t("SIZE"),
            dataIndex: "size",
        },
        {
            title: t("AMOUNT"),
            dataIndex: "amount",
        },
        {
            title: t("QUOTED_PRICE"),
            dataIndex: "quotedPrice",
            render:(value:any)=>`$${value}`
        },
        {
            title: t("TOTAL_PRICE"),
            dataIndex: "quotedPrice",
            render:(value:any,item:any)=>`$${value*item.amount}`
        },
        {
            title: t("REMARK"),
            dataIndex: "note",
            render:()=>"加急"
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
            <div style={{padding:20,display:"flex",justifyContent:"space-between"}}>
                <span style={{fontWeight:"600"}}>{t("TOTAL_PRICE")}: $ {totalPrice}</span>
                <div>
                    <Button style={{marginRight:20}} onClick={onPrint}>{t("PRINT")}</Button>
                    <Button onClick={changeStatus}>{t("CLEAR")}</Button>
                </div>
            </div>
        </section>
    );
};

export default OrderList;



