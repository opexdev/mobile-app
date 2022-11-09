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
import {logOut} from "../../main/Mobile/Pages/Login/api/auth";
import {images} from "../../assets/images";
import i18n from "i18next";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import *  as Routes from "../../main/Mobile/Routes/routes";
import {toAbsoluteUrl} from "../../utils/utils";



const SideMenu = () => {

    const {t} = useTranslation();
    const isDark = useSelector((state) => state.global.isDark)
    const dispatch = useDispatch();
    const open = useSelector((state) => state.global.showSideMenu)
    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)
    let location = useLocation();


    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const logOutHandler = async () => {
        logOut().then(()=>{
            toast.success(t("header.logOutSuccess"))
            dispatch(setLogoutInitiate())
        }).catch(()=>{
            toast.error(t("header.logOutError"));
        })
    }

    return (
        <>
            <div className={`width-100 ${classes.wrapper} ${open ? classes.show : classes.hide}`} onClick={()=>dispatch(showSideMenu(false))}/>
            <div className={`width-100 ${classes.container} ${open ? classes.show : classes.hide} column jc-between ai-center px-5 py-4`}>


                <div className={`column jc-between ai-center width-100`}  >
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

                        <div className={`row width-40`}>
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
                    <Link to={Routes.Guide + "#about-us"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.aboutUs")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#contact-us"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.contactUS")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#blog"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.blog")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#guides"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.guide")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#rules"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.rules")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#commission"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("commission")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#api"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.api")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#addCoin"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.addCoin")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#demo"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.demo")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>
                    <Link to={Routes.Guide + "#errorReport"} className={`row jc-between ai-center`}>
                        <span className="hover-text">{t("footer.errorReport")}</span>
                        <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open' : 'icon-left-open'} fs-0-6 flex`}/>
                    </Link>

                </div>

                <div className={`width-100`} style={{borderTop: "1px solid var(--scrollBar)"}}/>



                <div className={`column jc-center ai-center width-100`}>

                    <div className={`row ai-center ${classes.languages} my-3`}>
                        {
                            window.env.REACT_APP_MULTI_LANGS_SUPPORT === 'TRUE' && <>
                               <span className="cursor-pointer pl-2"
                                     onClick={() => i18n.changeLanguage("fa")}>{t("Languages.Persian")}</span>
                                <span className="cursor-pointer pr-2"
                                      onClick={() => i18n.changeLanguage("en")}>{t("Languages.English")}</span>
                            </>
                        }
                    </div>

                    <div className={`row ai-center mb-2`}>
                        <span className={`ml-2`}>{t("footer.darkMode")}:</span>
                        <ToggleSwitch onchange={(e) => dispatch(setThemeInitiate(e.target.checked))} checked={isDark}/>
                    </div>


                    <img src={toAbsoluteUrl('/assets/logo/logo.svg')} alt={t("title")} title={t("title")} className={`img-lg-1 mb-1 mt-2`}/>
                    <span className={`mt-1`}>v1.0.0-beta.1</span>

                </div>




                {/*<Icon iconName="icon-cancel fs-05 flex" onClick={()=>dispatch(showSideMenu(false))}/>*/}


            </div>
        </>
    );
};

export default SideMenu;
