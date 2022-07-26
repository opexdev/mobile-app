import React from 'react';
import classes from "../../NavMenu.module.css";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";

const SettingsNavMenu = () => {
    return (
        <div className={`container ${classes.container} row ai-center jc-between`}>

            <NavLink
                to={Routes.Overview}
                className={({ isActive }) =>
                    isActive ? `col-25 column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-overview font-size-lg"/>
                <span className={`font-size-sm`}>امنیت</span>
            </NavLink>
            <NavLink
                to={Routes.OrderBook}
                className={({ isActive }) =>
                    isActive ? `col-25 column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-orderbook font-size-lg"/>
                <span className={`font-size-sm`}>احراز هویت</span>
            </NavLink>
            <NavLink
                to={Routes.Order}
                className={({ isActive }) =>
                    isActive ? `col-25  column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order font-size-lg"/>

                <span className={`font-size-sm`}>مشخصات کاربری</span>
            </NavLink>
            <NavLink
                to={Routes.Order}
                className={({ isActive }) =>
                    isActive ? `col-25  column jc-center ai-center ${classes.selected}` : `col-25 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order font-size-lg"/>

                <span className={`font-size-sm`}>شخصی سازی</span>
            </NavLink>
        </div>
    );
};

export default SettingsNavMenu;
