import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import classes from "./Menu.module.css";
import Icon from "../../../../../../components/Icon/Icon";
import * as RoutesName from "../../../../Routes/routes";
import {activeActionSheet} from "../../../../../../store/actions/global";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";


const Menu = () => {

    const {t} = useTranslation();

    const location = useLocation();
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(activeActionSheet({
            menu: false,
            subMenu: false,
        }))
    }

    return (
        <div className={`width-100 ${classes.container} column jc-around ai-center pt-1 pb-2`}>
            <NavLink
                to={RoutesName.Overview}
                onClick={onClickHandler}
                className={`width-70 row jc-between ai-center py-2 ${location.pathname.includes("panel/market") ? classes.selected :""}`}
            >
                <Icon iconName="icon-market fs-20" customClass={`col-35 flex jc-end ai-center`}/>
                <span className={`col-60 ai-start`}>{t("market.title")}</span>
            </NavLink>
            <NavLink
                to={RoutesName.Wallet}
                className={({ isActive }) =>
                    isActive ? `${classes.selected} width-70 row jc-between ai-center py-2` : "width-70 row jc-between ai-center py-2"
                }
            >
                <Icon iconName="icon-safe fs-20" customClass={`col-35 flex jc-end ai-center`}/>
                <span className={`col-60 ai-start`}>{t("wallet.title")}</span>
            </NavLink>
            <NavLink
                to={RoutesName.TxHistory}
                className={({ isActive }) =>
                    isActive ? `${classes.selected} width-70 row jc-between ai-center py-2` : "width-70 row jc-between ai-center py-2"
                }
            >
                <Icon iconName="icon-clock fs-20" customClass={`col-35 flex jc-end ai-center`}/>
                <span className={`col-60 ai-start`}>{t("txHistory.title")}</span>
            </NavLink>
            <NavLink
                to={RoutesName.Profile}
                className={({ isActive }) =>
                    isActive ? `${classes.selected} width-70 row jc-between ai-center py-2` : "width-70 row jc-between ai-center py-2"
                }
            >
                <Icon iconName="icon-settings fs-20" customClass={`col-35 flex jc-end ai-center`}/>
                <span className={`col-60 ai-start`}>{t("settings.title")}</span>
            </NavLink>
        </div>
    );
};

export default Menu;
