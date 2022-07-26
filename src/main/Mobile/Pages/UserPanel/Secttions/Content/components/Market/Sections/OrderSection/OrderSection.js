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
            <div className={`container col-06 row jc-around ai-center`}>
                <div className={`container col-10 flex jc-center ai-center ${classes.headerItem}`}>
                    <Icon iconName="icon-right-open font-size-md flex" onClick={BackClickHandler}/>
                </div>
                <div className={`container col-38 row jc-center ai-center ${classes.headerItem}`} onClick={()=>setShowChart(false)}>
                    <Icon iconName={`icon-orderbook font-size-md-plus flex ${showChart ?  '' : 'icon-active font-size-md-plus-plus'}`} customClass={`ml-1`}/>
                    <Button
                        buttonClass={`${classes.headerButton} ${showChart ? "" : classes.selected} mr-1`}
                        type="submit"
                        buttonTitle={t("orderBook.title")}
                    />
                </div>
                <div className={`container col-38 flex jc-center ai-center ${classes.headerItem}`} onClick={()=>setShowChart(true)}>
                    <Icon iconName={`icon-account font-size-md-plus flex ${showChart ? 'icon-active font-size-md-plus-plus' : ''}`} customClass={`ml-1`}/>
                    <Button
                        buttonClass={`${classes.headerButton} ${showChart ? classes.selected : ""} mr-1`}
                        type="submit"
                        buttonTitle={t("charts.title")}
                    />
                </div>
                <div className={`container col-10 flex jc-center ai-center ${classes.headerItem}`}>
                    <Icon iconName="icon-left-open font-size-md flex" onClick={NextClickHandler}/>

                </div>
            </div>
            <div className={`container col-46`}>
                {showChart ? <TradingView/> : <OrderBook orderLayout={true}/>}
            </div>
            <div className={`container col-46`}>
                <Order/>
            </div>
        </>
    );
};

export default OrderSection;
