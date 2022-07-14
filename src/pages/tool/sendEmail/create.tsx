import {FC, useCallback, useEffect, useState} from "react";
import FormItem from "@/common/Form/formItem";
import Editor from "@/pages/news/editor";
import {Breadcrumb, Button, Col, Form, Input, Row, Select} from "antd";
import {useForm} from "antd/es/form/Form";
import historyService from "@/store/history";
import './index.less'
import request from "@/store/request";
import {emailService} from "@/store/apis/tool";
import {Link} from "react-router-dom";

const {Option} = Select
const CreateEmail:FC = () => {
    const [form] = useForm()
    const [cc,setCC] = useState<boolean>(true)
    const [bcc,setBCC] = useState<boolean>(true)
    const [imgList,setImgList] = useState<string[]>([])

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
        setLoading(true)
        const res = await request(emailService.EmailSend({}, {...e,spittleImages:imgList}));
        setLoading(false)
        if(res.isSuccess){
            historyService.replace('/email')
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
            <Row gutter={15}>
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
            </Row>
        </Form>
    </>
}

export default CreateEmail;
