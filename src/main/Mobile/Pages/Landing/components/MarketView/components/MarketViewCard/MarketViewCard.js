import React from 'react';
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../assets/images";
import {BN} from "../../../../../../../../utils/utils";
import i18n from "i18next";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";

const MarketViewCard = ({title, data, error, isLoading, volume}) => {

    console.log("title", title)
    console.log("data", data)

    const {t} = useTranslation();

    const content = () => {
        if (isLoading) return <span className={`py-3 width-100`}><Loading type="linear"/></span>
        if (error) return <Error/>
        else return <>
            <div className={`fle row jc-start ai-center`}>
                <img
                    src={images[data.pairInfo.baseAsset]}
                    alt={data.pairInfo.baseAsset}
                    title={data.pairInfo.baseAsset}
                    className={`img-md-plus ml-1`}
                />
                <span className={`mr-2`}>{t("currency." + data.pairInfo.baseAsset)}</span>
            </div>
            <div className={`column ai-end text-green`}>
                <div className={`${i18n.language !== "fa" ? 'row-reverse' : 'row'}`}>
                    <span
                        className={`fs-0-6 ${i18n.language !== "fa" ? 'mr-05' : 'ml-05'}`}>{data.pairInfo.quoteAsset}</span>
                    <span>{new BN(volume ? data?.volume : data?.lastPrice).toFormat()}</span>
                </div>
                {data?.priceChangePercent && <span className={`${data?.priceChangePercent > 0 ? "text-green" : "text-red"} direction-ltr`}>
                    {new BN(data?.priceChangePercent).toFormat(2)} %
                </span>}
            </div>
        </>
    }

    return (
        <div className={`card-bg card-border column width-100 my-2`}>
            <p className={`text-orange text-center px-4 py-2 card-header-bg`}>{title}</p>
            <div className={` row jc-between ai-center width-100 px-4 py-1`}>
                {content()}
            </div>
        </div>
    );
};

export default MarketViewCard;
