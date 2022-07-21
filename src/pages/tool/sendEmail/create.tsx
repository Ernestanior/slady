import {FC, useCallback, useEffect, useState} from "react";
import FormItem from "@/common/Form/formItem";
import Editor from "@/pages/news/editor";
import {Breadcrumb, Button, Col, Form, Input, notification, Row, Select, Upload} from "antd";
import {useForm} from "antd/es/form/Form";
import historyService from "@/store/history";
import './index.less'
import request from "@/store/request";
import {emailService} from "@/store/apis/tool";
import {Link} from "react-router-dom";
import {PaperClipOutlined} from "@ant-design/icons";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/lib/upload";
import {validateEmail} from "@/common/utils";

const {Option} = Select
const CreateEmail:FC = () => {
    const [form] = useForm()
    const [cc,setCC] = useState<boolean>(true)
    const [bcc,setBCC] = useState<boolean>(true)
    const [imgList,setImgList] = useState<any>([])
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [senderList,setSenderList] = useState<any[]>()
    const [loading,setLoading]=useState<boolean>(false)

    const getSenderList=useCallback(async ()=>{
        const res = await request(emailService.EmailListSender({}, {}));
        res.result && setSenderList(res.result as any[])
    },[])

    useEffect(()=>{
        getSenderList()
    },[getSenderList])


    const onFinish =async (e:any)=>{
        const {toAddress,ccAddress,bccAddress} = e
        let valid = true;
        toAddress && toAddress.forEach((item:string)=>{
            if(!validateEmail(item)) valid=false
        })
        ccAddress && ccAddress.forEach((item:string)=>{
            if(!validateEmail(item)) valid=false
        })
        bccAddress && bccAddress.forEach((item:string)=>{
            if(!validateEmail(item)) valid=false
        })
        if (!valid){
            notification.error({message:"检测到Email格式不正确"})
            return
        }
        const formData = new FormData()
        fileList.forEach(file => {
            formData.append('attachments', file as RcFile);
        });

        setLoading(true)
        let attachments:string[]=[]
        const upload_result = await request(emailService.AttachmentsUpload({}, formData));
        if(upload_result.isSuccess){
            attachments = upload_result.result as string[]
            const email_result = await request(emailService.EmailSend({}, {attachments,spittleImages:imgList,...e}));
            setLoading(false)
            if(email_result.isSuccess ){
                historyService.replace('/email')
            }
        }
    }
    return <>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>工具</Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to= "/email">
                    <span style={{marginLeft: 5}}>批量邮件发送</span>
                </Link>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Form form={form} onFinish={onFinish}  className="email-new">
            <div className="email-new-title">新邮件</div>
            <FormItem>
                <FormItem name="toAddress" noStyle>
                    <Select
                        placeholder={"to"}
                        mode="tags"
                        open={false}
                        style={{width:"94%"}}
                    />
                </FormItem>
                <span className="email-cc" onClick={()=>setCC(false)}>cc</span>
                <span className="email-bcc" onClick={()=>setBCC(false)}>bcc</span>
            </FormItem>
            <FormItem name="ccAddress" hidden={cc}>
                <Select
                    placeholder={"cc"}
                    mode="tags"
                    open={false}
                />
            </FormItem>
            <FormItem name="bccAddress" hidden={bcc}>
                <Select
                    placeholder={"bcc"}
                    mode="tags"
                    open={false}
                />
            </FormItem>
            <FormItem name="sender">
                <Select placeholder="from">
                    {senderList && senderList.map(i => <Option value={i}>{i}</Option>)}
                </Select>
            </FormItem>
            <FormItem name="title">
                <Input placeholder="Subject"/>
            </FormItem>
            <FormItem name= "content">
                <Editor key="simplified-content" imgUrlCallback={(url)=>setImgList([...imgList,url])}/>
            </FormItem>
            <Row gutter={15} style={{marginTop:20,marginBottom:30}}>
                <Col>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        应用
                    </Button>
                </Col>
                <Col>
                    <Button onClick={() =>historyService.push("/email") }>
                        取消
                    </Button>
                </Col>
                <Col>
                    <Upload
                        onRemove={(file)=>{
                        const index = fileList.indexOf(file);
                        const newFileList = fileList.slice();
                        newFileList.splice(index, 1);
                        setFileList(newFileList);
                    }}
                    beforeUpload={(file)=>{
                        setFileList([...fileList, file]);
                        return false;
                    }}
                    fileList={fileList}>
                        <Button icon={<PaperClipOutlined />}/>
                    </Upload>
                </Col>
            </Row>
        </Form>
    </>
}

export default CreateEmail;
