import React, {FC, useEffect, useState} from "react";
import {Button} from "antd";
import {RightOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import historyService from "@/store/history";
import request, {dev_url} from "@/store/request";
import {designService} from "@/store/apis/item";
import {from} from "rxjs";
export const typeList:any[] = [{id:'',value:'ALL'}, {id:'DR',value:'DR连衣裙'},
    {id:'TB',value:'TB上衣'},{id:'SK',value:'SK半裙'},{id:'PT',value:'PT裤子'},{id:'GO',value:'GO晚礼服'},
    {id:'JK',value:'JK外套'},{id:'JS',value:'JS连体裤'},{id:'BT',value:'BT皮带'},{id:'SH',value:'SH鞋子'},{id:'SE',value:'SE套装'},
    {id:'SI',value:'SI真丝'},{id:'AC',value:'AC'}]

const DesignList: FC = () => {
    const [displayData,setDisplayData]=useState<any>([])
    const [type,setType] = useState<string>('')
    const [design,setDesign] = useState<string>('')

    const goDetail=(id:string)=>{
        historyService.push(`/item/detail/${id}`)
    }

    useEffect(()=>{
        loadData()

    },[type])

    const loadData = ()=>{
        const config = designService.DesignList({}, {
            type,
            design,
            "searchPage": {
                "desc": 0,
                "page": 1,
                "pageSize": 999,
                "sort": ""
            }
        })
        from(request(config)).subscribe((res:any)=>{
            setDisplayData(res.result)
        })
    }
    return (
        <section>
            <section style={{marginBottom:10}}>
                {typeList.map((item)=><>
                    <Button type={type===item.id?'primary':'default'} style={{borderRadius:20,marginRight:5}} onClick={()=>setType(item.id)}>{item.value}</Button>
                </>)}
            </section>
            <section>
                <Search onChange={(e)=>setDesign(e.target.value)} style={{width:300,marginBottom:30,marginRight:30}} enterButton onSearch={loadData}/>
                <Button type={"primary"} onClick={()=>historyService.push('/item/create')}>新增</Button>
            </section>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {displayData && displayData.map((item:any,index:number)=><div key={index} style={{backgroundColor:"#fff",width:500,display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd",overflow:"hidden"}}>
                        <img alt="" style={{height:150}} src={dev_url+item.previewPhoto}/>
                        <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between"}}>
                            <div>
                                <h3>{item.design}</h3>
                                <div style={{marginBottom:5}}>库存：{item.totalStock || 0}</div>
                                价格：<span style={{color:"#fa9829"}}>${item.salePrice || 0}</span>
                            </div>
                            <a style={{display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}} onClick={()=>goDetail(item.id)}>详情<RightOutlined /></a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DesignList;
