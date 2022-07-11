import React, {useEffect, useState} from "react";
import NavMenu from "./components/NavMenu/NavMenu";
import Overview from "./components/Overview/Overview";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import * as RoutesName from "../../../../../../routes/routes";
import {
    LastTradesRelative, Login, MobileDashboard,
    MyOrder, MyOrderRelative,
    Order,
    OrderBook,
    OrderBookRelative,
    OrderRelative,
    OverviewRelative
} from "../../../../../../routes/routes";
import {useTranslation} from "react-i18next";
import Button from "../../../../../../components/Button/Button";
import classes from "./Dashboard.module.css";
import TheOrderBook from "./components/OrderBook/OrderBook";
import TradingView from "./components/TradingView/TradingView";
import Icon from "../../../../../../components/Icon/Icon";
import TheOrder from "./components/Order/Order";


const Dashboard = () => {

    const {t} = useTranslation();
    const [activeOrder , setActiveOrder] = useState(false)
    const [showChart , setShowChart] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.pathname === Order) {
            setActiveOrder(true)
        }
    }, [location.pathname]);




    const GoToOrderHandler = () => {
        setActiveOrder(true)
        //navigate(Order, { replace: true });
        navigate(Order, {replace: true});


    }
    const BackClickHandler = () => {
        setActiveOrder(false)
       // navigate(OrderBook, { replace: true });
        navigate(OrderBook, {replace: true});
    }
    const NextClickHandler = () => {
        setActiveOrder(false)
        //navigate(MyOrder, { replace: true });
        navigate(MyOrder, {replace: true});
    }

    return (
        <div className={`container column jc-between ai-center px-2 py-1 ${classes.container} ${activeOrder ? classes.activeOrder : ""}`}>

            <Routes>

                <Route path="/" element={<Navigate to={RoutesName.Overview} state={{from: location}} replace/>}/>
                <Route path={RoutesName.OverviewRelative} element={
                    <>
                        <div className={`container col-28`}>
                            <Overview/>
                        </div>
                        <div className={`container col-70`}>
                            <TradingView/>
                        </div>
                    </>
                }/>
                <Route path={RoutesName.OrderBookRelative} element={
                    <>
                        <div className={`container col-92`}>
                            <TheOrderBook/>
                        </div>
                        <div className={`container row jc-between ai-end col-08`}>
                            <Button
                                buttonClass={`${classes.thisButton} ${classes.buyOrder}`}
                                type="submit"
                                onClick={GoToOrderHandler}
                                buttonTitle="سفارش خرید"
                            />
                            <Button
                                buttonClass={`${classes.thisButton} ${classes.sellOrder}`}
                                type="submit"
                                onClick={GoToOrderHandler}
                                buttonTitle="سفارش فروش"
                            />
                        </div>
                    </>
                }/>
                <Route path={RoutesName.OrderRelative} element={
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
                            {showChart ? <TradingView/> : <TheOrderBook orderLayout={true}/>}
                        </div>
                        <div className={`container col-46`}>
                            <TheOrder/>
                        </div>
                    </>
                }/>
                <Route path={RoutesName.MyOrderRelative} element={

                    <>
                        <div className={`container col-49`}/>
                        <div className={`container col-49`}/>
                    </>
                }/>
                <Route path={RoutesName.LastTradesRelative} element={
                    <>

                        <div className={`container col-49`}/>
                        <div className={`container col-49`}/>
                    </>
                }/>
                {/*<Route path="" element={
                    <>
                        <div
                            className="container flex ai-center jc-center"
                            style={{height: "70%"}}>
                            <span>{t("comingSoon")}</span>
                        </div>
                    </>
                }/>*/}
            </Routes>
            {activeOrder ? "" : <NavMenu/>}
        </div>
    );
};

export default Dashboard;
