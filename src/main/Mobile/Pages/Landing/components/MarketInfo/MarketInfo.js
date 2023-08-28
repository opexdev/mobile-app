import React, {useState} from 'react';
import classes from './MarketInfo.module.css'
import Title from "../../../../../../components/Title/Title";
import {Link} from "react-router-dom";
import Icon from "../../../../../../components/Icon/Icon";
import * as Routes from "../../../../Routes/routes";
import MarketInfoTable from "./components/MarketInfoTable/MarketInfoTable";
import {useGetQuoteCurrencies, useOverview} from "../../../../../../queries";
import Loading from "../../../../../../components/Loading/Loading";
import Error from "../../../../../../components/Error/Error";
import MarketInfoCard from "./components/MarketInfoCard/MarketInfoCard";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const MarketInfo = () => {
    const {t} = useTranslation();
    const [card, setCard] = useState(false)
    const [activeCurrency, setActiveCurrency] = useState("")

    const interval = "24h"
    const quote = activeCurrency === "" ? null : activeCurrency

    const {data: overview, isLoading, error} = useOverview(null, interval, quote)
    const {data: currencies} = useGetQuoteCurrencies()

    const content = () => {
        if (isLoading) return <div style={{height: "40vh"}}><Loading/></div>
        if (error) return <div style={{height: "40vh"}}><Error/></div>
        else return <>
            {card ?
                <MarketInfoCard data={overview.slice(0, 5)} activeCurrency={activeCurrency}/>
                :
                <MarketInfoTable data={overview.slice(0, 5)} activeCurrency={activeCurrency}/>
            }
        </>
    }

    return (
        <div className={`column py-2`} style={{backgroundColor: "var(--mainContent)"}}>
            <span className={`width-90 m-auto row jc-between ai-center pb-2`}>
                <div className={`row jc-center ai-center`}>
                     <Title title={`${t("market.title")}`}/>
                    {/*<span className={`fs-0-8 mr-025`}>( {t("marketInterval." + interval)} )</span>*/}
                </div>

                <div className={`row jc-center ai-center cursor-pointer hover-text`}>
                        <Link to={Routes.AllMarket} className={`ml-05 hover-text`}>{t("MarketInfo.viewAllMarket")}</Link>
                        <Icon
                              iconName={`${i18n.language !== "fa" ? 'icon-right-open-1' : 'icon-left-open-1'} fs-01 flex`}
                              className={`mr-05`}/>
                    </div>

            </span>

            <div className={`${classes.container} card-bg card-border width-90 m-auto my-2`}>
                <div className={`${classes.header} card-header-bg row jc-between ai-center px-3 py-2`}>

                    <div className={`row jc-center ai-baseline mr-05 ml-1 cursor-pointer hover-text`} onClick={()=>setActiveCurrency("")}>
                        <h2 className={`ml-025`}>{t("market.title")}</h2>
                        <span className={`fs-0-8 mr-025`}>( {t("marketInterval." + interval)} )</span>
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
        </div>
    );
};

export default MarketInfo;
