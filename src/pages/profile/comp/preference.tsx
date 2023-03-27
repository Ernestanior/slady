import React, {FC, useCallback, useState} from "react";
import {Input} from "antd";
import './index.less'
import useAccountInfo from "@/store/account";
import {CheckOutlined, CloseOutlined, EditFilled} from "@ant-design/icons";
import {adminService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import accountService from "@/store/account/service";
const Preference: FC = () => {
    const [edit,setEdit]=useState<boolean>(false)
    const [email,setEmail] = useState<string>("")
    const userInfo = useAccountInfo();
    const onSubmit=useCallback(async ()=>{
        if (userInfo){
            const config = adminService.UserModify({},{id:userInfo.id,email})
            reqAndReload(config, () => {
                accountService.reloadInfo();
                setEdit(false)
            });
        }
    },[email,userInfo])
    return (
        <section className="profile-card-container">
            <div className="profile-card-input">
                <span style={{display:"inline-block",width:150}}>Email</span>
                {edit?
                    <Input defaultValue={userInfo?.email} style={{width:250,margin:"0 20px"}} onChange={(e)=>setEmail(e.target.value)}/>:
                    <span style={{display:"inline-block",width:250,margin:"0 20px"}}>{userInfo?.email}</span>}
                {edit?<>
                        <CheckOutlined style={{color:"#1b4481",cursor:"pointer"}} onClick={onSubmit}/>
                        <CloseOutlined style={{marginLeft:20,color:"#1b4481",cursor:"pointer"}} onClick={()=>setEdit(false)}/>
                    </>:
                    <EditFilled style={{color:"#1b4481",cursor:"pointer"}} onClick={()=>setEdit(true)}/>}
            </div>
        </section>
    );
};

export default Preference;

