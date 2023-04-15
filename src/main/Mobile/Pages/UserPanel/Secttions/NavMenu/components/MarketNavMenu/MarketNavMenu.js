import React from 'react';
import classes from "../../NavMenu.module.css";
import {NavLink} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const MarketNavMenu = () => {

    const {t} = useTranslation();

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
                <span className={`fs-0-7`}>{t("overview.title")}</span>
            </NavLink>
            <NavLink
                to={Routes.OrderBook}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-orderbook fs-06"/>
                <span className={`fs-0-7`}>{t("orderBook.title")}</span>
            </NavLink>
            <NavLink
                to={Routes.Order}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order fs-06"/>
                <span className={`fs-0-7`}>{t("orders.title")}</span>
            </NavLink>
            <NavLink
                to={Routes.MyOrder}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-myorder fs-06"/>
                <span className={`fs-0-7`}>{t("myOrders.title")}</span>
            </NavLink>
            <NavLink
                to={Routes.LastTrades}
                className={({ isActive }) =>
                    isActive ? `col-20 column jc-center ai-center ${classes.selected}` : `col-20 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-lasttrades fs-06"/>
                <span className={`fs-0-7`}>{t("LastTrades.title")}</span>
            </NavLink>
        </div>
    );
};

export default MarketNavMenu;
