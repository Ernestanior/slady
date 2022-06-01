import {FC, useCallback} from "react";
import CardDetail from "@/pages/userInfo/components/cardDetail";
import {KeyOutlined} from "@ant-design/icons";
import {userService} from "@/store/apis/account";
import request from "@/store/request";
import MdyPwdForm from "@/pages/userInfo/modifyPassword/form";
import {encrypt} from "@/pages/login/form";

const ModifyPassword:FC = () => {
    const submit = useCallback( async (data: any) => {
        if(data.newPwd !== data.confirmPwd){
            return  {
                isSuccess: false
            }
        }
        console.log(data)
        // 加密密码
        data.newPwd = encrypt(data.newPwd);
        data.confirmPwd = encrypt(data.confirmPwd);
        data.oldPwd = encrypt(data.oldPwd)
        const config = userService.ModifyPwd({}, data);
        return request(config);
    }, [])
    return <CardDetail
        icon={<KeyOutlined style={{ fontSize: "2em" }} />}
        text="修改密码"
        submit={submit}
    >
        <MdyPwdForm />
    </CardDetail>
}

export default ModifyPassword
