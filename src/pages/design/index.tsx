import React, {FC, useEffect, useMemo, useState} from "react";
import {INormalEvent} from "@/common/interface";
import {Button} from "antd";
import item1 from '../../assets/1.jpg'
import item2 from '../../assets/2.jpg'
import item4 from '../../assets/4.jpg'
import item5 from '../../assets/5.jpg'
import item6 from '../../assets/6.jpg'
import {RightOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import historyService from "@/store/history";
import request, {dev_url} from "@/store/request";
import {designService, itemService} from "@/store/apis/item";
import {from} from "rxjs";

type Type ='All' | 'DR' | 'TB' | 'SK' | 'PT' | 'JK' | 'JS-连体裤' | 'AC' | 'SH'

// export const typeList:Type[] = ['All', 'Dresses', 'Blouses', 'Skirts', 'Pants', 'Jackets', 'Sets', 'Accessories', 'Shoes']
export const typeList:Type[] = ['All', 'DR', 'TB', 'SK', 'PT', 'JK', 'JS-连体裤', 'AC', 'SH']

const DesignList: FC = () => {
    const [displayData,setDisplayData]=useState<any>([])
    const [type,setType] = useState<string>('All')
    const [name,setName] = useState<string>('')

    const goDetail=(id:string)=>{
        historyService.push(`/item/detail/${id}`)
    }

    useEffect(()=>{
        const config = designService.DesignList({}, {
            // type,
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

    },[type])
    return (
        <section>
            <section style={{marginBottom:10}}>
                {typeList.map((item)=><>
                    <Button type={type===item?'primary':'default'} style={{borderRadius:20,marginRight:5}} onClick={()=>setType(item)}>{item}</Button>
                </>)}
            </section>
            <section>
                <Search onChange={(e)=>setName(e.target.value)} style={{width:300,marginBottom:30,marginRight:30}} enterButton/>
                <Button type={"primary"} onClick={()=>historyService.push('/item/create')}>新增</Button>
            </section>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {displayData && displayData.map((item:any,index:number)=><div key={index} style={{backgroundColor:"#fff",width:500,display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd"}}>
                        <img style={{height:"100%"}} src={dev_url+item.previewPhoto}/>
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

const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:2,
    content:[
        {design:"618-212", pic:item1, stockNumber:5, salePrice:199.01},
        {design:"618-212", pic:item2, stockNumber:5, salePrice:199.01},
        {design:"618-212", pic:item5, stockNumber:5, salePrice:199.01},
        {design:"618-212", pic:item4, stockNumber:5, salePrice:199.01},
        {design:"618-212", pic:item5, stockNumber:5, salePrice:199.01},
        {design:"618-212", pic:item6, stockNumber:5, salePrice:199.01},
        {design:"618-212", pic:item1, stockNumber:5, salePrice:199.01},
        {design:"618-212", pic:item2, stockNumber:5, salePrice:199.01},
        {design:"618-212", pic:item4, stockNumber:5, salePrice:199.01},
    ]
}
