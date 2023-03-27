import React, {FC} from "react";
import Logo from "@/common/layout/header/logo.svg";
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
            {/*{isMobile&&<div className="fix-foot">Copyright ©{moment().format("YYYY")} Greypanel. All Rights Reserved.</div>}*/}
        </section>
  );
};

export default Login;
