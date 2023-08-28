import React, {useEffect, useRef, useState} from 'react';
import classes from './Deposit.module.css'
import {useTranslation} from "react-i18next";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import {useParams} from "react-router-dom";
import {useGetCurrencyInfo} from "../../../../../../../../../../queries";
import {toast} from "react-hot-toast";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import Address from "./components/Address/Address";


const Deposit = () => {

    const {id} = useParams();
    const {t} = useTranslation();

    useEffect(() => {
        toast.dismiss()
    }, [])

    const [networkName, setNetworkName] = useState({value: 0, error: []});

    const selectRef = useRef()
    const {data: currencyInfo, isLoading: CILoading, error: CIError, refetch: refetchCI} = useGetCurrencyInfo(id)

    useEffect(() => {
        setNetworkName({value: 0, error: []})

    }, [id]);

    useEffect(() => {
        if (id !== "IRT") refetchCI()
    }, [id]);


   // if (id === "IRT") return <IRTDeposit/>
    if (id === "IRT") return <div className={`flex jc-center ai-center card-bg card-border height-98 width-95`}><h3>{t("comingSoon")}</h3></div>
    if (CILoading) return <div className={`card-bg card-border height-98 width-95`}><Loading/></div>
    if (CIError) return <div className={`card-bg card-border height-98 width-95`}><Error/></div>


    return (
        <div className={`px-3 py-3 column jc-start ai-center text-center ${classes.content} card-bg card-border height-98 width-95`}>
            <TextInput
                select={true}
                placeholder={t('DepositWithdraw.selectNetwork')}
                options={currencyInfo?.chains.map((chain, index) => {
                    return {value: index, label: `${chain.network} - ${chain.currency}`}
                })}
                lead={t('DepositWithdraw.network')}
                type="select"
                value={currencyInfo?.chains[networkName.value] && {
                    value: networkName.value,
                    label: `${currencyInfo?.chains[networkName.value].network} - ${currencyInfo?.chains[networkName.value].currency}`
                }}
                onchange={(e) => setNetworkName({value: e?.value || 0, error: []})}
                customRef={selectRef}
                alerts={networkName.error}
                customClass={`width-100 ${classes.thisInput}`}
            />
            { currencyInfo && <Address network={currencyInfo?.chains[networkName?.value]?.network}/>}
        </div>
    );
};

export default Deposit;
