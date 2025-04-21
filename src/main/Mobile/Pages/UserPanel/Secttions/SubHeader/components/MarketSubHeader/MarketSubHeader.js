import React from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useGetLastPrices} from "../../../../../../../../queries/hooks/useGetLastPrices";
import {useGetUserAccount} from "../../../../../../../../queries/hooks/useGetUserAccount";
import {BN, getCurrencyNameOrAlias} from "../../../../../../../../utils/utils";
import classes from "./MarketSubHeader.module.css"
import i18n from "i18next";

const MarketSubHeader = () => {

    const {t} = useTranslation();

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)

    const activePair = useSelector((state) => state.exchange.activePair)

    const {data: lastPrices} = useGetLastPrices()
    const {data: userAccount} = useGetUserAccount()

    const base = userAccount?.wallets[activePair.baseAsset]?.free || 0
    const quote = userAccount?.wallets[activePair.quoteAsset]?.free || 0

    return (
        <>
            <div className={`width-100 row jc-between ai-center my-05`}>
               <span >{t("header.lastPrice")}</span>
            </div>
            <div className={`width-100 row jc-between ai-start mb-1`}>
                <span>{" "}{new BN(lastPrices[activePair.symbol] || 0).decimalPlaces(currencies[activePair?.quoteAsset]?.precision ?? 0).toFormat() +" "+ getCurrencyNameOrAlias(currencies[activePair?.quoteAsset], language)}</span>
            </div>
            <div className={`width-100 row jc-between ai-start my-05`}>
                <div>{t("header.availableBalance")}</div>
            </div>
            <div className={`width-100 row jc-start ai-start mb-1`}>
                <div className=" row ai-center jc-end">
                    <span className={`pl-05`}>{new BN (base).decimalPlaces(currencies[activePair?.baseAsset]?.precision ?? 0).toFormat()}</span>
                    <span className={`pr-05`}>{getCurrencyNameOrAlias(currencies[activePair?.baseAsset], language)}</span>
                </div>
                <span className={`text-orange mx-3`}>|</span>
                <div className=" row ai-center  jc-end">
                    <span className={`pl-05`}>{new BN(quote).decimalPlaces(currencies[activePair?.quoteAsset]?.precision ?? 0).toFormat()}</span>
                    <span className={`pr-05`}>{getCurrencyNameOrAlias(currencies[activePair?.quoteAsset], language)}</span>
                </div>
            </div>
        </>
    );
};

export default MarketSubHeader;
