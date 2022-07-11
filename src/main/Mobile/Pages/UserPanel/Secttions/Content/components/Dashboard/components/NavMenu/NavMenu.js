import React from "react";
import classes from "./NavMenu.module.css";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../../../../../Routes/routes";
import Icon from "../../../../../../../../../../components/Icon/Icon";


const NavMenu = () => {

    return (
        <div className={`container ${classes.container} row ai-center`}>

            <NavLink
                to={Routes.Overview}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-overview font-size-lg"/>
                <span className={`font-size-sm`}>نمای کلی</span>
            </NavLink>
            <NavLink
                to={Routes.OrderBook}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-orderbook font-size-lg"/>
                <span className={`font-size-sm`}>پیشنهادات</span>
            </NavLink>
            <NavLink
                to={Routes.Order}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order font-size-lg"/>
                <span className={`font-size-sm`}>سفارش</span>
            </NavLink>
            <NavLink
                to={Routes.MyOrder}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-myorder font-size-lg"/>
                <span className={`font-size-sm`}>تراکنش ها</span>
            </NavLink>
            <NavLink
                to={Routes.LastTrades}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-lasttrades font-size-lg"/>
                <span className={`font-size-sm`}>اخیر</span>
            </NavLink>
        </div>
    );
};

export default NavMenu;
