import React from 'react';
import i18n from "i18next";
import {BN, getCurrencyNameOrAlias} from "../../../../../../../../utils/utils";
import {useSelector} from "react-redux";

const MostTrades = ({mostTrades}) => {

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)

    return (
        <>
            <div className={`column jc-center ai-start`}>
                <img src={currencies[mostTrades?.pairInfo?.baseAsset]?.icon}
                     alt={mostTrades?.pairInfo?.baseAsset}
                     title={mostTrades?.pairInfo?.baseAsset}
                     className={`img-md-plus mb-05`}/>
                <span className={`mt-05`}>{getCurrencyNameOrAlias(currencies[mostTrades?.pairInfo?.baseAsset], language)}</span>
            </div>
            <div className={`column jc-end ai-center`}>
                <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'} jc-end ai-center width-100`}>
                    <span className={`${i18n.language !== "fa" ? 'mL-025' : 'mr-025'} fs-01`}>{new BN(mostTrades?.tradeCount).toFormat()} </span>
                </div>
            </div>

        </>
    );
};

export default MostTrades;
