import React from 'react';
import classes from './MarketViewCard.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";

const MarketViewCard = () => {

    const {t} = useTranslation();

    return (
        <div className={`column jc-between ai-center mt-2 width-90 m-auto`}>
            <div className={`${classes.container} card-bg card-border row width-100 my-1`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center text-center width-30 px-2`}>
                    <p className={`text-orange`}>{t("MarketView.mostIncrease")}</p>
                </div>
                <div className={`${classes.content} row jc-between ai-center px-3 width-70`}>
                    <div className={`fle row jc-start ai-center`}>
                        <img src={images.BTC} alt="" className={`img-md-plus ml-1`}/>
                        <span className={`mr-2`}>{t("currency." + "BTC")}</span>
                    </div>
                    <div className={`column jc-center ai-end`}>
                        <span className={`mr-025 text-green`}>25،1254،248</span>
                        <span className={`ml-025 text-green`}>(10% +)</span>
                    </div>
                </div>
            </div>
            <div className={`${classes.container} card-bg card-border row width-100 my-1`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center text-center width-30 px-2`}>
                    <p className={`text-orange`}>{t("MarketView.greatestReduction")}</p>
                </div>
                <div className={`${classes.content} row jc-between ai-center px-3 width-70`}>
                    <div className={`fle row jc-start ai-center`}>
                        <img src={images.ETH} alt="" className={`img-md-plus ml-1`}/>
                        <span className={`mr-2`}>{t("currency." + "ETH")}</span>
                    </div>
                    <div className={`column jc-center ai-end`}>
                        <span className={`mr-025 text-red`}>25،1254،248</span>
                        <span className={`ml-025 text-red`}>(10% +)</span>
                    </div>
                </div>
            </div>
            <div className={`${classes.container} card-bg card-border row width-100 my-1`}>
                <div className={`${classes.header} card-header-bg flex jc-center ai-center text-center width-30 px-2`}>
                    <p className={`text-orange`}>{t("MarketView.MaxTransactionVolume")}</p>
                </div>
                <div className={`${classes.content} row jc-between ai-center px-3 width-70`}>
                    <div className={`fle row jc-start ai-center`}>
                        <img src={images.USDT} alt="" className={`img-md-plus ml-1`}/>
                        <span className={`mr-2`}>{t("currency." + "USDT")}</span>
                    </div>
                    <div className={`column jc-center ai-end`}>
                        <span className={`mr-025 text-green`}>1،200</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketViewCard;
