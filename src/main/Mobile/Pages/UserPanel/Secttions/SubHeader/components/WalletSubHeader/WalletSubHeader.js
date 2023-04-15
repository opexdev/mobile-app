import React from 'react';
import classes from './WalletSubHeader.module.css'
import {useParams} from "react-router-dom";
import {useGetUserAssets} from "../../../../../../../../queries";
import {useTranslation} from "react-i18next";
import {useGetUserAccount} from "../../../../../../../../queries/hooks/useGetUserAccount";
import {BN} from "../../../../../../../../utils/utils";

const WalletSubHeader = () => {

    const {id} = useParams()
    const {t} = useTranslation()
    const refCurrency = window.env.REACT_APP_REFERENCE_FIAT_CURRENCY
    const {data: userAccount} = useGetUserAccount()

    const {data: estimateValue , isLoading, error} = useGetUserAssets(refCurrency)
    const allEstimateValue = (isLoading || error) ?  0 : (estimateValue?.find( q => q.asset === id ))

    return (
        <div className={`my-1 row`}>

            <div className={`col-35 column ai-center`}>
                <span className={`mb-05 text-center`}>{t("header.free")}</span>
                <span className={`mt-05`}>{new BN(userAccount?.wallets[id]?.free || 0).toFormat()}</span>
                <span className={`fs-0-7 text-gray`}> ( {refCurrency === id ? new BN(userAccount?.wallets[id]?.free || 0).toFormat() : new BN(allEstimateValue?.free || 0).toFormat()} {t("currency."+refCurrency)} )</span>
            </div>
            <div className={`col-35 column ai-center ${classes.border}`}>
                <span className={`mb-05 text-center`}>{t("header.locked")}</span>
                <span className={`mt-05`}>{new BN(userAccount?.wallets[id]?.locked || 0).toFormat()}</span>
                <span className={`fs-0-7 text-gray`}> ( {refCurrency === id ? new BN(userAccount?.wallets[id]?.locked || 0).toFormat() : new BN(allEstimateValue?.locked || 0).toFormat()} {t("currency."+refCurrency)} )</span>
            </div>
            <div className={`col-35 column ai-center`}>
                <span className={`mb-05 text-center`}>{t("header.inWithdrawalProcess")}</span>
                <span className={`mt-05`}>{new BN(userAccount?.wallets[id]?.withdraw || 0).toFormat()}</span>
                <span className={`fs-0-7 text-gray`}> ( {refCurrency === id ? new BN(userAccount?.wallets[id]?.withdraw || 0).toFormat() : new BN(allEstimateValue?.withdrawing || 0).toFormat()} {t("currency."+refCurrency)} )</span>
            </div>
        </div>
    );
};

export default WalletSubHeader;