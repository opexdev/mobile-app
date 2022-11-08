import React from 'react';
import classes from "../../NavMenu.module.css";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";

const SettingsNavMenu = () => {
    return (
        <div className={`width-100 ${classes.container} row ai-center jc-between`}>

            <NavLink
                to={Routes.Overview}
                className={({ isActive }) =>
                    isActive ? `col-25 column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-overview fs-06"/>
                <span className={`fs-0-6`}>امنیت</span>
            </NavLink>
            <NavLink
                to={Routes.OrderBook}
                className={({ isActive }) =>
                    isActive ? `col-25 column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-orderbook fs-06"/>
                <span className={`fs-0-6`}>احراز هویت</span>
            </NavLink>
            <NavLink
                to={Routes.Order}
                className={({ isActive }) =>
                    isActive ? `col-25  column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order fs-06"/>

                <span className={`fs-0-6`}>مشخصات کاربری</span>
            </NavLink>
            <NavLink
                to={Routes.Order}
                className={({ isActive }) =>
                    isActive ? `col-25  column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order fs-06"/>

                <span className={`fs-0-6`}>شخصی سازی</span>
            </NavLink>
        </div>
    );
};

export default SettingsNavMenu;
