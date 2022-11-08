import React from "react";
import classes from "./TradingView.module.css";
import AccordionBox from "../../../../../../../../../../components/AccordionBox/AccordionBox";
import {useTranslation} from "react-i18next";
import MarketChart from "./components/MarketChart/MarketChart";

const TradingView = () => {
    const {t} = useTranslation();

    /*const charts = [
        {title: t("charts.globalChart"), body: <MarketChart/>},
        {title: t("charts.opexChart"), body: <MarketChart type="Opex"/>},
    ];*/
    const charts = [
        {title: t("charts.globalChart"), body: ""},
        {title: t("charts.opexChart"), body: ""},
    ];

    return (
        <div className={`width-100 ${classes.container} card-bg card-border`}>
            <AccordionBox
                title={t("charts.title")}
                content={charts}
            />
        </div>
    );
};

export default TradingView;