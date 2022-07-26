import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import classes from "./Menu.module.css";
import Icon from "../../../../../../components/Icon/Icon";
import * as RoutesName from "../../../../Routes/routes";


const Menu = () => {

    const location = useLocation();

    return (
        <div className={`container ${classes.container} column jc-around ai-center pt-1`}>
            <NavLink
                to={RoutesName.Overview}
                className={`width-50 row jc-between ai-center py-1 ${location.pathname.includes("panel/market") ? classes.selected :""}`}
            >
                <Icon iconName="icon-market font-size-lg-plus" customClass={`col-48 flex jc-end ai-center`}/>
                <span className={`col-48 ai-start`}>بازار</span>
            </NavLink>
            <NavLink
                to={RoutesName.Wallet}
                className={({ isActive }) =>
                    isActive ? `${classes.selected} width-50 row jc-between ai-center py-1` : "width-50 row jc-between ai-center py-1"
                }
            >
                <Icon iconName="icon-safe font-size-lg-plus" customClass={`col-48 flex jc-end ai-center`}/>
                <span className={`col-48 ai-start`}>کیف پول</span>
            </NavLink>
            <NavLink
                to={RoutesName.Settings}
                className={({ isActive }) =>
                    isActive ? `${classes.selected} width-50 row jc-between ai-center py-1` : "width-50 row jc-between ai-center py-1"
                }
            >
                <Icon iconName="icon-settings font-size-lg-plus" customClass={`col-48 flex jc-end ai-center`}/>
                <span className={`col-48 ai-start`}>تنظیمات</span>
            </NavLink>
        </div>
    );
};

export default Menu;
