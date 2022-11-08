import React from 'react';
import classes from './MarketInfo.module.css'
import Title from "../../../../../../../../components/Title/Title";
import {Link} from "react-router-dom";
import Icon from "../../../../../../../../components/Icon/Icon";
import * as Routes from "../../../../../../Routes/routes";
import MarketInfoTable from "./components/MarketInfoTable/MarketInfoTable";



const MarketInfo = () => {

    const marketData = [
        {symbol: "BTCBUSD", baseAsset: "BTC", quoteAsset: "BUSD", price: "20,515.85", marketCap: "386,159,595,216", lowPrice: "15000", highPrice: "300050", volume: "44,351,555,144", pcp24h: "-8.58", pcp7d: "-15.58"},
        {symbol: "ETHBUSD", baseAsset: "ETH", quoteAsset: "BUSD", price: "1,054.71", marketCap: "124,977,581,341", lowPrice: "15000", highPrice: "300050", volume: "26,939,396,426", pcp24h: "-11.48", pcp7d: "+14.58"},
        {symbol: "USDT", baseAsset: "USDT", quoteAsset: "BUSD", price: "0.9985", marketCap: "70,750,495,039", lowPrice: "15000", highPrice: "300050", volume: "71,102,864,297", pcp24h: "+1.03", pcp7d: "-125.58"},
        {symbol: "BNB", baseAsset: "BNB", quoteAsset: "BUSD", price: "204.98", marketCap: "32,812,595,330", lowPrice: "15000", highPrice: "300050", volume: "1,681,153,480", pcp24h: "-8.18", pcp7d: "-5.58"},
        {symbol: "BUSD", baseAsset: "BUSD", quoteAsset: "BUSD", price: "1.00", marketCap: "17,437,053,356", lowPrice: "15000", highPrice: "300050", volume: "6,734,823,937", pcp24h: "-0.14", pcp7d: "-5.8"},

        {symbol: "BTCBUSD", baseAsset: "DOGE", quoteAsset: "BUSD", price: "20,515.85", marketCap: "386,159,595,216", lowPrice: "15000", highPrice: "300050", volume: "44,351,555,144", pcp24h: "-8.58", pcp7d: "-1.58"},
        {symbol: "ETHBUSD", baseAsset: "LTC", quoteAsset: "BUSD", price: "1,054.71", marketCap: "124,977,581,341", lowPrice: "15000", highPrice: "300050", volume: "26,939,396,426", pcp24h: "-11.48", pcp7d: "-19.58"},


    ]

    return (
        <div className={`column py-2`} style={{backgroundColor: "var(--mainContent)"}}>
            <span className={`width-90 m-auto`}>
                <Title title={"بازار"}/>
            </span>

            <div className={`${classes.container} card-bg card-border width-90 m-auto my-2`}>
                <div className={`${classes.header} card-header-bg row jc-between ai-center px-2 py-2`}>
                    <div className={`row jc-center ai-center mr-1`}>
                        <span className={`px-3 py-1 rounded-5 cursor-pointer hover-text text-blue ${classes.title}`}>تومان</span>
                        <span className={`px-3 py-1 rounded-5 cursor-pointer hover-text`}>تتر</span>
                    </div>

                    <div className={`row jc-center ai-center cursor-pointer hover-text`}>
                        <Link to={Routes.AllMarket} className={`ml-05 hover-text`}>نمایش تمام بازار</Link>
                        <Icon iconName="icon-left-open-1 fs-01 flex" className={`mr-05`}/>
                    </div>
                </div>
                <div className={`${classes.content}`}>
                    <MarketInfoTable data={marketData.sort((a , b) => b.marketCap - a.marketCap).slice(0 , 5)}/>
                </div>
            </div>

        </div>
    );
};

export default MarketInfo;
