import {FC, useCallback, useEffect, useRef, useState} from "react";
import {Button, Select, Spin} from "antd";
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

export const typeList:any[] = [{value:'AL',label:'A型裙'},{value:'DR',label:'DR连衣裙'},
    {value:'TB',label:'TB上衣'},{value:'SK',label:'SK半裙'},{value:'ST',label:'ST短裤'},{value:'PT',label:'PT裤子'},{value:'GO',label:'GO晚礼服'},
    {value:'JK',label:'JK外套'},{value:'JS',label:'JS连体裤'},{value:'BT',label:'BT皮带'},{value:'SH',label:'SH鞋子'},{value:'SE',label:'SE套装'},
    {value:'SI',label:'SI真丝'},{value:'AC',label:'AC饰品'},{value:'BG',label:'BG包包'},{value:'CDJ',label:'CDJ穿戴甲'},{value:'SO',label:"SO特价"},
    {value:'CL',label:'Classic经典款'},{value:'XL',label:"L & XL加价大码"},]


    const DesignList: FC = () => {
    const [t]=useTranslation()
    const userInfo = useAccountInfo()
    const [scrollY,setScrollY]=useState<any>()
    const [displayData,setDisplayData]=useState<any>([])
    const [types,setTypes] = useState<string[]>([])
    const [design,setDesign] = useState<string>('')
    const [page,setPage]=useState<number>(1)
    const [stopper,setStopper]=useState<boolean>(false)
    const [reload,setReload]=useState<boolean>(false)
    const [selectedId,setSelectedId]=useState<number>(0)
    const [currentPage,setCurrentPage]=useState<string>('list')
    const [hasStock,setHasStock]=useState<boolean>(false)
    const scrollListRef:any = useRef(null)

    useEffect(()=>{        
        if (currentPage==='list') {
            scrollListRef.current.scrollTop =scrollY           
        }
    },[currentPage])
    
    
    // const goDetail=(id:string)=>{
    //     historyService.push(`/item/detail/${id}`)
    // }

    // useEffect(()=>{
    //     const config = designService.DesignList({}, {
    //         type,
    //         design,
    //         "searchPage": {
    //             "desc": 1,
    //             "page": 1,
    //             "pageSize": 999,
    //             "sort": "id"
    //         }
    //     })
    //     from(request(config)).subscribe((res:any)=>{
    //         setDisplayData(res.result)
    //     })
    //
    // },[type,design])

    const resetStock=useCallback(async()=>{
        await request(systemService.ResetStock({},{}))
    },[])

    const queryData=(page:number)=>{

        const config = designService.DesignPage({}, {
            typeList:types,
            hasStock:hasStock?1:0,
            design,
            "searchPage": {
                "desc": 1,
                "page": page,
                "pageSize": 20,
                "sort": "id"
            }
        })
        from(request(config)).subscribe((res:any)=>{
            if (res){
                if (res.result.totalElements>=20 && page<res.result.totalPages){
                    setStopper(false)
                }
                if (page===1){
                    setDisplayData(res.result.content)
                }else{
                    setDisplayData([...displayData,...res.result.content])
                }
            }
        })
    }
    useEffect(()=>{
        queryData(page)
    },[page])

    useEffect(()=>{
        setStopper(false)
        if (page>1){
            setPage(1)
        }
        else{
            const config = designService.DesignPage({}, {
                typeList:types,
                design,
                hasStock:hasStock?1:0,
                "searchPage": {
                    "desc": 1,
                    "page": 1,
                    "pageSize": 20,
                    "sort": "id"
                }
            })
            from(request(config)).subscribe((res:any)=>{
                if (res){
                    if (res.result.totalElements<20){
                        setStopper(true)
                    }
                    setDisplayData(res.result.content)
                }
            })
        }
    },[types,reload,hasStock])

    const toDetail = (item:any)=>{
        setSelectedId(item.id);
        setCurrentPage('detail');
        setScrollY(scrollListRef.current.scrollTop)
    }

    const loadData = ()=>{
        const config = designService.DesignPage({}, {
            typeList:types,
            design,
            "searchPage": {
                "desc": 1,
                "page": 1,
                "pageSize": 20,
                "sort": "id"
            }
        })
        from(request(config)).subscribe((res:any)=>{
            setDisplayData(res.result.content)
        })
    }

    const handleScroll = (e:any) => {
        if (e.target.scrollTop+e.target.offsetHeight>e.target.scrollHeight-100){
            if (!stopper){
                setStopper(true)
                setPage(page+1)
            }
        }
    };

    const onSearch =()=>{
        setStopper(false);
        scrollListRef.current.style.height = 900;
        scrollListRef.current.scrollTop = 0;
        setPage(1);
        loadData()
    }

        return (currentPage==='detail'?
            <Detail id={selectedId} onReturn={()=>{setCurrentPage('list')}} toImgView={()=>setCurrentPage('imgView')}/>
            :
            <section>

                        <section>
                            <Search onChange={(e)=>setDesign(e.target.value)} value={design} style={{width:300,marginRight:30}} enterButton onSearch={ onSearch}/>
                            <Select mode="multiple" options={typeList} style={{width:500,marginRight:30}} onChange={(e)=>setTypes(e)} value={types} ></Select>
                            {userInfo?.type!==E_USER_TYPE.SALER && <Button type={"primary"} onClick={()=>historyService.push('/item/create')}>{t('CREATE')}</Button>}
                            <Button type={hasStock?'primary':'default'} style={{borderRadius:5,marginLeft:15}} onClick={()=>setHasStock(!hasStock)}>{t('HAVE_STOCK')}</Button>
                            
                            {/* <Button type={"primary"} onClick={resetStock}>清空库存</Button> */}
                        </section>
                        <section style={{marginBottom:10,marginTop:10,}}>
                            {typeList.map((item)=><>
                                <Button type={types===item.value?'primary':'default'} style={{borderRadius:20,marginRight:5,marginBottom:5}} onClick={()=>setTypes([item.value])}>{item.label}</Button>
                            </>)}
                        </section>
                        <div style={{display:"flex",flexWrap:"wrap",height:900,overflowY:"scroll"}} onScroll={handleScroll} ref={scrollListRef}>
                            {displayData? displayData.map((item:any,index:number)=><div key={index} style={{backgroundColor:"#fff",width:500,height:150,display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd",overflow:"hidden"}}>
                                    <img alt="" style={{height:150}} src={dev_url+item.previewPhoto}/>
                                    <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between"}}>
                                        <div>
                                            <h3>{item.design}</h3>
                                            <div style={{marginBottom:5}}>{t('STOCK')}：{item.stock || 0}</div>
                                            {t('PRICE')}：<span style={{color:"#fa9829"}}>{item.salePrice || 0}</span>
                                        </div>
                                        <div style={{cursor:"pointer",display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}}
                                            onClick={()=>toDetail(item)}>
                                            {t('DETAIL')}
                                            <RightOutlined />
                                        </div>
                                    </div>
                                </div>
                            ):<Spin size={"large"}/>}
                        </div>
                    </section>
        );
};

export default DesignList;
