import React, {useEffect, useState} from 'react';
import classes from "../../Market.module.css";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import Button from "../../../../../../../../../../components/Button/Button";
import TradingView from "../../components/TradingView/TradingView";
import OrderBook from "../../components/OrderBook/OrderBook";
import Order from "../../components/Order/Order";
import {activeOrderLayout} from "../../../../../../../../../../store/actions/global";
import * as RoutesName from "../../../../../../../../Routes/routes";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const OrderSection = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();


    const [showChart , setShowChart] = useState(false)

    useEffect(() => {

        if (location.pathname === RoutesName.Order) {
            dispatch(activeOrderLayout(true))
        }
        return () => {
            dispatch(activeOrderLayout(false))
        }

    }, [location.pathname]);

    const BackClickHandler = () => {
        dispatch(activeOrderLayout(false))
        navigate(RoutesName.OrderBook, {replace: true});
    }
    const NextClickHandler = () => {
        dispatch(activeOrderLayout(false))
        navigate(RoutesName.MyOrder, {replace: true});
    }

    return (
        <>
            <div className={`width-100 col-06 row jc-around ai-center`}>
                <div className={`width-100 col-10 flex jc-center ai-center ${classes.headerItem}`}>
                    <Icon iconName={`${i18n.language !== "fa" ? 'icon-left-open': 'icon-right-open'} fs-01 flex`} onClick={BackClickHandler}/>
                </div>
                <div className={`width-100 col-38 row jc-center ai-center ${classes.headerItem}`} onClick={()=>setShowChart(false)}>
                    <Icon iconName={`icon-orderbook fs-04 flex ${showChart ?  '' : 'text-blue fs-05'}`} customClass={`ml-1`}/>
                    <Button
                        buttonClass={`${classes.headerButton} ${showChart ? "" : classes.selected} mr-1`}
                        type="submit"
                        buttonTitle={t("orderBook.title")}
                    />
                </div>
                <div className={`width-100 col-38 flex jc-center ai-center ${classes.headerItem}`} onClick={()=>setShowChart(true)}>
                    <Icon iconName={`icon-account fs-04 flex ${showChart ? 'text-blue fs-05' : ''}`} customClass={`ml-1`}/>
                    <Button
                        buttonClass={`${classes.headerButton} ${showChart ? classes.selected : ""} mr-1`}
                        type="submit"
                        buttonTitle={t("charts.title")}
                    />
                </div>
                <div className={`width-100 col-10 flex jc-center ai-center ${classes.headerItem}`}>
                    <Icon iconName={`${i18n.language !== "fa" ? 'icon-right-open': 'icon-left-open'} fs-01 flex`} onClick={NextClickHandler}/>

                </div>
            </div>
            <div className={`width-100 col-40`}>
                {showChart ? <TradingView/> : <OrderBook orderLayout={true}/>}
            </div>
            <div className={`width-100 col-52`}>
                <Order/>
            </div>
        </>
    );
};

export default OrderSection;
