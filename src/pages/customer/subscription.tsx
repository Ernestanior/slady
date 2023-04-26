import React, {FC, useEffect, useState} from "react";
import {Checkbox, DatePicker, Modal} from "antd";
import {useForm} from "antd/es/form/Form";
import {customerService} from "@/store/apis/account";
import {from} from "rxjs";
import request from "@/store/request";
import {ISubscriptionItem} from "@/store/apis/account/customer";
import {reloadMainList} from "@/common/template";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
interface IProps{
    visible:boolean;
    onOk:()=>void;
    data:any;
}
const SubsCustomer:FC<IProps> = ({onOk,visible,data}) => {
    const [form] = useForm()
    const [subs,setSubs]=useState<ISubscriptionItem[]>([])
    console.log(subs)
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
        setSubs([])
        form.resetFields()
        onOk()
    }
    const checkboxChange=(e:any)=>{
        const newsubs = subs.map((item:any)=>{
            return item.classificationId===e.target.value?{...item,status:e.target.checked?1:0}:item
        })
        setSubs(newsubs)
    }

    // const dateChange=(e:any,classId:number)=>{
    //     const newsubs = subs.map((item:any)=>{
    //         return item.classificationId===classId?{...item,startDate:e[0].format('YYYY-MM-DD'),endDate:e[1].format('YYYY-MM-DD')}:item
    //     })
    //     setSubs(newsubs)
    // }
    const onFinish =async ()=>{
        setLoading(true)
        const config = customerService.SubsModify({}, {customerId:data.id,subscriptionItemList:subs})
        from(request(config)).subscribe(res => {
            setLoading(false)
            if(res.isSuccess){
                setSubs([])
                form.resetFields()
                reloadMainList();
                onOk()
            }
        })

    }

    const disabledDate: any = (current:any) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

    return <Modal
        confirmLoading={loading}
        title={<div style={{color:"#fff",fontWeight:550}}>Subscriptions</div>}
        visible={visible}
        onCancel={onCancel}
        onOk={onFinish}
        okText={'Save'}
        cancelText={'Cancel'}
        width={1000}
    >
        <section style={{display:"flex",alignItems:"center",color:"#4776aa",fontWeight:550}}>
            <span style={{flex:1}}>Content(Product)</span>
            <span style={{flex:1}}>Subscription Mode(Plan)</span>
            <span style={{flex:1}}>Discount</span>
            <span style={{flex:2}}>Date</span>
        </section>
        {!!subs.length && subs.map((item:any)=><section key={item.id} style={{padding:"10px 0",display:"flex",alignItems:"center"}}>
                <Checkbox style={{flex:1}} value={item.classificationId} checked={!!item.status} onChange={checkboxChange} disabled={!item.alterableFlag}>
                    {item.classificationName}
                </Checkbox>
                <div style={{flex:1}} >
                    <span>{item.planName}</span>
                    {/*<DatePicker disabledDate={disabledDate} value={moment(item.expiryDate)} onChange={(e)=>timerChange(e,item.classificationId)}/>*/}
                </div>
            <div style={{flex:1}} >
                <span>{item.discountName}</span>
                    {/*<DatePicker disabledDate={disabledDate} value={moment(item.expiryDate)} onChange={(e)=>timerChange(e,item.classificationId)}/>*/}
                </div>
            <div style={{flex:2}} >
                {/*<RangePicker disabledDate={disabledDate}*/}
                {/*             defaultValue={[moment(item.startDate,'YYYY-MM-DD'),moment(item.endDate,'YYYY-MM-DD')]}*/}
                {/*             format={'YYYY-MM-DD'}*/}
                {/*             onChange={(e)=>dateChange(e,item.classificationId)}/>*/}
                <RangePicker disabledDate={disabledDate} disabled
                             value={[moment(item.startDate,'YYYY-MM-DD'),moment(item.endDate,'YYYY-MM-DD')]}
                             format={'YYYY-MM-DD'}/>
            </div>
        </section>
        )}
    </Modal>
}

export default SubsCustomer;
