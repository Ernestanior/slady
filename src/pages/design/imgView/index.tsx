import React, {FC, useEffect, useState} from "react";
import {Button, Image, notification, Spin, Badge} from "antd";
import historyService from "@/store/history";
import {itemService} from "@/store/apis/item";
import {from} from "rxjs";
import request, {dev_url} from "@/store/request";
import {LeftOutlined} from "@ant-design/icons";
import ImageUpload from "@/pages/design/create/imageUpload";
import {RcFile} from "antd/lib/upload";

interface IProps{
    onReturn:()=>void;
    id:number;
    folderPath:string;
}
const ImgView: FC<IProps> = ({onReturn,id,folderPath}) => {
    // const path:any = useLocation()
    // const folderPath = path.search.split("=")[1]
    // const url = useRouteMatch<{id:string }>("/item/images/:id");
    // const id:any = useMemo(()=>url?.params.id,[url])

    const [imgList,setImgList] = useState<any>([])
    const [deleteList,setDeleteList] = useState<any>([])
    const [restList,setRestList] = useState<any>([])
    const [uploadList,setUploadList] = useState<any>([])
    const [loading,setLoading]=useState<boolean>(true)
    const [modifyMode,setModifyMode] = useState<boolean>(false)
    useEffect(()=>{
        setLoading(true)
        const config = itemService.FileList({folderPath},{})
        from(request(config)).subscribe((res)=>{
            setLoading(false)
            if(res.isSuccess){
                setRestList(res.result)
                setImgList(res.result)
            }
        })
    },[folderPath])

    const onSubmit=async ()=>{
        const formData = new FormData()
        uploadList.forEach((img:any) => {
            formData.append('addFiles', img.originFileObj as RcFile);
        });
        deleteList.forEach((url:any) => {
            formData.append('deleteFiles', url);
        });
        formData.append('designId', id+'');

        // setLoading(true)
        const config = itemService.FileModify({},formData)
        const result = await request(config);
        result.isSuccess && historyService.goBack()

        // setModifyMode(false)
    }
    const onDelete =(name:string,index:number)=>{
        if(restList.length+uploadList.length<=1){
            notification.error({message:"图片至少需要一张"})
            return
        }
        setRestList(restList.filter((v:any,i:number)=>i!==index))
        setDeleteList([...deleteList,name])
    }
    const onCancel = () =>{
        setModifyMode(false)
        setRestList(imgList)
    }

    const onDownload = async()=>{
        const config= itemService.FileDownload({filePath:folderPath},{})
        const res = await request(config)
        window.open(dev_url+res.result)
    }
    return (
        <section>
            <div onClick={onReturn} style={{color:"#ee8d20",fontWeight:600,cursor:"pointer"}}><LeftOutlined />返回</div>
            {modifyMode?<>
                <section style={{display:"flex",flexWrap:"wrap",marginTop:20,marginBottom:50}}>
                    {restList.map((res:any,index:number)=><div style={{width:200,marginRight:20,cursor:"pointer"}}>
                        <Badge count={<div onClick={()=>onDelete(res,index)} style={{backgroundColor:"red",padding:"3px",color:"#fff",borderRadius:"50%",fontWeight:800}}>一</div>}>
                            <Image style={{width:"100%"}} src={dev_url+res}/>
                        </Badge>
                    </div>)}
                </section>
                <ImageUpload changePic={setUploadList}></ImageUpload>
                <Button style={{marginTop:20}} onClick={onSubmit}>确定</Button>
                <Button style={{marginTop:20,marginLeft:20}} onClick={onCancel}>返回</Button>
            </>:<>
                <Spin spinning={loading}></Spin>
                <section style={{display:"flex",flexWrap:"wrap",marginTop:20}}>
                    {imgList.map((res:any)=><div key={res} style={{width:200,marginRight:20,cursor:"pointer"}}>
                        <Image style={{width:"100%"}} src={dev_url+res}
                               preview={{src: dev_url+res}}/>
                    </div>)}
                </section>
                <Button style={{marginTop:20,marginRight:20}} onClick={()=>setModifyMode(true)}>修改</Button>
                <Button style={{marginTop:20}} onClick={onDownload}>下载全部图片</Button>
            </>}
        </section>
    );
};

export default ImgView;
