import React from 'react';
import classes from './MarketStats.module.css'
import StatsCard from "./components/StatsCard/StatsCard";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useGetMarketStats} from "../../../../../../queries";
import Loading from "../../../../../../components/Loading/Loading";
import Error from "../../../../../../components/Error/Error";
import MostVolume from "./components/MostVolume/MostVolume";
import MostIncreasedPrice from "./components/MostIncreasedPrice/MostIncreasedPrice";
import MostDecreasedPrice from "./components/MostDecreasedPrice/MostDecreasedPrice";
import MostTrades from "./components/MostTrades/MostTrades";
import ScrollBar from "../../../../../../components/ScrollBar";

const MarketStats = () => {

    const {t} = useTranslation();

    const interval = useSelector((state) => state.global.marketInterval)
    const {data:stats, isLoading, error} = useGetMarketStats(interval)

    const allSymbols = useSelector((state) => state.exchange.symbols)

    const mostIncreasedPrice = stats?.mostIncreasedPrice[0]
    const mostDecreasedPrice = stats?.mostDecreasedPrice[0]
    const mostVolume = stats?.mostVolume
    const mostTrades = stats?.mostTrades

    if(!isLoading && !error && mostIncreasedPrice) {
        mostIncreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostIncreasedPrice?.symbol))
        mostDecreasedPrice.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
        mostVolume.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
        mostTrades.pairInfo = allSymbols.find(s => s.symbol === (mostDecreasedPrice?.symbol))
    }

    const mostIncreasedPriceContent = () => {
        if (isLoading) return <Loading type="linear"/>
        if (error) return <Error/>
        else return <MostIncreasedPrice mostIncreasedPrice={mostIncreasedPrice}/>
    }

    const mostDecreasedPriceContent = () => {
        if (isLoading) return <Loading type="linear"/>
        if (error) return <Error/>
        else return <MostDecreasedPrice mostDecreasedPrice={mostDecreasedPrice}/>
    }

    const mostVolumeContent = () => {
        if (isLoading) return <Loading type="linear"/>
        if (error) return <Error/>
        return <MostVolume mostVolume={mostVolume}/>
    }

    const mostTradesContent = () => {
        if (isLoading) return <Loading type="linear"/>
        if (error) return <Error/>
        return <MostTrades mostTrades={mostTrades}/>
    }

    return (
        <div className={`${classes.container} py-2`}>
            <div className={`${classes.content} row jc-start`}>
                <StatsCard title={t("MarketView.mostIncreased")}>{mostIncreasedPriceContent()}</StatsCard>
                <StatsCard title={t("MarketView.mostDecreased")}>{mostDecreasedPriceContent()}</StatsCard>
                <StatsCard title={t("MarketView.mostVolume")}>{mostVolumeContent()}</StatsCard>
                <StatsCard title={t("MarketView.mostTrades")}>{mostTradesContent()}</StatsCard>
            </div>
        </div>
    );
};

export default MarketStats;
