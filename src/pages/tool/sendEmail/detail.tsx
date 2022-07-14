import {FC, useCallback, useEffect, useState} from "react";
import useUrlParamsId from "@/hooks/useUrlParams";
import request from "@/store/request";
import {emailService} from "@/store/apis/tool";
import {IEmail} from "@/store/apis/tool/email";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";


const DetailEmail:FC = () => {
    const id = useUrlParamsId("/email/:id")
    const [content,setContent]=useState<IEmail>()

    const getDetail = useCallback(async ()=>{
        if (id){
            const res = await request(emailService.EmailDetail({emailRecordId:id},{}));
            if(res.isSuccess){
                setContent(res.result as IEmail)
            }
        }
    },[id])
    useEffect(()=>{
        getDetail()
    },[getDetail])
    return <div>
        <Breadcrumb separator=">" style={{marginBottom:20}}>
            <Breadcrumb.Item>工具</Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to= "/email">
                    <span style={{marginLeft: 5}}>批量邮件发送</span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{content && content.title}</Breadcrumb.Item>
        </Breadcrumb>
        {content &&  <div dangerouslySetInnerHTML = {{ __html: content.detail}}/>}

    </div>
}

export default DetailEmail;
