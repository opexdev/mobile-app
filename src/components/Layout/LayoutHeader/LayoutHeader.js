import React from 'react';
import classes from './LayoutHeader.module.css'
import Icon from "../../Icon/Icon";
import {setMarketInterval, showSideMenu} from "../../../store/actions/global";
import {Link, NavLink, Route, Routes, useLocation, useParams} from "react-router-dom";
import * as RoutesName from "../../../main/Mobile/Routes/routes";
import {toAbsoluteUrl} from "../../../utils/utils";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";


const LayoutHeader = () => {

    const {t} = useTranslation();

    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    const location = useLocation();

    const interval = useSelector((state) => state.global.marketInterval)


    return (
        <div className={`${classes.container} width-100 row jc-between ai-center`}>
            <div className={`width-90 height-100 m-auto row jc-between ai-center`}>

                <div className={`column ai-start width-20`}>

                    <Icon iconName="icon-menu_vertical fs-04 flex" onClick={()=>dispatch(showSideMenu(true))}/>
                </div>





                <div className={`width-60 text-center`}>
                    <Routes>
                        <Route path={RoutesName.Landing} element={<h3>{t("Landing.title")}</h3>}/>
                        <Route path={RoutesName.Commission} element={<h3>{t("commissions.title")}</h3>}/>
                        <Route path={RoutesName.AboutUs} element={<h3>{t("aboutUs.title")}</h3>}/>
                        <Route path={RoutesName.TransferFees} element={<h3>{t("transferFees.title")}</h3>}/>
                        <Route path={RoutesName.Guide} element={<h3>{t("guide.title")}</h3>}/>
                        <Route path={RoutesName.Rules} element={<h3>{t("rules.title")}</h3>}/>
                        <Route path={RoutesName.ContactUs} element={<h3>{t("contactUs.title")}</h3>}/>
                        <Route path={RoutesName.AllMarket} element={<div className={`row jc-center ai-baseline`}>
                            <h2 className={`ml-2`}>{t("market.title")}</h2>
                            <div className={`mr-2 fs-0-8`}>
                                <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${interval === "24h" && classes.active}`} onClick={()=>dispatch(setMarketInterval("24h"))}>{t("marketIntervalMini.24h")}</span>
                                <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${interval === "7d" && classes.active}`} onClick={()=>dispatch(setMarketInterval("7d"))}>{t("marketIntervalMini.7d")}</span>
                                <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${interval === "1M" && classes.active}`} onClick={()=>dispatch(setMarketInterval("1M"))}>{t("marketIntervalMini.1M")}</span>
                            </div>
                        </div>}/>
                    </Routes>
                </div>


                <div className={`flex jc-end ai-center width-20`}>
                    <Link to={RoutesName.Landing}>
                        <img src={toAbsoluteUrl('/assets/logo/logo-mini.svg')} alt={t("title")} title={t("title")} className={`img-lg-plus flex`}/>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default LayoutHeader;
