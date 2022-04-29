import { Button, Form, Input, Layout } from "antd";
import React, { FC } from "react";
import "./index.less";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useCallback } from "react";
import accountService from "@/store/account/service";
import FormItem from "@/common/Form/formItem";
import {authService} from "@/store/apis/account";
import {from} from "rxjs";
import request from "@/store/request";

const DualAuth2FAGuide: FC = () => {
    const verifySubmit = useCallback((data) => {
        const config = authService.validateTwoFactorPin({}, data);
        from(request(config)).subscribe(res => {
            if(res.isSuccess){
                accountService.reset2FAuth();
            }
        })
    }, []);

    return (
        <Layout className="succeed-guide-page">
            <section className="succeed-guide-main-con">
                <header>
                    欢迎登录Greypanel帐户
                </header>
                <div style={{ textAlign: "center" }} className="mgTop25">
                    <CheckCircleTwoTone
                        style={{ fontSize: 86 }}
                        twoToneColor="#62CA32"
                    />
                    <p className="mgTop15">
                        登录成功
                    </p>
                </div>
                <div className="dual-auth-2fa-con mgTop15">
                    <p style={{ fontWeight: 550, textAlign: "center" }}>
                        双重认证（2FA）
                    </p>
                    <Form onFinish={verifySubmit} className="mgTop25">
                        <FormItem name="pin" label="双重认证代码">
                            <Input />
                        </FormItem>
                        <p style={{ fontSize: 14, color: "#ccc", textAlign: "left", }}>
                            在移动设备上输入双重认证的程序代码
                        </p>
                        <div className={'faBtn'}>
                            <Button htmlType="submit">
                                认证代码
                            </Button>
                            <Button className={'btn-return'} htmlType="submit" onClick={() => accountService.autoLogout()}>
                                返回
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
        </Layout>
    );
};
export default DualAuth2FAGuide;