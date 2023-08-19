import React, {useEffect, useState} from "react";
import classes from "./Order.module.css";
import {useTranslation} from "react-i18next";
import AccordionBox from "../../../../../../../../../../components/AccordionBox/AccordionBox";
import {useDispatch, useSelector} from "react-redux";
import BuyOrder from "./components/BuyOrder/BuyOrder";
import SellOrder from "./components/SellOrder/SellOrder";
import {setBuyOrder, setSellOrder} from "../../../../../../../../../../store/actions";


const Order = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);

    const selectedSellOrder = useSelector((state) => state.exchange.activePairOrders.selectedSellOrder)
    const selectedBuyOrder = useSelector((state) => state.exchange.activePairOrders.selectedBuyOrder)

    const data = [
        {id: 1, title: t("buy"), body: <BuyOrder />},
        {id: 2, title: t("sell"), body: <SellOrder />},
    ];


    useEffect(() => {
        if (selectedSellOrder.pricePerUnit) {
            setActiveTab(1);
        }
    }, [selectedSellOrder]);

    useEffect(() => {
        if (selectedBuyOrder.pricePerUnit) {
            setActiveTab(0);
        }
    }, [selectedBuyOrder]);

    useEffect(() => {
        if (activeTab === 1) {
            dispatch(setBuyOrder({pricePerUnit: 0, amount: 0,}))
        } else {
            dispatch(setSellOrder({pricePerUnit: 0, amount: 0,}))
        }
    }, [activeTab])

    return (
        <div className={`width-100 ${classes.container}  card-bg card-border`}>
            <AccordionBox
                title={t("orders.title")}
                safari={classes.safariFlexSize}
                content={data}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
};
export default Order;
