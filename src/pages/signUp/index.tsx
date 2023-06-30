import React, {FC} from "react";
import Logo from "@/common/layout/header/logo.png";
import SignupForm from "@/pages/signUp/form";
import {Link} from "react-router-dom";
const Login: FC = () => {

    return (
        <section className="page-login">
            <nav className='comp-header'>
                <img className="logo" src={Logo} alt="logo" />
                <Link to='/login' className="login-signup-btn">Login</Link>
            </nav>
            <SignupForm />
        </section>
  );
};

export default Login;
