import React, {FC, useEffect, useState} from "react";
import {Button} from "antd";
import {RightOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import historyService from "@/store/history";
import request, {dev_url} from "@/store/request";
import {designService} from "@/store/apis/item";
import {from} from "rxjs";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";
export const typeList:any[] = [{value:'',label:'ALL'}, {value:'DR',label:'DR连衣裙'},
    {value:'TB',label:'TB上衣'},{value:'SK',label:'SK半裙'},{value:'PT',label:'PT裤子'},{value:'GO',label:'GO晚礼服'},
    {value:'JK',label:'JK外套'},{value:'JS',label:'JS连体裤'},{value:'BT',label:'BT皮带'},{value:'SH',label:'SH鞋子'},{value:'SE',label:'SE套装'},
    {value:'SI',label:'SI真丝'},{value:'AC',label:'AC'}]

const DesignList: FC = () => {
    const userInfo = useAccountInfo()
    const [displayData,setDisplayData]=useState<any>([])
    const [type,setType] = useState<string>('')
    const [design,setDesign] = useState<string>('')

    const goDetail=(id:string)=>{
        historyService.push(`/item/detail/${id}`)
    }

    useEffect(()=>{
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

    },[type,design])

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
                    <Button type={type===item.id?'primary':'default'} style={{borderRadius:20,marginRight:5}} onClick={()=>setType(item.value)}>{item.label}</Button>
                </>)}
            </section>
            <section>
                <Search onChange={(e)=>setDesign(e.target.value)} style={{width:300,marginBottom:30,marginRight:30}} enterButton onSearch={loadData}/>
                {userInfo?.type!==E_USER_TYPE.SALER && <Button type={"primary"} onClick={()=>historyService.push('/item/create')}>新增</Button>}
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
                            <div style={{cursor:"pointer",display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}} onClick={()=>goDetail(item.id)}>详情<RightOutlined /></div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DesignList;
