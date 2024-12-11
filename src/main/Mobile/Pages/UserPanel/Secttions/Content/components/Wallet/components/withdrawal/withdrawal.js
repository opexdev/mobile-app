import React, {useEffect, useRef, useState} from 'react';
import classes from './withdrawal.module.css'
import {useParams} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import {useGetUserAccount} from "../../../../../../../../../../queries/hooks/useGetUserAccount";
import {
    useGetCurrencyInfo,
    useGetUserAssets,
    useGetUserAssetsEstimatedValue,
    useWithdrawTxs
} from "../../../../../../../../../../queries";
import {BN, parsePriceString} from "../../../../../../../../../../utils/utils";
import {sendWithdrawReq} from "js-api-client";
import {toast} from "react-hot-toast";
import {images} from "../../../../../../../../../../assets/images";
import ReactTooltip from "react-tooltip";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Error from "../../../../../../../../../../components/Error/Error";
import NumberInput from "../../../../../../../../../../components/NumberInput/NumberInput";
import TextInput from "../../../../../../../../../../components/TextInput/TextInput";
import Button from "../../../../../../../../../../components/Button/Button";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import {useGetWithdrawHistory} from "../../../../../../../../../../queries/hooks/useGetWithdrawHistory";

const Withdrawal = () => {

    const {t} = useTranslation();
    const {id} = useParams();

    const [amount, setAmount] = useState({value: 0, error: []});
    const [networkName, setNetworkName] = useState({value: 0, error: []});
    const [address, setAddress] = useState({value: "", error: []});
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        toast.dismiss()
    }, [])

    useEffect(() => {
        setNetworkName({value: 0, error: []})
        setAmount({value: 0, error: []})
        setAddress({value: "", error: []})
        validation()
    }, [id]);

    const {refetch: getUserAccount} = useGetUserAccount();
    const {refetch: getWithdrawTxs} = useWithdrawTxs(id);
    const {refetch: getUserAssets} = useGetUserAssets("IRT");
    const {refetch: getUserAssetsEstimatedValue} = useGetUserAssetsEstimatedValue("IRT");

    const query = {
        "currency": id, // optional
        "category": null, // optional [DEPOSIT, FEE, TRADE, WITHDRAW, ORDER_CANCEL, ORDER_CREATE, ORDER_FINALIZED]
        "startTime": null,
        "endTime": null,
        "ascendingByTime": false,
        "limit": 10,
        "offset": 0,
    }

    const {refetch: getWithdrawHistory} = useGetWithdrawHistory(query);

    const {data: userAccount} = useGetUserAccount()
    const freeAmount = userAccount?.wallets[id]?.free || 0

    const {data:currencyInfo, isLoading:CILoading, error:CIError} = useGetCurrencyInfo(id)

    const tooltip = useRef()
    const selectRef = useRef()





    const withdrawFee = new BN(currencyInfo?.chains[networkName.value]?.withdrawFee).toFormat()


    const pasteFromClipboard = (e) => {
        e.preventDefault();
        if (navigator.clipboard !== undefined) {
            navigator.clipboard.readText()
                .then(text => {
                    setAddress({...address, value: text})
                    toast.success(t('DepositWithdraw.paste'));
                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                });
        }
        else return toast.error(t('error'));

    }

    const validation = () => {
        if (new BN(amount.value).isGreaterThan(freeAmount)) {
            return t('DepositWithdraw.noInventory')



            // return toast.error(t('DepositWithdraw.noInventory'));
        }
        if (new BN(amount.value).minus(withdrawFee).isLessThanOrEqualTo(0)) {
            return t('DepositWithdraw.allowableWithdraw')
        }
        /*if (currencyInfo?.chains[networkName.value]) {
            return t('DepositWithdraw.fillNetwork')
        }*/
        if (address.value.length <= 0) {
            return t('DepositWithdraw.fillAddress')
        }
    }

    const sendWithdrawHandler = async (e) => {
        e.preventDefault()
        if(isLoading) return
        setIsLoading(true)

        const withdrawRequestData = {
            "currency": currencyInfo?.chains[networkName.value]?.currency,
            "amount": amount.value,
            "destSymbol": currencyInfo?.chains[networkName.value]?.currency,
            "destAddress": address.value,
            "destNetwork": currencyInfo?.chains[networkName.value]?.network,
            /*"destNote": "Personal wallet", //Optional
            "description": "Withdrawal to personal wallet" //Optional*/
        }


        sendWithdrawReq(withdrawRequestData)
            .then(() => {
                setNetworkName({value: 0, error: []})
                setAmount({value: 0, error: []})
                setAddress({value: "", error: []})
                toast.success(<Trans
                    i18nKey="DepositWithdrawTx.success"
                    values={{
                        asset: t("currency." + id),
                        amount: amount.value,
                    }}
                />);
                getUserAccount()
                /*getWithdrawTxs()*/
                getWithdrawHistory()
                getUserAssets()
                getUserAssetsEstimatedValue()
            })
            .catch(() => {
                toast.error(t('error'));
            })
            .finally(() => setIsLoading(false))
    }

    const submitButtonTextHandler = () => {
        if (isLoading) return <img className={`${classes.thisLoading}`} src={images.linearLoadingBgOrange}
                                   alt="linearLoading"/>
        return t('DepositWithdrawTx.withdrawReqSubmit')
    }
    const fillByWallet = () => {
        setAmount({
            value: freeAmount,
            error: []
        })
    };
    const fillByMinWithdraw = () => {
        setAmount({
            value: new BN(currencyInfo?.chains[networkName.value]?.minWithdraw).plus(withdrawFee).toString(),
            error: []
        })
    };

    const enableButton = !(new BN(amount.value).minus(withdrawFee).isGreaterThan(0)) || new BN(amount.value).isGreaterThan(freeAmount) || address.value.length <= 0

    useEffect(() => {
        ReactTooltip.rebuild();
    }, [enableButton]);

    useEffect(() => {
        ReactTooltip.hide(tooltip.current)
    }, [enableButton]);

    if (id === "IRT") {
        return <div className={`flex jc-center ai-center card-bg card-border height-98 width-95`}><h3>{t("comingSoon")}</h3></div>
    }

    const content = () => {
        if (CILoading) return <Loading/>
        if (CIError) return <Error/>
        else return <form onSubmit={(e)=>sendWithdrawHandler(e)} className={`px-2 py-1 column jc-between height-100 ${classes.content}`}>

            <div className={`column mb-2`}>
                <div className={`row jc-between ai-center`}>
                    <span className={`my-05`}>{t("DepositWithdrawTx.freeWallet")}: </span>
                    <span className={`hover-text cursor-pointer`} onClick={() => {fillByWallet()}}>{freeAmount} {t("currency." + id)}</span>
                </div>
                <div className={`row jc-between ai-center`}>
                    <span className={`my-05`}>{t('DepositWithdrawTx.minWithdraw')}: </span>
                    <span className={`hover-text cursor-pointer`} onClick={() => {fillByMinWithdraw()}}> {new BN(currencyInfo?.chains[networkName.value]?.minWithdraw).plus(withdrawFee).toString()} {t("currency." + id)} </span>
                </div>
                <div className={`row jc-between ai-center`}>
                    <span className={`my-05`}>{t('DepositWithdrawTx.maxWithdraw')}: </span>
                    <span>2 {t("currency." + id)}</span>
                </div>
                <div className={`row jc-between ai-center`}>
                    <span className={`my-05`}>{t('DepositWithdrawTx.maxMonthWithdraw')}: </span>
                    <span>2 {t("currency." + id)}</span>
                </div>
            </div>


            <TextInput
                select={true}
                placeholder={t('DepositWithdraw.selectNetwork')}
                options={currencyInfo?.chains.map((chain,index) => {return {value: index, label: `${chain.network} - ${chain.currency}` }})}
                lead={t('DepositWithdraw.network')}
                type="select"
                value={currencyInfo?.chains[networkName.value] && {value: networkName.value, label: `${currencyInfo?.chains[networkName.value].network} - ${currencyInfo?.chains[networkName.value].currency}` }}
                onchange={(e) => setNetworkName({value: e?.value || 0, error: []})}
                customRef={selectRef}
                alerts={networkName.error}
                customClass={`${classes.withdrawalSmallInput} `}
            />
            <NumberInput
                lead={t('volume') + " " + t("currency." + id)}
                value={amount.value.toString()}
                alerts={amount.error}
                customClass={`${classes.withdrawNumberInput} my-2`}
                onchange={(e) =>
                    setAmount({...amount, value: parsePriceString(e.target.value)})
                }
                type="text"
            />

            <div className="column">
                <div className={`row jc-between mb-05`}>
                     <span>{t("DepositWithdrawTx.destAddress") + " " + t("currency." + id)}</span>
                    <Icon
                        iconName="icon-paste fs-02"
                        onClick={(e) => pasteFromClipboard(e)}
                        customClass={`hover-text cursor-pointer`}
                    />
                </div>
                <TextInput
                    //lead={t("DepositWithdrawTx.destAddress") + " " + t("currency." + id)}
                    customClass={`${classes.withdrawalInput} `}
                    type="text"
                    value={address.value}
                    alerts={address.error}
                    onchange={(e) => setAddress({...address, value: e.target.value})}
                />
                <span className="pt-05 text-end fs-0-7">{t('DepositWithdrawTx.withdrawWarn')}</span>
            </div>


            <div className={`column`}>
                <div className={`row jc-between ai-center`}>
                    <span className={`my-05`}>{t('commission')}: </span>
                    <span>
                        <span className={`text-orange`}> {withdrawFee? withdrawFee : 0} </span>
                        <span>{t("currency." + id)}</span>
                    </span>


                </div>
                <div className={`row jc-between ai-center`}>
                    <span className={`my-05`}>{t('DepositWithdrawTx.reqAmount')}: </span>
                    <span>
                        <span className={`text-green ml-1`}> {new BN(amount.value).minus(withdrawFee).isGreaterThan(0) ? new BN(amount.value).minus(withdrawFee).toFormat() : 0}</span>
                        <span>{t("currency." + id)}</span>
                    </span>
                </div>
            </div>


            <div className="fs-0-7" style={{lineHeight:"2.5vh"}}>
                <span>{t('DepositWithdraw.securityConsiderations')}</span>
            </div>

            <span
                ref={tooltip}
                style={{width: "100%"}}
                data-html={true}
                data-place="top"
                data-effect="float"
                data-tip={enableButton ? `<span class="column jc-between col-100 text-red fs-01">${validation()}</span>` : ""}
            >
                <Button
                    buttonClass={`${classes.thisButton} ${classes.withdrawal} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} width-100`}
                    buttonTitle={submitButtonTextHandler()}
                    disabled={!(new BN(amount.value).minus(withdrawFee).isGreaterThan(0)) || new BN(amount.value).isGreaterThan(freeAmount) || address.value.length <= 0}
                    //onClick={}
                    type="submit"
                />
            </span>

        </form>
    }



    return (
        <div className={`card-bg card-border height-98 width-95`}>
            {content()}
        </div>
    );
};

export default Withdrawal;
