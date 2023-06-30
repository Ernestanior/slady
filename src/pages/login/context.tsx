import React, {FC} from "react";
import "./context.less";
import isMobile from "@/app/isMobile";
import LoginForm from "@/pages/login/form";
import Logo from "@/common/layout/header/logo.png";

const LoginContext:FC = () => {
    return <section className={isMobile?"mobile-login":"page-login"}>
        <nav className='comp-header'>
            <img className="logo" src={Logo} alt="logo" />
        </nav>
        <LoginForm />
    </section>
}

export default LoginContext
