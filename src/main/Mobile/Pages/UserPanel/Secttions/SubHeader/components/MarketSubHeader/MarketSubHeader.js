import React from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useGetLastPrices} from "../../../../../../../../queries/hooks/useGetLastPrices";
import {useGetUserAccount} from "../../../../../../../../queries/hooks/useGetUserAccount";
import {BN} from "../../../../../../../../utils/utils";
import Icon from "../../../../../../../../components/Icon/Icon";
import classes from "./MarketSubHeader.module.css"
import i18n from "i18next";

const MarketSubHeader = () => {

    const {t} = useTranslation();

    const activePair = useSelector((state) => state.exchange.activePair)
    const {data: lastPrices} = useGetLastPrices()
    const {data: userAccount} = useGetUserAccount()

    const base = userAccount?.wallets[activePair.baseAsset]?.free || 0
    const quote = userAccount?.wallets[activePair.quoteAsset]?.free || 0

    return (
        <>
            <div className={`width-100 row jc-between ai-center my-05`}>
               <span >{t("header.lastPrice")}</span>
               <span>{new BN(lastPrices[activePair.symbol] || 0).toFormat()+"  "+t("currency." + activePair.quoteAsset)}</span>
            </div>

            <div className={`width-100 row jc-between ai-center my-05`}>
                <span>{t("header.availableBalance")}</span>
                <div className={`row ai-center ${classes.inventory} mt-05`}>
                    <div className=" flex ai-center jc-end">
                        {/*<span>{ new BN (base).decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>*/}
                        <span className={`pl-05`}>{ new BN (base).toFormat()}</span>
                        <span className={`pr-05`}>{t("currency." + activePair.baseAsset)}</span>
                    </div>
                    <span className={`text-orange mx-2`}>|</span>
                    <div className=" flex ai-center  jc-start">
                        <span className={`pl-05`}>{ new BN(quote).toFormat()}</span>
                        <span className={`pr-05`}>{t("currency." + activePair.quoteAsset)}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarketSubHeader;
