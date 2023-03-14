import React from 'react';
import Title from "../../../../../../../../components/Title/Title";
import {useTranslation} from "react-i18next";
import {useGetMarketStats} from "../../../../../../../../queries";
import MarketViewCard from "./components/MarketViewCard/MarketViewCard";
import {useSelector} from "react-redux";

const MarketView = () => {

    const {t} = useTranslation();

    const interval = "24h"
    const {data: stats, isLoading, error} = useGetMarketStats(interval)

    const allSymbols = useSelector((state) => state.exchange.symbols)
    const mostIncreasedPrice = stats?.mostIncreasedPrice[0]
    const mostDecreasedPrice = stats?.mostDecreasedPrice[0]
    const mostVolume = stats?.mostVolume
    const mostTrades = stats?.mostTrades

    if (!isLoading && !error && mostIncreasedPrice) {
        mostIncreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostIncreasedPrice?.symbol))
        mostDecreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
        mostVolume.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
        mostTrades.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
    }
    return (
        <div className={`column py-2`} style={{backgroundColor: "var(--mainContent)"}}>
            <span className={`width-90 m-auto`}>
                <Title title={t("MarketView.title")}/>
            </span>

            <div className={`width-90 m-auto`}>

                <MarketViewCard title={t("MarketView.mostIncreased")} data={mostIncreasedPrice} error={error} isLoading={isLoading}/>
                <MarketViewCard title={t("MarketView.mostDecreased")} data={mostDecreasedPrice} error={error} isLoading={isLoading}/>
                <MarketViewCard title={t("MarketView.mostVolume")} data={mostVolume} error={error} isLoading={isLoading} volume={true}/>

            </div>

        </div>
    );
};

export default MarketView;
