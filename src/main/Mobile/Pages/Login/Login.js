import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import classes from "./Login.module.css";
import {images} from "../../../../assets/images";
import AccordionBox from "../../../../components/AccordionBox/AccordionBox";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";


const Login = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const isLogin = useSelector((state) => state.auth.isLogin)
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (isLogin) navigate(from, {replace: true});
    }, [])

    const data = [
        {
            id: 1,
            title: t('signIn'),
            body: <LoginForm/>
        },
        {id: 2, title: t('signUp'), body: <RegisterForm/>},
    ];

    return (
        <div className={`width-100 flex  ai-center jc-center px-1 ${classes.container}`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <div className={`${classes.content}`}>
                <AccordionBox title={t('login.title')} content={data}/>
            </div>
        </div>
    );
};

export default Login;