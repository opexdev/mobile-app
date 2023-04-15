import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import i18n from "i18next";
import {Toaster} from "react-hot-toast";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import {loadConfig, setInfoMessage, setUserAccountInfoInitiate} from "../../store/actions";
import "./Browser.css"
import useQuery from "../../Hooks/useQuery";
import useInterval from "../../Hooks/useInterval";
import {setLastPriceInitiate} from "../../store/actions/exchange";
import FullWidthError from "../../components/FullWidthError/FullWidthError";
import {useNavigate} from "react-router-dom";


const Browser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const query = useQuery();


    const isDark = useSelector((state) => state.global.isDark)
    const isLoading = useSelector((state) => state.global.isLoading)
    const hasError = useSelector((state) => state.global.hasError)
    const isLogin = useSelector((state) => state.auth.isLogin)

    isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark');

    useEffect(() => {
        const impersonate = query.get("impersonate");
        dispatch(loadConfig(impersonate))
        i18n.language !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        });

        window.addEventListener('offline', () => dispatch(setInfoMessage(null, "offline")));
        window.addEventListener('online', () => dispatch(setInfoMessage(null, null)));
        return () => {
            window.removeEventListener('offline', () => dispatch(setInfoMessage(null, "offline")));
            window.removeEventListener('online', () => dispatch(setInfoMessage(null, null)));
        }
    }, []);


    const redirectURL = window.env.REACT_APP_REDIRECT_URL

    const redirectFunc = () => {
        window.location.replace(redirectURL);
    };

    useEffect(()=>{
        redirectFunc()
    }, [])



    useInterval(() => {
        dispatch(setUserAccountInfoInitiate());
    }, isLogin ? 3000 : null)

    useInterval(() => {
        dispatch(setLastPriceInitiate());
    }, 3000)

    const Toast = () => <Toaster position="bottom-right" toastOptions={
        {
            className: "rtl",
            style: {
                padding: "0.3vh 0.8vw 0.3vh 0",
                color: "white",
                lineHeight: "3vh",
                fontSize: "0.8vw",
                borderRadius: "4px",
                background: "var(--mainContent)",
            },
            success: {
                style: {
                    background: "var(--darkGreen)",
                },
            },
            error: {
                style: {
                    background: "var(--darkRed)",
                },
            },
            custom: {
                style: {
                    background: "var(--Orange)",
                },
            },
        }} containerStyle={{}}/>

    if (isLoading) {
        return <FullWidthLoading/>
    }
    if (hasError) {
        return <FullWidthError/>
    }




    return (
        <div className={`flex jc-center ai-center card-header-bg text-color fs-04`} style={{height: "100vh", direction:"ltr"}}>

            Open in Mobile ...

        </div>
    );
};

export default Browser;