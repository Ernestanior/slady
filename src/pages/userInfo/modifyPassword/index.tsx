import {FC, useCallback} from "react";
import CardDetail from "@/pages/userInfo/components/cardDetail";
import {KeyOutlined} from "@ant-design/icons";
import {userService} from "@/store/apis/account";
import request from "@/store/request";
import MdyPwdForm from "@/pages/userInfo/modifyPassword/form";

const ModifyPassword:FC = () => {
    const submit = useCallback( async (data: any) => {
        if(data.newPwd !== data.confirmPwd){
            return  {
                isSuccess: false
            }
        }
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
