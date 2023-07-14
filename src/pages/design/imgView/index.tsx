import React, {FC, useEffect, useRef, useState} from "react";
import {Button, Image, Divider, Form, Input, InputRef, notification, Select, Space, Spin, Badge} from "antd";

import historyService from "@/store/history";
import {itemService} from "@/store/apis/item";
import {useLocation} from "react-router-dom";
import {from} from "rxjs";
import request, {dev_url} from "@/store/request";
import {LeftOutlined} from "@ant-design/icons";
import ImageUpload from "@/pages/design/create/imageUpload";
import {RcFile} from "antd/lib/upload";

const ImgView: FC = () => {
    const path:any = useLocation()
    console.log(path)
    const folderPath = path.search.split("=")[1]
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
    },[])

    const onSubmit=async ()=>{
        console.log(deleteList,uploadList)
        const formData = new FormData()
        uploadList.forEach((img:any) => {
            formData.append('addFiles', img.originFileObj as RcFile);
        });
        deleteList.forEach((url:any) => {
            formData.append('deleteFiles', url);
        });
        formData.append('folder', folderPath);

        // setLoading(true)
        const config = itemService.FileModify({},formData)
        const result = await request(config);
        result.isSuccess && historyService.goBack()

        // setModifyMode(false)
    }
    const onDelete =(name:string,index:number)=>{
        console.log(restList.length)
        console.log(uploadList.length)
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

    return (
        <section>
            <div onClick={()=>historyService.goBack()} style={{color:"#ee8d20",fontWeight:600}}><LeftOutlined />返回</div>
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
                    {imgList.map((res:any)=><div style={{width:200,marginRight:20,cursor:"pointer"}}>
                        <Image style={{width:"100%"}} src={dev_url+res}
                               preview={{src: dev_url+res}}/>
                    </div>)}
                </section>
                <Button style={{marginTop:20}} onClick={()=>setModifyMode(true)}>修改</Button>
            </>}
        </section>
    );
};

export default ImgView;
