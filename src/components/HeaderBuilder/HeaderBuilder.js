import React, {useEffect} from 'react';
import classes from './HeaderBuilder.module.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Trans, useTranslation} from "react-i18next";
import ReactTooltip from "react-tooltip";
import * as Routes from "../../main/Mobile/Routes/routes";
import {toast} from "react-hot-toast";
/*
import {logOut} from "../../main/Mobile/Pages/Login/api/auth";
*/
import {images} from "../../assets/images";
import {setLogoutInitiate} from "../../store/actions";
import Clock from "../Clock/Clock";
import * as RoutesName from "../../main/Mobile/Routes/routes";
import SideMenu from "../SideMenu/SideMenu";
import {showSideMenu} from "../../store/actions/global";
import Icon from "../Icon/Icon";
import {toAbsoluteUrl} from "../../utils/utils";

const HeaderBuilder = ({children}) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.isLogin)
    const firstName = useSelector((state) => state.auth.firstName)
    const lastName = useSelector((state) => state.auth.lastName)

    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const logOutHandler = async () => {
        /*logOut().then(()=>{
            toast.success(<Trans
                i18nKey="header.logOutSuccess"
            />)
        })*/
        dispatch(setLogoutInitiate())
    }


    return (
        <div className={`${classes.container} width-100 row jc-between ai-center`}>
               <div className={`width-90 m-auto row jc-between ai-center`}>

                   <div className={`column ai-start width-20`}>

                       <Icon iconName="icon-menu_vertical fs-04 flex" onClick={()=>dispatch(showSideMenu(true))}/>
                   </div>



                   <div className={`width-60 text-center`}>
                       {children}
                   </div>


                   <div className={`flex jc-end ai-center width-20`}>
                       <Link to={Routes.Landing}>
                           <img src={toAbsoluteUrl('/assets/logo/logo-mini.svg')} alt={t("title")} title={t("title")} className={`img-lg-plus flex`}/>
                       </Link>
                   </div>

               </div>

        </div>
    );
};

export default HeaderBuilder;