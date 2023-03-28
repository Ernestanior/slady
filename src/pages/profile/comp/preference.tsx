import React, {FC, useCallback, useState} from "react";
import {Input} from "antd";
import './index.less'
import useAccountInfo from "@/store/account";
import {CheckOutlined, CloseOutlined, EditFilled} from "@ant-design/icons";
import {adminService} from "@/store/apis/account";
import {reqAndReload} from "@/common/utils";
import accountService from "@/store/account/service";
import moment from "moment";
const Preference: FC = () => {
    const [edit,setEdit]=useState<boolean>(false)
    const [email,setEmail] = useState<string>("")
    const userInfo = useAccountInfo();

    const onSubmit=useCallback(async ()=>{
        const formData = new FormData()
        if (userInfo){
            formData.append('id', userInfo.id+"");
            formData.append('email', email);
            const config = adminService.UserModify({},formData as any)
            reqAndReload(config, () => {
                accountService.reloadInfo();
                setEdit(false)
            });
        }
    },[email,userInfo])
    console.log(userInfo)
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
            <div className="profile-card-input">
                <span style={{display:"inline-block",width:150,marginRight:20}}>Registration time</span> {moment(userInfo?.createDate).format("YYYY-MM-DD HH:mm:ss")}
            </div>
        </section>
    );
};

export default Preference;

