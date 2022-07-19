import {FC, useCallback, useEffect, useState} from "react";
import useUrlParamsId from "@/hooks/useUrlParams";
import request from "@/store/request";
import {emailService} from "@/store/apis/tool";
import {IEmail} from "@/store/apis/tool/email";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";
import './index.less'
import {DownOutlined} from "@ant-design/icons";

const DetailEmail:FC = () => {
    const id = useUrlParamsId("/email/:id")
    const [content,setContent]=useState<IEmail>()
    const [showCC,setShowCC] = useState<boolean>(false)
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

        {content &&
            <>
                <section className="email-detail-label">
                    <section>
                        <div className="title">{content.title}</div>
                        <div className="sender">&lt;{content.sender}&gt;</div>
                        <div style={{marginTop:8}}>
                            {
                                !!content.toList.length && <span className="cc">To: </span>
                            }
                            {
                                content.toList.map(item=> <span>{item}, </span>)
                            }
                        </div>
                        {
                            showCC &&
                            <>
                                <div style={{marginTop:8}}>
                                    {
                                        !!content.ccList.length && <span className="cc">Cc: </span>
                                    }
                                    {
                                        content.ccList.map(item=> <span>{item}, </span>)
                                    }
                                </div>
                                <div style={{marginTop:8}}>
                                    {
                                        !!content.bccList.length && <span className="bcc">Bcc: </span>
                                    }
                                    {
                                        content.bccList.map(item=> <span>{item}, </span>)
                                    }
                                </div>
                            </>
                        }
                    </section>
                    <section className="right-part">
                        <DownOutlined className={showCC?'rotate':"no-rotate"} onClick={()=>setShowCC(!showCC)}/>
                        <div className="date">{content.createDate}</div>
                    </section>

                </section>
                <div dangerouslySetInnerHTML = {{ __html: content.detail}}/>
            </>}

    </div>
}

export default DetailEmail;
