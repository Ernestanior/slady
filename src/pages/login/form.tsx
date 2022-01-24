import { Form, Input, Row, Col, notification } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import React, { FC, useCallback, useRef, useState } from "react";
import Logo from "./images/logo.png";
import LoadingGif from "./images/loading-2.gif";
import "./form.less";
import ReCAPTCHA from "react-google-recaptcha"
import ConditionShow from "@/common/conditionShow";
import {authService} from "@/store/apis/account";
import useSubmitEvent from "@/hooks/utils/useSubmitEvent";
import {from} from "rxjs";
import request from "@/store/request";
import accountService from "@/store/account/service";

const { grecaptcha } = window as any;

const LoginForm: FC = () => {
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginErrorInfo] = useState("");
    const [form] = Form.useForm();
    // 需要recaptcha
    const [needRecaptcha, setNeedRecaptcha] = useState(false);
    const [recaptcha, setRecaptcha] = useState<string | null>(null);

    const recaptchaRef = useRef<ReCAPTCHA>(null)
    // 登录事件
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
        setLoginErrorInfo("");
        setLoading(true);
        const _data = {
            ...data,
            code: recaptcha
        }
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
                        setLoginErrorInfo(message);
                        setLoading(false);
                    })
                }
            } else if (!res.isSuccess && res.message) {
                setLoginErrorInfo(res.message);
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
        <section className="page-login-form">
            <Form layout="vertical" form={form} className="comp-form-lg">
                <ConditionShow className="login-loading-container" visible={loading}>
                    <div className="login-loading">
                        <img src={LoadingGif} alt="loading" />
                        <span>Login in progress</span>
                    </div>
                </ConditionShow>
                <Row>
                    <Col span={4} />
                    <Col span={16}>
                        <div style={{ cursor: 'pointer' }} onClick={() => {
                            return window.open("https://www.greypanel.com/")
                        }} >
                            <img className="logo" src={Logo} alt="log" />
                        </div>
                    </Col>
                    <Col span={4} />
                </Row>
                <div className="content">
                    <Form.Item className="username" name="username">
                        <Input
                            autoComplete="username"
                            placeholder="请输入登录邮箱"
                            bordered={false}
                        />
                    </Form.Item>
                    <div className="password">
                        <Form.Item name="password">
                            <Input
                                autoComplete="current-password"
                                className="pwd"
                                bordered={false}
                                placeholder="密码"
                                type="password"
                                onPressEnter={() => {
                                    if(!needRecaptcha || !!recaptcha){
                                        submitEvent();
                                    }
                                }}
                            />
                        </Form.Item>
                        <LoginOutlined
                            className="submit"
                            onClick={submitClick}
                        />
                    </div>
                </div>
            </Form>
            <ConditionShow className="login-recaptcha" visible={needRecaptcha}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Len070UAAAAANcYoOOVcaJI64aHuLO3oiChRz9u"
                    grecaptcha={grecaptcha}
                    onChange={(token) => {
                        setRecaptcha(token)
                    }}
                />
            </ConditionShow>
            <div hidden={!loginError} className="login-info">
                {loginError}
            </div>
        </section>
    );
};

export default LoginForm;
