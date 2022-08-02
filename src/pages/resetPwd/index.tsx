import {FC, useMemo, useState} from "react";
import {Breadcrumb, Button} from "antd";
import {HomeOutlined} from "@ant-design/icons"
import {Link, useRouteMatch} from "react-router-dom";
import TipBox from "@/common/tip";
import request from "@/store/request";
import {userService} from "@/store/apis/account";
import historyService from "@/store/history";
import IconFont from "@/common/icon";
import {copy} from "@/common/utils";


const ResetPwdPage:FC = () => {
    const [newPwd,setNewPwd] = useState<string>('')
    const url = useRouteMatch<{page:string, id: string, name: string }>("/:page/resetPwd/:name/:id");

    const page = useMemo(() => {
        if(url && url.params){
            return url.params.page
        }
    }, [url])

    const id = useMemo(() => {
        if(url && url.params){
            if(url.params.id){
                return parseInt(url.params.id)
            }
        }
    }, [url])

    const name = useMemo(() => {
        if(url && url.params){
            return url.params.name
        }
    }, [url])

    const resetPwd = async() =>{
        if(id){
           const res = await request(userService.ResetUserPwd({ id }, {}));
           if(res.isSuccess){
               setNewPwd(res.result as string)
           }
        }
    }
    const onReturn = ()=>{
        historyService.push('/'+page)
    }

    return <section key={id}>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>
                <Link to= {"/"+page}>
                    <HomeOutlined />
                    <span style={{marginLeft: 5}}>
                        {page==="customer"?'客户管理':'销售部门'}
                    </span>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                客户: {name}
            </Breadcrumb.Item>
        </Breadcrumb>
        <h4 style={{marginTop:30,marginBottom:20}}>重置密码</h4>
        {newPwd ?
            <TipBox type="success" title="重置密码成功" >
                <span onDoubleClick={()=>copy(newPwd)}>{newPwd}</span>
                <IconFont type="iconwendangfuzhi" onClick={()=>copy(newPwd)} />
            </TipBox>:
            <TipBox type="warning" title="提示" >
                确认为<b>{name}</b>重置密码？
            </TipBox>
        }
        {
            newPwd ?<Button onClick={onReturn}>返回</Button>:
                <>
                    <Button type="primary" onClick={resetPwd}>应用</Button>
                    <Button style={{marginLeft:15}} onClick={onReturn}>取消</Button>
                </>
        }
    </section>
}

export default ResetPwdPage;
