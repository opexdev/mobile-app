import React from 'react';
import classes from "../../NavMenu.module.css";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";
import {useSelector} from "react-redux";

const MarketNavMenu = () => {


    const activeOrderLayout = useSelector((state) => state.global.activeOrderLayout)

    return (
        <div className={`width-100 ${classes.container} ${activeOrderLayout && classes.activeOrderLayout} row ai-center`}>

            <NavLink
                to={Routes.Overview}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-overview fs-06"/>
                <span className={`fs-0-6`}>نمای کلی</span>
            </NavLink>
            <NavLink
                to={Routes.OrderBook}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-orderbook fs-06"/>
                <span className={`fs-0-6`}>پیشنهادات</span>
            </NavLink>
            <NavLink
                to={Routes.Order}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order fs-06"/>
                <span className={`fs-0-6`}>سفارش</span>
            </NavLink>
            <NavLink
                to={Routes.MyOrder}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-myorder fs-06"/>
                <span className={`fs-0-6`}>تراکنش ها</span>
            </NavLink>
            <NavLink
                to={Routes.LastTrades}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-lasttrades fs-06"/>
                <span className={`fs-0-6`}>اخیر</span>
            </NavLink>
        </div>
    );
};

export default MarketNavMenu;
