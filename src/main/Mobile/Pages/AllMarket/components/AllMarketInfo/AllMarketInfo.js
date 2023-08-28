import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import classes from "./AllMarketInfo.module.css"
import {useSelector} from "react-redux";
import {useGetQuoteCurrencies, useOverview} from "../../../../../../queries";
import AllMarketInfoTable from "./components/AllMarketInfoTable/AllMarketInfoTable";
import Loading from "../../../../../../components/Loading/Loading";
import Error from "../../../../../../components/Error/Error";

const AllMarketInfo = () => {

    const {t} = useTranslation();

    const [card, setCard] = useState(false)
    const [activeCurrency, setActiveCurrency] = useState("")

    const interval = useSelector((state) => state.global.marketInterval)
    const quote = activeCurrency === "" ? null : activeCurrency

    const {data: overview, isLoading, error} = useOverview(null, interval, quote)
    const {data: currencies} = useGetQuoteCurrencies()

    const content = () => {
        if (isLoading) return <div style={{height: "40vh"}}><Loading/></div>
        if (error) return <div style={{height: "40vh"}}><Error/></div>
        else return <>
            {card ?
                <AllMarketInfoTable data={overview} activeCurrency={activeCurrency}/>
                :
                <AllMarketInfoTable data={overview} activeCurrency={activeCurrency}/>
            }
        </>
    }

    return (
        <div className={`${classes.container} card-bg card-border width-90`}>
            <div className={`${classes.header} card-header-bg row jc-between ai-center px-3 py-2`}>

                <div className={`row jc-center ai-baseline mr-05 ml-1 cursor-pointer hover-text`} onClick={()=>setActiveCurrency("")}>
                    <h2 className={`ml-05`}>{t("market.title")}</h2>
                    <span className={`fs-0-8 mr-1`}>( {t("marketInterval." + interval)} )</span>
                </div>

                <div className={`row jc-center ai-center mr-1 fs-0-8`}>
                    {currencies?.map((currency) =>
                        <span className={`px-2 py-1 rounded-5 cursor-pointer hover-text ${classes.title} ${activeCurrency === currency && classes.active}`} onClick={() => setActiveCurrency(currency)} key={currency}>{t("currency." + currency)}</span>
                    )}
                </div>

            </div>
            <div className={`${classes.content} overflow-hidden`}>
                {content()}
            </div>
        </div>
    );
};

export default AllMarketInfo;
