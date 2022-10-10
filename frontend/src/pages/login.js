import React from "react";
import loginForm from "../components/loginForm";
import '../index.css';
const Login = () => {
    return (
        <div className="content-center">
            <h1>Log in</h1>
            <loginForm />
        </div>
    );
};

export default Login;