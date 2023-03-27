import {Form, Input, Button, notification} from "antd";
import React, { FC } from "react";
import "./form.less";
import {authService} from "@/store/apis/account";
import {from} from "rxjs";
import request from "@/store/request";
import forge from "node-forge"
import {rsaPublic} from "@/pages/login/rsa_public";
import isMobile from "@/app/isMobile";
import {validateEmail} from "@/common/utils";
import {useHistory} from "react-router-dom";
const publicKey = forge.pki.publicKeyFromPem(rsaPublic);

// 密码加密
export function encrypt(password: string){
    return forge.util.encode64(publicKey.encrypt(password, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    }))
}

const SignUpForm: FC = () => {
    const history = useHistory()
    const submitEvent = (data:any)=>{
        const {email,password,confirmPassword}=data
        if (!email ){
            notification.error({message:"Username cannot be empty!"})
            return
        }
        if (!password){
            notification.error({message:"Password cannot be empty!"})
            return
        }
        if (!confirmPassword){
            notification.error({message:"Confirmation password cannot be empty!"})
            return
        }
        if (password!==confirmPassword){
            notification.error({message:"The confirmation password does not match the password！"})
            return
        }
        if (!validateEmail(email)){
            notification.error({message:"Email format Error"})
            return
        }
        from(request<string>(authService.Regist({}, {...data,name:randomString(6)}))).subscribe(res => {
            if (res.isSuccess){
                notification.success({message:"Register Success"})
                history.push('/login')
            }
        })

    }
    // const submitClick = useSubmitEvent(submitEvent);
    return (
        <section className={isMobile?"mobile-login-form":"page-login-form"}>
            <Form layout="vertical" className="comp-form-lg" onFinish={submitEvent}>
                <div className='login-title'>Sign Up</div>
                <Form.Item name="email" label={<span className="login-label">Email</span>}>
                    <Input style={{height:40}}/>
                </Form.Item>
                <Form.Item name="password" label={<span className="login-label">Password</span>}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="confirmPassword" label={<span className="login-label">Confirm Password</span>}>
                    <Input.Password />
                </Form.Item>
                <div className="submit">
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        style={{ width: "100%",fontWeight:550}}>
                        Submit
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default SignUpForm;

function randomString(length:number) {
    const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
        result += str[Math.floor(Math.random() * str.length)];
    return result;
}
