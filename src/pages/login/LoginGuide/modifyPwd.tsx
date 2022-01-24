import { Button, Form, Input, Layout, notification, Space } from "antd";
import React, { FC, useCallback, useEffect, useState } from "react";
import useRemoveSide from "@/hooks/useRemoveSide";
import "./style/index.less"
import FormItem from "@/common/form/item";
import useIntlDep from "@/common/intl/useIntlDep";
import { reqAndRunCallback } from "@/common/utilsx";
import { FormattedMessage } from "react-intl";
import IntlDep from "@/common/intl";
import TipBox from "@/common/tip";
import API from "@/store/apis/account/user";
import { useForm } from "antd/lib/form/Form";
import { IBasicInfo } from "@/store/account/interface";
import accountService from "@/store/account/service";
const apiService = new API();
const ChangePwd: FC = () => {
    useRemoveSide();
    const [form] = useForm();
    const loadtext = useIntlDep();
    const [pwdisSame, setPwdisSame] = useState(false);
    const onFinish = useCallback((data) => {
        if (data.oldPwd && data.newPwd && data.confirmPwd) {
            if (data.newPwd !== data.confirmPwd) {
                setPwdisSame(true);
                notification.error({
                    message: loadtext({ id: "BOTH_PWD_ARE_NOT_EQUIVILENT" })
                });
                return;
            }
            const config = apiService.ModifyPwd({}, data);
            reqAndRunCallback(config, () => {
                form.setFieldsValue({
                    oldPwd: "",
                    newPwd: "",
                    confirmPwd: "",
                });
                console.log(123);
                setTimeout(() => {
                    //登录成功后修改内存的pwdStatus状态，跳转到首页
                    accountService.info$.next({
                        ...accountService.info$.value as IBasicInfo,
                        pwdStatus: 0
                    })
                }, 1500);
            });
        }
    }, [loadtext, form]);
    useEffect(() => {
        form.setFieldsValue({
            oldPwd: "",
            newPwd: "",
            confirmPwd: "",
        })
    }, [form]);
    const onFieldsChange = useCallback((data) => {
        if (data.confirmPwd || data.newPwd) {
            setPwdisSame(false);
        }
    }, []);
    return (
        <Layout className="change-pwd-page">
            <section className="change-pwd-main-con">
                <header>
                    <FormattedMessage id="ACCOUNT_ACTIONS_SETTING_PASSWORD_MODIFY" />
                </header>
                <div className="change-pwd-form-con">
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        onFieldsChange={onFieldsChange}
                    >
                        <div className="mgTop25">
                            <FormItem label="CURRENT_PASSWORD" name="oldPwd">
                                <Input.Password size="large" />
                            </FormItem>
                            <FormItem label="NEW_PASSWORD" name="newPwd">
                                <Input.Password size="large" />
                            </FormItem>
                            <FormItem
                                validateStatus={pwdisSame ? "error" : undefined}
                                label="CONFIM_PASSWORD"
                                name="confirmPwd"
                            >
                                <Input.Password size="large" />
                            </FormItem>
                        </div>
                        <div className="mgTop25">
                            <TipBox>
                                <p>
                                    1. <IntlDep id="PASSWORD_SUGGESTION" />:<br />
                                    &emsp;- <IntlDep id="LENGTH_BETWEEN_8_16" />
                                    <br />
                                    &emsp;- <IntlDep id="INCLUDE_UPPER_LOWER_CASE" />(A...Z, a...z)
                                    <br />
                                    &emsp;- <IntlDep id="INCLUDE_ARAB_NUMBER" />
                                    <br />
                                    &emsp;- <IntlDep id="ATLEAST_ONE_SPECIAL_CHAR" />( <IntlDep id="EXAMPLE" /> ! @ # $ *)
                                </p>
                                <p>2. <IntlDep id="RECOMMEND_NEW_PWD_NOT_INCLUDE_USERNAME" />;</p>
                                <p>
                                    3.
                                    <IntlDep id="SYSTEM_WONT_FORCE_DESCRIPTION_0" />
                                </p>
                            </TipBox>
                        </div>
                        <div className="mgTop25" style={{ textAlign: "center" }}>
                            <Space size="large" align="center">
                                <Button htmlType="submit">
                                    <FormattedMessage id={"APPLY"} />
                                </Button>
                                <Button htmlType="reset">
                                    <FormattedMessage id={"CANCEL"} />
                                </Button>
                            </Space>
                        </div>

                    </Form>
                </div>
            </section>
        </Layout>
    );
};
export default ChangePwd;