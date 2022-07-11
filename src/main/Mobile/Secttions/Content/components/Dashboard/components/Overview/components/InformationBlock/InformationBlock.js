import React, {useEffect, useState} from "react";
import classes from "../../Overview.module.css";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import {getOverview} from "../../api/overview";



const InformationBlock = (props) => {

    const {t} = useTranslation();
    const {activePair,period} = props
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [information , setInformation] = useState(null)

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true)
        setError(false)
        const infoBlockController = new AbortController();
        getOverview(activePair, period, infoBlockController)
            .then((res) => {
                setError(false)
                isMounted && setInformation(res.data[0])
            }).catch((e) => {
            if (e.code !== "ERR_CANCELED")  setError(true)
        }).finally(() => {
            setIsLoading(false)
        });
        return () => {
            isMounted = false;
            infoBlockController.abort();
        }
    }, [activePair, period]);


    if (isLoading) {
        return <Loading/>
    }

    if (error) {
        return <Error/>
    }

    return (<div className={`${classes.content} row jc-between px-3 py-2`}>
        <div className={`column jc-between`}>
            <p>
                {t("overview.change")}:{" "}
                <span className={information.priceChange > 0 ? "text-green" : "text-red"}>
            %{information.priceChangePercent.toFixed(2)}
          </span>
            </p>
            <p>
                {t("overview.volume")}: <span>{information.volume.toLocaleString()} </span>
                {t(`currency.${activePair.quoteAsset}`)}
            </p>
        </div>
        <div className={`column jc-between`}>
            <p>
                {t("min")}:{" "}
                <span className="text-red">{information.lowPrice.toLocaleString()}</span>{" "}
                {t(`currency.${activePair.quoteAsset}`)}
            </p>
            <p>
                {t("max")}:{" "}
                <span className="text-green">{information.highPrice.toLocaleString()}</span>{" "}
                {t(`currency.${activePair.quoteAsset}`)}
            </p>
        </div>




    </div>)
}

const mapStateToProps = (state) => {
    return {
        activePair: state.exchange.activePair,
    };
};

export default connect(mapStateToProps, null)(InformationBlock);