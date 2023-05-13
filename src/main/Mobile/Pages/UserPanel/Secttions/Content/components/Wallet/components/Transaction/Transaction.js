import React from 'react';
import classes from "../Deposit/Deposit.module.css";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import IRTTx from "./components/DepositWithdrawTx/components/IRTTx/IRTTx";
import DepositWithdrawTx from "./components/DepositWithdrawTx/DepositWithdrawTx";

const Transaction = () => {

    const {id} = useParams();
    const {t} = useTranslation();
    return (
        <div className={`column jc-between ai-center text-center ${classes.content} card-bg card-border height-98 width-95`}>
            <div className="flex jc-center ai-center card-header-bg py-2 px-1 width-100">
                <h3>{t("DepositWithdrawTx.title")}</h3>
            </div>
            {id === "IRT" ? <IRTTx/> : <DepositWithdrawTx/>}
        </div>
    );
};

export default Transaction;
