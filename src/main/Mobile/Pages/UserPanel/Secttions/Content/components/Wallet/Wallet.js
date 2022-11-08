import React from "react";
import {useTranslation} from "react-i18next";
import {useLocation, useParams} from "react-router-dom";
import Deposit from "./components/Deposit/Deposit";
import Transaction from "./components/Transaction/Transaction";
import Withdrawal from "./components/withdrawal/withdrawal";

const Wallet = () => {

    const {t} = useTranslation();
    const location = useLocation();
    const {path} = useParams()

    const content = () => {

        if (path === "deposit") {
            return <Deposit/>
        }
        if (path === "withdrawal") {
            return <Withdrawal/>
        }
        if (path === "transaction") {
            return <Transaction/>
        }

    }

    return (
        <div className={`width-100 flex ai-center jc-center`} style={{height:"100%"}}>
            {content()}
        </div>
    );
};

export default Wallet;
