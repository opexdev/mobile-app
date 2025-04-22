import React from "react";
import classes from "../../Overview.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import {useOverview} from "../../../../../../../../../../../../queries";
import {BN, getCurrencyNameOrAlias} from "../../../../../../../../../../../../utils/utils";
import i18n from "i18next";


const InformationBlock = ({period}) => {

    const {t} = useTranslation();
    const activePair = useSelector((state) => state.exchange.activePair)

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)

    const {data, isLoading, error} = useOverview(activePair.symbol, period)

    if (isLoading) return <Loading/>
    if (error) return <Error/>


    return (<div className={`${classes.content} row jc-between px-3 py-2`}>
        <div className={`column jc-between`}>
            <p>
                {t("overview.change")}:{" "}
                <span className={`${data?.priceChangePercent > 0 ? "text-green" : data?.priceChangePercent < 0 ? "text-red" : ""}`}>{data?.priceChangePercent === 0 ? "0 %" : `${new BN(data?.priceChangePercent).toFormat(2)} %`}
          </span>
            </p>
            <p>
                {t("overview.volume")}:{" "}
                <span>{new BN(data?.volume).decimalPlaces(currencies[data?.base]?.precision ?? 0).toFormat()}</span>{" "}
                {getCurrencyNameOrAlias(currencies[data?.base], language)}
            </p>
        </div>
        <div className={`column jc-between`}>
            <p>
                {t("min")}:{" "}
                <span className="text-red">{new BN(data?.lowPrice).decimalPlaces(currencies[data?.quote]?.precision ?? 0).toFormat()}</span>{" "}
                {getCurrencyNameOrAlias(currencies[data?.quote], language)}
            </p>
            <p>
                {t("max")}:{" "}
                <span className="text-green">{new BN(data?.highPrice).decimalPlaces(currencies[data?.quote]?.precision ?? 0).toFormat()}</span>{" "}
                {getCurrencyNameOrAlias(currencies[data?.quote], language)}
            </p>
        </div>
    </div>)
}

export default InformationBlock;