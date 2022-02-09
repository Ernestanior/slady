import {FC} from "react";
import "./context.less";
import LoginForm from "@/pages/login/form";

const LoginContext:FC = () => {
    return <section className="page-login">
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
    </section>
}

export default LoginContext
