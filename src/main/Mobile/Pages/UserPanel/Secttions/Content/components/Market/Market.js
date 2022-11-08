import React from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import * as RoutesName from "../../../../../../Routes/routes";
import classes from "./Market.module.css";
import OverViewSection from "./Sections/OverViewSection/OverViewSection";
import OrderBookSection from "./Sections/OrderBookSection/OrderBookSection";
import OrderSection from "./Sections/OrderSection/OrderSection";
import MyOrderSection from "./Sections/MyOrderSection/MyOrderSection";
import LastTradesSection from "./Sections/LastTradesSection/LastTradesSection";


const Market = () => {

    const location = useLocation();

    return (
        <div className={`width-100 column jc-between ai-center px-2 py-1 ${classes.container}`}>
            <Routes>
                <Route path="/" element={<Navigate to={RoutesName.Overview} state={{from: location}} replace/>}/>
                <Route path={RoutesName.OverviewRelative} element={<OverViewSection/>}/>
                <Route path={RoutesName.OrderBookRelative} element={<OrderBookSection/>}/>
                <Route path={RoutesName.OrderRelative} element={ <OrderSection/>}/>
                <Route path={RoutesName.MyOrderRelative} element={<MyOrderSection/> }/>
                <Route path={RoutesName.LastTradesRelative} element={<LastTradesSection/>}/>
            </Routes>
        </div>
    );
};

export default Market;
