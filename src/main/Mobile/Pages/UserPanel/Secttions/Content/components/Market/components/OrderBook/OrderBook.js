import React, {useEffect} from "react";
import classes from "./OrderBook.module.css";
import {useTranslation} from "react-i18next";
import Error from "../../../../../../../../../../components/Error/Error";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import OrderBookTable from "./components/OrderBookTable/OrderBookTable";
import {useOrderBook} from "../../../../../../../../../../queries";
import {useSelector} from "react-redux";

const OrderBook = ({orderLayout}) => {

    const {t} = useTranslation();
    const activePair = useSelector((state) => state.exchange.activePair)
    const {data, isLoading, error, refetch} = useOrderBook(activePair.symbol)
    const lastTransaction = useSelector((state) => state.auth.lastTransaction)

    useEffect(() => {
        refetch()
    }, lastTransaction)

    const tableRender = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>

        return <>
            <OrderBookTable data={data.asks}/>
            <OrderBookTable data={data.bids} type="buy"/>
        </>

    }

    return (
        <div className={`width-100 card-bg card-border column ${classes.container}`}>
            <div className={`column border-bottom jc-between header-radius card-header-bg ${classes.header}`}>
                {orderLayout ? "" : <div className="row jc-center">
                    <h3>
                        {t("orderBook.title")} ({t("currency." + activePair.baseAsset)}/
                        {t("currency." + activePair.quoteAsset)})
                    </h3>
                </div>}
                <div className="row jc-center">
                    <span className="text-red">{t("sell")}</span>
                    <span className="text-green">{t("buy")}</span>
                </div>
            </div>
            <div className={`row width-100 ${classes.content}`}>
                {tableRender()}
            </div>
        </div>
    );
};

export default OrderBook;
