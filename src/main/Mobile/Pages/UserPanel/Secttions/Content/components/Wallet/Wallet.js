import React from "react";
import {useParams} from "react-router-dom";
import Deposit from "./components/Deposit/Deposit";
import Transaction from "./components/Transaction/Transaction";
import Withdrawal from "./components/withdrawal/withdrawal";

const Wallet = () => {
    const {path} = useParams()

    const content = () => {

        if (path === "deposit") return <Deposit/>

        if (path === "withdrawal") return <Withdrawal/>

        if (path === "transaction") return <Transaction/>

    }

    return (
        <div className={`width-100 flex ai-center jc-center height-100`}>
            {content()}
        </div>
    );
};

export default Wallet;
