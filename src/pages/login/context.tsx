import React, {FC} from "react";
import "./context.less";
import isMobile from "@/app/isMobile";
import LoginForm from "@/pages/login/form";
import moment from "moment";

const LoginContext:FC = () => {
    return <section className={isMobile?"mobile-login":"page-login"}>
        <div className="left">
            <div className="text">
                <div className="title">
                    Where Network Security Happens
                </div>
                <div className="text-1">
                    Provide Network Security Service and Internet Solutions
                </div>
                <div className="text-2">
                    Your
                    <em> Asia Pacific Cybersecurity Expert</em>
                </div>
            </div>
            <div className="cover" />
        </div>
        <div className="right">
            <LoginForm />
        </div>
        {isMobile&&<div className="fix-foot">Copyright ©{moment().format("YYYY")} Greypanel. All Rights Reserved.</div>}

    </section>
}

export default LoginContext
