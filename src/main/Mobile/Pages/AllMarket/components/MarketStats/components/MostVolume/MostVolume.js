import React from 'react';
import i18n from "i18next";
import {BN, getCurrencyNameOrAlias} from "../../../../../../../../utils/utils";
import {useSelector} from "react-redux";

const MostVolume = ({mostVolume}) => {

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)

    return (
        <>
            <div className={`column jc-center ai-start`}>
                <img src={currencies[mostVolume?.pairInfo?.baseAsset]?.icon}
                     alt={mostVolume?.pairInfo?.baseAsset}
                     title={mostVolume?.pairInfo?.baseAsset}
                     className={`img-md-plus mb-05`}/>
                <span className={`mt-05`}>{getCurrencyNameOrAlias(currencies[mostVolume?.pairInfo?.baseAsset], language)}</span>
            </div>
            <div className={`column jc-end ai-center`}>
                <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'} jc-end ai-center width-100 text-green mb-05`}>
                    <span className={`${i18n.language !== "fa" ? 'mr-025' : 'ml-025'} fs-0-6`}>{mostVolume?.pairInfo?.baseAsset}</span>
                    <span className={`${i18n.language !== "fa" ? 'mL-025' : 'mr-025'} fs-01`}>{new BN(mostVolume?.volume).decimalPlaces(currencies[mostVolume?.pairInfo?.baseAsset]?.precision ?? 0).toFormat()}</span>
                </div>
            </div>


        </>
    );
};

export default MostVolume;
