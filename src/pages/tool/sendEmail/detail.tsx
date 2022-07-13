import {FC, useCallback, useEffect, useState} from "react";
import useUrlParamsId from "@/hooks/useUrlParams";
import request from "@/store/request";
import {emailService} from "@/store/apis/tool";
import {IEmail} from "@/store/apis/tool/email";


const DetailEmail:FC = () => {
    const id = useUrlParamsId("/email/:id")
    const [content,setContent]=useState<IEmail>()

    const getDetail = useCallback(async ()=>{
        if (id){
            const res = await request(emailService.EmailDetail({emailRecordId:id},{}));
            if(res.isSuccess){
                console.log(res.result)
                // historyService.push("/email" )
                setContent(res.result as IEmail)
            }
        }
    },[id])
    useEffect(()=>{
        getDetail()
    },[getDetail])
    return <div>
        {content &&  <div dangerouslySetInnerHTML = {{ __html: content.detail}}/>}

    </div>
}

export default DetailEmail;
