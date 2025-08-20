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
import { useHistory } from 'react-router-dom';

const Receipt:FC = () => {
    const [t]=useTranslation()
    const history = useHistory();
    const query = useCallback(async(data)=>{
        const {createDate,...filters}=data
        if (createDate) {
            const d: any[] = handleDatetime(data.createDate);
            filters.startDateTime = d[0]+" 00:00:00";
            filters.endDateTime = d[1]+" 23:59:59";
        }
        const queryParams = {
            ...filters,
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
            dataIndex: "id",
            title: t('ID'),
            width:100,
        },
        {
            dataIndex: "refNo",
            title: t('REFNO'),
        },
        {
            dataIndex: "itemList",
            title:  t('ITEM'),
            width:300,
            render: (value: any) => {
                // value 可能是 JSON 字符串，也可能已经是数组
                let arr: Array<{
                  qty: number;
                  code: string;
                  price: number;
                  discount: number;
                  finalPrice: number;
                  discountPercent: number;
                }> = [];
            
                try {
                  arr = typeof value === 'string' ? JSON.parse(value) : value;
                } catch {
                  return <span>-</span>;
                }
                if (!Array.isArray(arr)) return <span>-</span>;
            
                return (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {arr.map((it, idx) => (
                      <Tag key={`${it.code}-${idx}`}>
                        <span style={{color:"#396293",fontWeight:"bold"}}>{it.code}</span> × {it.qty} | ${Number(it.finalPrice ?? it.price).toFixed(2)}
                      </Tag>
                    ))}
                  </div>
                );
              }
        },
        {
            dataIndex: "receiptDate",
            title:  t('DATE'),
        },
        {
            dataIndex: "cashier",
            title:  t('CASHIER'),
        },
        {
            dataIndex: "id",
            title:  t('REPRINT'),
            render:(id:number)=>{
                return <Button onClick={async()=>{
                    await request(printService.RePrintReceipt({receiptId:id},{}))
                }}>reprint</Button>
            }
        },

    ]

    return <section>
        <div style={{marginBottom:20}}>
            <Button type="primary" onClick={()=> history.push('/invoice')} style={{marginRight:20}}>Print Receipt</Button>
            <Button type="primary" onClick={()=> history.push('/barcode')} style={{marginRight:20}}>Print Label</Button>
            <Button type="primary" onClick={()=> history.push('/statement')} style={{marginRight:20}}>Print Daily Statement</Button>
            <Button type="primary" onClick={()=> history.push('/cash')} style={{marginRight:20}}>Cash In/Out</Button>
            <Button type="primary" onClick={()=> history.push('/balance')}>Opening/Closing Balance</Button>
        </div>
         <Template
            filter={<Query/>}
            columns={columns}
            queryDataFunction={query}
            // queryDataFunction={queryData}
            rowKey="id"
        />
    </section>
}

export default Receipt



