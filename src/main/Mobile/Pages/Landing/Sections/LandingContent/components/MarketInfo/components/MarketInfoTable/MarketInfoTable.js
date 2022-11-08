import React from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";

const MarketInfoTable = (props) => {
    const {t} = useTranslation();

    const {data, baseAsset, price, marketCap, lowPrice, highPrice, volume, pcp24h} = props


    let head = (
        <div className="row text-color-gray px-2 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-40 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-30 flex jc-start ai-center">{t("MarketInfo.lastPrice")}</span>
            <span className="width-30 flex jc-end ai-center">{t("MarketInfo.chart")}</span>
        </div>
    );

    let body = (
        <>
            {data.map((tr, index) => {
                return (
                    <div className={`${classes.row} row fs-01 rounded-5 border-bottom cursor-pointer px-2 py-1`}>
                        <span className="width-40 row jc-start ai-center">
                            <img src={images[tr.baseAsset]} alt={tr.baseAsset}
                             title={tr.baseAsset} className={`img-md ml-1`}/>
                            <span className={`mr-1`}>{t("currency." + tr.baseAsset)}</span>
                        </span>

                        <span className={`width-30 column jc-start ai-start`}>
                            <span className={` ${tr.pcp24h > 0 ? "text-green" : "text-red"}`}>{tr.price}</span>
                            <span className={`fs-0-6 ${tr.pcp24h > 0 ? "text-green" : "text-red"}`}>{tr.pcp24h} %</span>
                        </span>

                        <span className="width-30 flex jc-end ai-center">
                            <img
                                className="img-lg"
                                src={images.chart}
                                alt={""}
                                title={""}
                            />
                        </span>
                    </div>
                )
            })}
        </>
    );

    return (
        <>
            {head}
            {body}
        </>
    );
};

export default MarketInfoTable;
