import React, {FC} from "react";
import "./context.less";
import isMobile from "@/app/isMobile";
import LoginForm from "@/pages/login/form";
import Logo from "@/common/layout/header/logo.svg";
import {Link} from "react-router-dom";

const LoginContext:FC = () => {
    return <section className={isMobile?"mobile-login":"page-login"}>
        <nav className='comp-header'>
            <img className="logo" src={Logo} alt="logo" />
            <Link to="/signup" className="login-signup-btn">Sign Up</Link>
        </nav>
        <LoginForm />
    </section>
}

export default LoginContext
