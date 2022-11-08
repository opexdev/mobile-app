import React from 'react';
import OrderBook from "../../components/OrderBook/OrderBook";
import Button from "../../../../../../../../../../components/Button/Button";
import classes from "../../Market.module.css";
import * as RoutesName from "../../../../../../../../Routes/routes";

import {useNavigate} from "react-router-dom";
import {activeOrderLayout} from "../../../../../../../../../../store/actions/global";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const OrderBookSection = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const GoToOrderHandler = () => {

        // setActiveOrder(true)
        navigate(RoutesName.Order, {replace: true});
        dispatch(activeOrderLayout(true))



    }

    return (
        <>
            <div className={`width-100 col-92`}>
                <OrderBook/>
            </div>
            <div className={`width-100 row jc-between ai-end col-08`}>
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
    );
};

export default OrderBookSection;
