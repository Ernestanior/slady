import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {Button, notification, Spin} from "antd";
import {RightOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import historyService from "@/store/history";
import request, {dev_url} from "@/store/request";
import {designService} from "@/store/apis/item";
import {from} from "rxjs";
import useAccountInfo from "@/store/account";
import {E_USER_TYPE} from "@/store/account/interface";
import {useTranslation} from "react-i18next";
import Detail from "@/pages/design/detail";
import { systemService } from "@/store/apis/system";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import useStore from "@/store/store";
import { useLocation } from "react-router-dom";

export const typeList:any[] = [{value:'',label:'ALL'}, {value:'DR',label:'DR连衣裙'},
    {value:'TB',label:'TB上衣'},{value:'SK',label:'SK半裙'},{value:'ST',label:'ST短裤'},{value:'PT',label:'PT裤子'},{value:'GO',label:'GO晚礼服'},
    {value:'JK',label:'JK外套'},{value:'JS',label:'JS连体裤'},{value:'BT',label:'BT皮带'},{value:'SH',label:'SH鞋子'},{value:'SE',label:'SE套装'},
    {value:'SI',label:'SI真丝'},{value:'AC',label:'AC饰品'},{value:'BG',label:'BG包包'},{value:'CDJ',label:'CDJ穿戴甲'},{value:'SO',label:"SO特价"},
    {value:'CL',label:'Classic经典款'},{value:'XL',label:"L & XL加价大码"},]

const DesignList: FC = () => {
    const [t]=useTranslation()
    const {scrollY,setScrollY}=useStore()
    const userInfo = useAccountInfo()
    const [displayData,setDisplayData]=useState<any>([])
    const [type,setType] = useState<string>('')
    const [design,setDesign] = useState<string>('')
    const [reload,setReload]=useState<boolean>(false)
    const [selectedId,setSelectedId]=useState<number>(0)
    const [currentPage,setCurrentPage]=useState<string>('list')
    const scrollListRef:any = useRef(null)
    
    // const resetStock=useCallback(async()=>{
    //     await request(systemService.ResetStock({},{}))
    // },[])
    useEffect(()=>{        
        if (currentPage==='list') {
            scrollListRef.current.scrollTop = scrollY           
        }
    },[currentPage])

    const loadData = ()=>{
        const config = designService.DesignPage({}, {
            type,
            design,
            "searchPage": {
                "desc": 1,
                "page": 1,
                "pageSize": 999,
                "sort": "id"
            }
        })
        from(request(config)).subscribe((res:any)=>{
            setDisplayData(res.result.content)
        })
    }


    const onSearch =()=>{
        console.log(design,'design');
        if (design) {
            loadData()           
        }else{
            notification.error({
                message: '搜索栏不能为空',
            })
        }
    }

        return (currentPage==='detail'?
            <Detail id={selectedId} onReturn={()=>{setCurrentPage('list');setReload(!reload)}} toImgView={()=>setCurrentPage('imgView')}/>
            :
            <section>
                        <section style={{marginBottom:10}}>
                            {typeList.map((item)=><>
                                <Button type={type===item.value?'primary':'default'} style={{borderRadius:20,marginRight:5,marginBottom:5}} onClick={()=>setType(item.value)}>{item.label}</Button>
                            </>)}
                        </section>
                        <section>
                            <Search onChange={(e)=>setDesign(e.target.value)} value={design} style={{width:300,marginBottom:30,marginRight:30}} enterButton onSearch={ onSearch}/>
                            {userInfo?.type!==E_USER_TYPE.SALER && <Button type={"primary"} onClick={()=>historyService.push('/item/create')}>{t('CREATE')}</Button>}
                            {/* <Button type={"primary"} onClick={resetStock}>清空库存</Button> */}
                        </section>
                        <div style={{display:"flex",flexWrap:"wrap",height:700,overflowY:"scroll"}} ref={scrollListRef} >
                            {displayData? displayData.map((item:any,index:number)=><div key={index} style={{backgroundColor:"#fff",width:500,height:150,display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd",overflow:"hidden"}}>
                                    <img alt="" style={{height:150}} src={dev_url+item.previewPhoto}/>
                                    <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between"}}>
                                        <div>
                                            <h3>{item.design}</h3>
                                            <div style={{marginBottom:5}}>{t('STOCK')}：{item.stock || 0}</div>
                                            {t('PRICE')}：<span style={{color:"#fa9829"}}>{item.salePrice || 0}</span>
                                        </div>
                                        <div style={{cursor:"pointer",display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}} onClick={()=>{setSelectedId(item.id);setCurrentPage('detail');setScrollY(scrollListRef.current.scrollTop);}}>{t('DETAIL')}<RightOutlined /></div>
                                    </div>
                                </div>
                            ):<Spin size={"large"}/>}
                        </div>
                    </section>
        );
};

export default DesignList;
