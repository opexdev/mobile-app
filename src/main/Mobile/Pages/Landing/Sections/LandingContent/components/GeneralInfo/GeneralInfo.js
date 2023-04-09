import React from 'react';
import classes from './GeneralInfo.module.css'
import {useTranslation} from "react-i18next";
import {useGetExchangeInfo} from "../../../../../../../../queries";
import Loading from "../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../components/Error/Error";

const GeneralInfo = () => {

    const {t} = useTranslation();

    const interval = "1Y"
    const {data, isLoading, error} = useGetExchangeInfo(interval)


    const content = () => {
        if (isLoading) return <Loading/>
        if (error) return <Error/>
        else return <>
            <div className={`column jc-center ai-center`}>
                <span className={`fs-02`}>{data.activeUsers} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.activeUsers")}</span>
            </div>
            <div className={`column jc-center ai-center`}>
                <span className={`fs-02`}>{data.totalOrders} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.totalOrders")}</span>
            </div>
            <div className={`column jc-center ai-center`}>
                <span className={`fs-02`}>{data.totalTrades} </span>
                <span className={`fs-0-7`}>{t("GeneralInfo.totalTrades")}</span>
            </div>
        </>
    }

    return (
        <div className={`${classes.container} width-90 card-border row jc-between ai-center card-bg px-5 py-1`}>
            {content()}
        </div>
    );
};

export default GeneralInfo;