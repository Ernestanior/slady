import {Form, Input, notification, Button} from "antd";
import React, { FC, useCallback, useRef, useState } from "react";
import LoadingGif from "./images/loading-2.gif";
import "./form.less";
import ReCAPTCHA from "react-google-recaptcha"
import ConditionShow from "@/common/conditionShow";
import {authService} from "@/store/apis/account";
import useSubmitEvent from "@/hooks/utils/useSubmitEvent";
import {from} from "rxjs";
import request from "@/store/request";
import accountService from "@/store/account/service";
import forge from "node-forge"
import {rsaPublic} from "@/pages/login/rsa_public";
import isMobile from "@/app/isMobile";
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


const { grecaptcha } = window as any;

const LoginForm: FC = () => {
    const [loading, setLoading] = useState(false);
    // const [loginError, setLoginErrorInfo] = useState("");
    const [form] = Form.useForm();
    // 需要recaptcha
    const [needRecaptcha, setNeedRecaptcha] = useState(false);
    const [recaptcha, setRecaptcha] = useState<string | null>(null);

    const recaptchaRef = useRef<any>(null)
    const login = useCallback((data: any) => {
        if (loading) {
            return;
        }
        if (needRecaptcha && !recaptcha) {
            notification.error({
                message: "请先通过recaptcha验证!"
            })
            return;
        }
        // setLoginErrorInfo("");
        setLoading(true);
        const _data = {
            ...data,
            code: recaptcha
        }
        // _data.password = encrypt(_data.password)
        // 请求网络
        from(request<string>(authService.Login({},_data))).subscribe(res => {
            let finish = true;
            if (res.isSuccess && res.result) {
                // needRecaptcha
                if (res.result === "recaptcha") {
                    setNeedRecaptcha(true);
                } else {
                    finish = false
                    accountService.loadToken(res.result, (message: string) => {
                        // 角色身份不对，设置错误
                        // setLoginErrorInfo(message);
                        setLoading(false);
                    })
                }
            } else if (!res.isSuccess && res.message) {
                // setLoginErrorInfo(res.message);
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
            }
            if(finish){
                // 关闭loading
                setLoading(false);
            }
        })
    }, [needRecaptcha, recaptcha, loading, recaptchaRef]);

    const submitEvent = useCallback(
        () => {
            const data = form.getFieldsValue();
            login(data);
        },
        [form, login]
    );
    const submitClick = useSubmitEvent(submitEvent);
    return (
        <section className={isMobile?"mobile-login-form":"page-login-form"}>
            <Form autoComplete="off" layout="vertical" form={form} className="comp-form-lg">
                <ConditionShow className="login-loading-container" visible={loading}>
                    <div className="login-loading">
                        <img src={LoadingGif} alt="loading" />
                        <span>Login in progress</span>
                    </div>
                </ConditionShow>
                <div className='login-title'>Login</div>
                {/*<span className='sign-up' onClick={goSignUp}>*/}
                {/*    <Link to='/signup' className="login-signup-btn">Dont`t have an account?</Link>*/}
                {/*</span>*/}
                <Form.Item name="name" label={<span className="login-label">Username</span>}>
                    <Input style={{height:40}} />
                </Form.Item>
                <Form.Item name="password" label={<span className="login-label">Password</span>}>
                    <Input.Password
                        onPressEnter={() => {
                            if(!needRecaptcha || !!recaptcha){
                                submitClick();
                            }
                        }}
                    />
                </Form.Item>
                <ConditionShow className="login-recaptcha" tOption="flex" visible={needRecaptcha}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6Len070UAAAAANcYoOOVcaJI64aHuLO3oiChRz9u"
                        grecaptcha={grecaptcha}
                        onChange={(token) => {
                            setRecaptcha(token)
                        }}
                    />
                </ConditionShow>
                <div className="submit">
                    <Button
                        type="primary"
                        size="large"
                        style={{ width: "100%",fontWeight:550}}
                        onClick={() => {
                        if(!needRecaptcha || !!recaptcha){
                            submitClick();
                        }
                    }}>
                        Login
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default LoginForm;
