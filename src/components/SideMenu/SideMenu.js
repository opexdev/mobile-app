import React, {useEffect} from 'react';
import classes from './SideMenu.module.css'
import Icon from "../Icon/Icon";
import {useDispatch, useSelector} from "react-redux";
import {setThemeInitiate, showSideMenu} from "../../store/actions/global";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";
import {setLogoutInitiate} from "../../store/actions";
import {toast} from "react-hot-toast";
import {logout} from "js-api-client";
import {images} from "../../assets/images";
import i18n from "i18next";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import *  as Routes from "../../main/Mobile/Routes/routes";
import {toAbsoluteUrl} from "../../utils/utils";
import packageJson from "../../../package.json"


const SideMenu = () => {

    const {t} = useTranslation();
    const isDark = useSelector((state) => state.global.isDark)
    const dispatch = useDispatch();
    const open = useSelector((state) => state.global.showSideMenu)
    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    let location = useLocation();

    const languages = window.env.REACT_APP_LANGS_SUPPORT.split(",")

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const logOutHandler = async () => {
        logout().then(()=>{
            toast.success(t("header.logOutSuccess"))
            dispatch(setLogoutInitiate())
        }).catch(()=>{
            toast.error(t("header.logOutError"));
        })
    }

    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang)
        dispatch(showSideMenu(false))
    }

    return (
        <>
            <div className={`width-100 ${classes.wrapper} ${open ? classes.show : classes.hide}`} onClick={()=>dispatch(showSideMenu(false))}/>
            <div className={`width-100 ${classes.container} ${open ? classes.show : classes.hide} column jc-between ai-center px-5 py-4`}>
                <div className={`column jc-between ai-center width-100`}>
                    <div className={`row jc-start ai-start width-100`} style={{height: "20%"}}>
                        <div className={`column jc-between ai-start width-60`}>
                            {firstName === null ? (
                                <Link to={Routes.Login} state={{from: location}} className="hover-text" onClick={()=>dispatch(showSideMenu(false))}>
                                    <h3>{t("signIn")} | {t("signUp")}</h3>
                                </Link>
                            ) : (
                                <>
                                    <h2 className="mb-05">{firstName}</h2>
                                    <h2 className={`mt-05`}>{lastName}</h2>
                                </>
                            )}
                        </div>
                        <div className={`row jc-end width-40`}>
                            {isLogin ? (
                                <img
                                    className="img-sm cursor-pointer"
                                    src={images.signOut}
                                    alt={t("signOut")}
                                    onClick={logOutHandler}
                                />
                            ) : (
                                <Link to={Routes.Login} state={{from: location}} className="flex" onClick={()=>dispatch(showSideMenu(false))}>
                                    <img
                                        className="img-sm cursor-pointer"
                                        src={images.signIn}
                                        alt={t("signIn")}
                                    />
                                </Link>
                            )}
                            <Link to="/" state={{from: location}} className="flex" onClick={()=>dispatch(showSideMenu(false))}>
                                <img
                                    className="img-sm cursor-pointer mr-2"
                                    src={images.home}
                                    alt={t("signIn")}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`width-100`} style={{borderTop: "1px solid var(--scrollBar)"}}/>
                <div className={`column width-100`} onClick={()=>dispatch(showSideMenu(false))} >
                    <Link to={Routes.Landing} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("home")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Overview} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("MarketTitle.advancedTrading")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.EasyTrading} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("MarketTitle.easyTrading")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.AllMarket} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("market.title")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.AboutUs} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("aboutUs.title")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.ContactUs} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("contactUs.title")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Commission} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("commissions.title")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.TransferFees} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("transferFees.title")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("guide.title")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Rules} className={`row jc-between ai-center my-05`}>
                        <span className="hover-text">{t("rules.title")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                </div>
                <div className={`width-100`} style={{borderTop: "1px solid var(--scrollBar)"}}/>
                <div className={`column jc-center ai-center width-100`}>
                    {languages?.length > 1 && <div className={`row ai-center my-3 ${classes.languages}`}>
                        {languages?.map((lang, index) => <span className="cursor-pointer px-2" onClick={() => changeLanguageHandler(lang)} key={index}>{t("Languages."+ lang)}</span>)}
                    </div>}
                    <div className={`row ai-center mb-2`}>
                        <span className={`ml-2`}>{t("Footer.darkMode")}:</span>
                        <ToggleSwitch onchange={(e) => dispatch(setThemeInitiate(e.target.checked))} checked={isDark}/>
                    </div>
                    <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")} className={`img-lg-1 mb-1 mt-2`}/>
                    <span className={`mt-1`}>{packageJson.version}</span>
                </div>
                {/*<Icon iconName="icon-cancel fs-05 flex" onClick={()=>dispatch(showSideMenu(false))}/>*/}
            </div>
        </>
    );
};

export default SideMenu;
