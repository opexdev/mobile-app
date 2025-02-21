import React from 'react';
import i18n from "i18next";
import {BN, getCurrencyNameOrAlias} from "../../../../../../../../utils/utils";
import {useSelector} from "react-redux";

const MostDecreasedPrice = ({mostDecreasedPrice}) => {

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)

    return (
        <>
            <div className={`column jc-center ai-start`}>
                <img  src={currencies[mostDecreasedPrice?.pairInfo?.baseAsset]?.icon}
                      alt={mostDecreasedPrice?.pairInfo?.baseAsset}
                      title={mostDecreasedPrice?.pairInfo?.baseAsset}
                      className={`img-md-plus mb-05`}/>
                <span className={`mt-05`}>{getCurrencyNameOrAlias(currencies[mostDecreasedPrice?.pairInfo?.baseAsset], language)}</span>
            </div>
            <div className={`column jc-end ai-center`}>
                <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'} jc-end ai-center width-100 text-green mb-05`}>
                    <span className={`${i18n.language !== "fa" ? 'mr-025' : 'ml-025'} fs-0-6`}>{mostDecreasedPrice?.pairInfo?.quoteAsset}</span>
                    <span className={`${i18n.language !== "fa" ? 'mL-025' : 'mr-025'} fs-01`}>{new BN(mostDecreasedPrice?.lastPrice).decimalPlaces(currencies[mostDecreasedPrice.pairInfo.quoteAsset]?.precision ?? 0).toFormat()}</span>
                </div>
                <div className={`${mostDecreasedPrice?.priceChangePercent > 0 ? "text-green" : mostDecreasedPrice?.priceChangePercent < 0 ? "text-red" : ""} ${i18n.language !== "fa" ? 'jc-end' : 'jc-start'} direction-ltr width-100 row ai-center mt-05`}>
                    {mostDecreasedPrice?.priceChangePercent === 0 ? "0 %" : `${new BN(mostDecreasedPrice?.priceChangePercent).toFormat(2)} %`}
                </div>
            </div>

        </>
    );
};

export default MostDecreasedPrice;
