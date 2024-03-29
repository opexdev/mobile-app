import React from 'react';
import classes from './GeneralInfo.module.css'
import {useTranslation} from "react-i18next";
import {useGetExchangeInfo} from "../../../../../../queries";
import Loading from "../../../../../../components/Loading/Loading";
import Error from "../../../../../../components/Error/Error";

const GeneralInfo = () => {

    const {t} = useTranslation();

    const interval = "1Y"
    const {data, isLoading, error} = useGetExchangeInfo(interval)


    const content = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        else return <>
            <div className={`column jc-center ai-center width-33`}>
                <span className={`fs-02`}>{data?.activeUsers?.toLocaleString()} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.activeUsers")}</span>
            </div>
            <div className={`column jc-center ai-center width-33`}>
                <span className={`fs-02`}>{data?.totalOrders?.toLocaleString()} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.totalOrders")}</span>
            </div>
            <div className={`column jc-center ai-center width-33`}>
                <span className={`fs-02`}>{data?.totalTrades?.toLocaleString()} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.totalTrades")}</span>
            </div>
        </>
    }

    return (
        <div className={`${classes.container} width-90 card-border row jc-between ai-center card-bg px-1 py-2`}>
            {content()}
        </div>
    );
};

export default GeneralInfo;
