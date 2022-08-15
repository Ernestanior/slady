import {FC, useCallback} from "react";
import CardDetail from "@/pages/userInfo/components/cardDetail";
import {userService} from "@/store/apis/account";
import request from "@/store/request";
import MdyPwdForm from "@/pages/userInfo/modifyPassword/form";
import {encrypt} from "@/pages/login/form";
import IconFont from "@/common/icon";

const ModifyPassword:FC = () => {
    const submit = useCallback( async (data: any) => {
        if(data.newPwd !== data.confirmPwd){
            return  {
                isSuccess: false
            }
        }
        // 加密密码
        data.newPwd = encrypt(data.newPwd);
        data.confirmPwd = encrypt(data.confirmPwd);
        data.oldPwd = encrypt(data.oldPwd)
        const config = userService.ModifyPwd({}, data);
        return request(config);
    }, [])
    return <CardDetail
        icon={<IconFont type="iconxiugaimima" style={{fontSize: "3.5em" }} />}
        text="修改密码"
        submit={submit}
    >
        <MdyPwdForm />
    </CardDetail>
}

export default ModifyPassword
