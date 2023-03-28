import React, {FC, useEffect, useState} from "react";
import {Checkbox, InputNumber, Modal} from "antd";
import {useForm} from "antd/es/form/Form";
import {customerService} from "@/store/apis/account";
import {from} from "rxjs";
import request from "@/store/request";
import {reqAndReload} from "@/common/utils";
import {ISubscriptionItem} from "@/store/apis/account/customer";

interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const SubsCustomer:FC<IProps> = ({onOk,visible,data}) => {
    const [form] = useForm()
    const [subs,setSubs]=useState<ISubscriptionItem[]>([])
    const [loading,setLoading]=useState<boolean>(false)
    useEffect(()=>{
        if (data){
            const config = customerService.SubsList({customerId:data.id}, {})
            const sub = from(request(config)).subscribe((res:any) => {
                if(res.isSuccess){
                    setSubs(res.result)
                }
            })
            return () => sub.unsubscribe()
        }
    },[data])
    const onCancel=()=>{
        form.resetFields()
        onOk()
    }
    const checkboxChange=(e:any)=>{
        const newsubs = subs.map((item:any)=>{
            return item.classificationId===e.target.value?{...item,status:e.target.checked?1:0}:item
        })
        setSubs(newsubs)
    }

    const dateChange=(e:any,classId:number)=>{
        const newsubs = subs.map((item:any)=>{
            return item.classificationId===classId?{...item,period:e}:item
        })
        setSubs(newsubs)
    }
    const onFinish =async ()=>{
        setLoading(true)
        reqAndReload(customerService.SubsModify({}, {customerId:data.id,subscriptionItemList:subs} ),
            () => {
            onOk();
            setLoading(false)
        });
    }

    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Subscriptions</div>}
        visible={visible}
        onCancel={ onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        width={600}
    >
        <section style={{display:"flex",alignItems:"center",color:"#4776aa",fontWeight:550}}>
            <span style={{flex:1}}>Subscription</span>
            <span style={{flex:1}}>Expire</span>
            <span style={{flex:1}}>Period</span>
        </section>
        {!!subs.length && subs.map((item:any)=><section key={item.id} style={{padding:"10px 0",display:"flex",alignItems:"center"}}>
                <Checkbox style={{flex:1}} value={item.classificationId} checked={!!item.status} onChange={checkboxChange}>
                    {item.classificationName}
                </Checkbox>
            {!!item.status && <div style={{flex:1}} >
                <span>{item.expiryDate}</span>
                    {/*<DatePicker disabledDate={disabledDate} value={moment(item.expiryDate)} onChange={(e)=>timerChange(e,item.classificationId)}/>*/}
                </div>}
            {!!item.status && <div style={{flex:1}} >
                <InputNumber value={item.period} onChange={(e)=>dateChange(e,item.classificationId)}/>
            </div>}
        </section>

        )}
    </Modal>
}

export default SubsCustomer;
