import React from 'react';
import {images} from "../../../../../../../../../../assets/images";
import i18n from "i18next";
import {BN} from "../../../../../../../../../../utils/utils";
import {useTranslation} from "react-i18next";

const MostIncreasedPrice = ({mostIncreasedPrice}) => {

    console.log("mostIncreasedPrice" , mostIncreasedPrice)

    const {t} = useTranslation();

    return (
        <>
            <div className={`column jc-center ai-start`}>
                <img  src={images[mostIncreasedPrice?.pairInfo?.baseAsset]}
                      alt={mostIncreasedPrice?.pairInfo?.baseAsset}
                      title={mostIncreasedPrice?.pairInfo?.baseAsset}
                      className={`img-md-plus mb-05`}/>
                <span className={`mt-05`}>{t("currency." + mostIncreasedPrice?.pairInfo?.baseAsset)}</span>
            </div>
            <div className={`column jc-end ai-center`}>
                <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'} jc-end ai-center width-100 text-green mb-05`}>
                    <span className={`${i18n.language !== "fa" ? 'mr-025' : 'ml-025'} fs-0-6`}>{mostIncreasedPrice?.pairInfo?.quoteAsset}</span>
                    <span className={`${i18n.language !== "fa" ? 'mL-025' : 'mr-025'} fs-01`}>{new BN(mostIncreasedPrice?.lastPrice).toFormat()}</span>
                </div>
                <div className={`row jc-end ai-center width-100 text-green mt-05`}>
                    <span>% {new BN(mostIncreasedPrice?.priceChangePercent).toFormat(2)}+</span>
                </div>
            </div>
        </>
    );
};

export default MostIncreasedPrice;
