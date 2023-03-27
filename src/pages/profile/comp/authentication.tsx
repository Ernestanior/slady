import React, {FC, useCallback, useState} from "react";
import {Button, Input, notification} from "antd";
import './index.less'
import useAccountInfo from "@/store/account";
import {adminService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import accountService from "@/store/account/service";
const Preference: FC = () => {
    const [oldPassword,setOldPass] = useState<string>("")
    const [password,setNewPass] = useState<string>("")
    const [confirmPwd,setConfirmPwd] =useState<string>("")
    const userInfo = useAccountInfo();
    const onSubmit=useCallback(async ()=>{
        if(password !== confirmPwd){
            notification.error({message:"Confirm password not match"})
            return
        }
        if (userInfo){
            const config = adminService.UserModifyPwd({},{id:userInfo.id,password,oldPassword})
            reqAndReload(config, () => {
                accountService.reloadInfo();
                setOldPass("")
                setNewPass("")
                setConfirmPwd("")
            });
        }
    },[oldPassword,password,confirmPwd,userInfo])
    return (
        <section className="profile-card-container">
            <div className="profile-card-input">
                <span style={{display:"inline-block",width:150}}>Old Password</span>
                <Input.Password visibilityToggle={false} style={{width:250,margin:"0 20px"}} onChange={(e)=>setOldPass(e.target.value)}/>
            </div>
            <div className="profile-card-input">
                <span style={{display:"inline-block",width:150}}>New Password</span>
                <Input.Password visibilityToggle={false} style={{width:250,margin:"0 20px"}} onChange={(e)=>setNewPass(e.target.value)}/>
            </div>
            <div className="profile-card-input">
                <span style={{display:"inline-block",width:150}}>Confirm Password</span>
                <Input.Password visibilityToggle={false} style={{width:250,margin:"0 20px"}} onChange={(e)=>setConfirmPwd(e.target.value)}/>
            </div>
            <Button type="primary" onClick={onSubmit}>Submit</Button>
        </section>
    );
};

export default Preference;

