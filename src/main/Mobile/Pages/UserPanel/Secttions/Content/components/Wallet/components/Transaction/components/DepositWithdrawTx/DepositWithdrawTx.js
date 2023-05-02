import React, {useLayoutEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDepositTxs, useWithdrawTxs} from "../../../../../../../../../../../../queries";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../../../components/Error/Error";
import DepositWithdrawTxTables from "./components/DepositWithdrawTxTables/DepositWithdrawTxTables";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";

const DepositWithdrawTx = () => {

    const {id} = useParams();
    const {t} = useTranslation();
    const [txs, setTxs] = useState([]);

    const {data: deposit, isLoading: depositIsLoading, error: depositError} = useDepositTxs(id);
    const {data: withdraw, isLoading: withdrawIsLoading, error: withdrawError} = useWithdrawTxs(id);

    useLayoutEffect(() => {
        if (!deposit || !withdraw) {
            return
        }
        const newTxs = [...deposit, ...withdraw];
        setTxs(newTxs.sort((a, b) => b.time - a.time))

    }, [deposit, withdraw]);

    if (depositIsLoading || withdrawIsLoading) return <Loading/>
    if (depositError || withdrawError) return <Error/>

    if (txs.length === 0) return <div className="width-100 height-100 flex ai-center jc-center">{t("noTx")}</div>


    return (
        <ScrollBar>
            <DepositWithdrawTxTables txs={txs} id={id}/>
        </ScrollBar>
    );
};

export default DepositWithdrawTx;
