import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadConfig, setInfoMessage, setUserAccountInfoInitiate} from "../../store/actions";
import "./Styles/Mobille.css";
import {Route, Routes} from "react-router-dom";
import FullWidthLoading from "../../components/FullWidthLoading/FullWidthLoading";
import ReactTooltip from "react-tooltip";
import * as RoutesName from "./Routes/routes";
import i18n from "i18next";
import useQuery from "../../Hooks/useQuery";
import useInterval from "../../Hooks/useInterval";
import {setLastPriceInitiate} from "../../store/actions/exchange";
import {Toaster} from "react-hot-toast";
import FullWidthError from "../../components/FullWidthError/FullWidthError";
import Login from "./Pages/Login/Login";
import User from "./Pages/User/User";
import Landing from "./Pages/Landing/Landing";
import AllMarket from "./Pages/AllMarket/AllMarket";
import Guide from "./Pages/Guide/Guide";
import UserPanel from "./Pages/UserPanel/UserPanel";
import SideMenu from "../../components/SideMenu/SideMenu";


const Mobile = () => {

    const dispatch = useDispatch();
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
        <div className={`mobile-container`}>
            <Routes>
                <Route path={RoutesName.Login} element={<Login/>}/>
                <Route path={RoutesName.User + "/*"} element={<User/>}/>
                <Route path={RoutesName.Landing} element={<Landing/>}/>
                <Route path={RoutesName.AllMarket} element={<AllMarket/>}/>
                <Route path={RoutesName.Guide} element={<Guide/>}/>
                <Route path={RoutesName.Panel + "/*"} element={<UserPanel/>}/>
            </Routes>

            <ReactTooltip data-html={true} data-effect="float"/>
            <Toast/>
            <SideMenu/>

        </div>
    );
};

export default Mobile;
