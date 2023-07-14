import React, {FC, useEffect, useState} from "react";
import {RightOutlined} from "@ant-design/icons";
import IconFont from "@/common/icon";
import {Button} from "antd";
import {typeList} from "@/pages/design";
import {designService} from "@/store/apis/item";
import {from} from "rxjs";
import request, {dev_url} from "@/store/request";
import historyService from "@/store/history";
const TopSale: FC = () => {
    const [type,setType] = useState<string>('')
    const [displayData,setDisplayData]=useState<any>([])

    useEffect(()=>{
        const config = designService.DesignList({}, {
            type,
            "searchPage": {
                "desc": 1,
                "page": 1,
                "pageSize": 999,
                "sort": "hot"
            }
        })
        from(request(config)).subscribe((res:any)=>{
            setDisplayData(res.result)
        })
    },[type])

    const goDetail=(id:string)=>{
        historyService.push(`/item/detail/${id}`)
    }
    return (
        <section>
            <section style={{marginBottom:10}}>
                {typeList.map((item)=><>
                    <Button type={type===item.id?'primary':'default'} style={{borderRadius:20,marginRight:5}} onClick={()=>setType(item.id)}>{item.value}</Button>
                </>)}
            </section>
            <div>
                {displayData && displayData.map((item:any,index:number)=><div key={index} style={{backgroundColor:"#fff",display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd"}}>
                        <img alt="" style={{height:"100%"}} src={dev_url+item.previewPhoto}/>
                        <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                                <h3>{item.designId}</h3>
                                <div style={{marginBottom:5}}>编号：{item.design}</div>
                                热度：<span style={{color:"#fa9829"}}>{item.hot || 0}</span>
                            </div>
                                <a href="#" style={{display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}} onClick={()=>goDetail(item.id)}>详情<RightOutlined /></a>
                        </div>
                    </div>
                )}
            </div>

        </section>
    );
};

export default TopSale;


