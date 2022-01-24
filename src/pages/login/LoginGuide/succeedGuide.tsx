import { Button, Layout, Space } from "antd";
import React, { FC } from "react";
import useRemoveSide from "@/hooks/useRemoveSide";
import { FormattedMessage } from "react-intl";
import "./style/succeedGuide.less";
import { CheckCircleTwoTone } from "@ant-design/icons";
import accountService from "@/store/account/service";
import { IBasicInfo } from "@/store/account/interface";
import { useCallback } from "react";
import toolService from "@/store/tools";
const ChangePwd: FC<{ status?: number }> = ({ status }) => {
    useRemoveSide();
    const ChangPwdStatus = useCallback(() => {
        accountService.info$.next({
            ...accountService.info$.value as IBasicInfo,
            pwdStatus: 0
        })
    }, []);
    return (
        <Layout className="succeed-guide-page">
            <section className="succeed-guide-main-con">
                <header>
                    <FormattedMessage id="WELCOME_TO_THE_GREYPANEL_ACCOUNT" />
                </header>
                <div style={{ textAlign: "center" }} className="mgTop25">
                    <CheckCircleTwoTone
                        style={{ fontSize: 86 }}
                        twoToneColor="#62CA32"
                    />
                    <p className="mgTop15">
                        <FormattedMessage id="LOGIN_SUCCESSFULLY" />
                    </p>
                </div>
                <div className="succeed-guide-tip-con mgTop15">
                    <p className="textAlignCenter" style={{ fontWeight: 550 }}>
                        <FormattedMessage id="SECURITY_WARNING" />
                    </p>
                    <p className="mgTop15">
                        <FormattedMessage id="WELCOME_TO_THE_GREYPANEL_INFO_TEXT1" />
                    </p>
                    <div style={{ textAlign: "center", marginTop: 60 }}>
                        <Space size="large" align="center">
                            <Button
                                onClick={ChangPwdStatus}
                                disabled={status === 2}
                                className="succeed-guide-btn succeed-guide-btn-next"
                                htmlType="submit">
                                <FormattedMessage id={"TALK_TO_YOU_LATER"} />
                            </Button>

                            <Button
                                className="succeed-guide-btn succeed-guide-btn-succeed"
                                htmlType="reset"
                                onClick={() => toolService.goPage("/modify-passWord")}
                            >
                                <FormattedMessage id={"IMMEDIATELY_CHANGE"} />
                            </Button>
                        </Space>
                    </div>
                </div>

            </section>
        </Layout>
    );
};
export default ChangePwd;