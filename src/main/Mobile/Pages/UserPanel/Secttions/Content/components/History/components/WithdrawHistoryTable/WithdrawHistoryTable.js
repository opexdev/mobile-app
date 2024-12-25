import React, {useState} from 'react';
import classes from './WithdrawHistoryTable.module.css'
import {useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN, shortenHash} from "../../../../../../../../../../utils/utils";
import Button from "../../../../../../../../../../components/Button/Button";
import {useGetWithdrawHistory} from "../../../../../../../../../../queries";
import {cancelWithdrawReq} from "js-api-client";
import Loading from "../../../../../../../../../../components/Loading/Loading";
import Icon from "../../../../../../../../../../components/Icon/Icon";

const WithdrawHistoryTable = ({data, query}) => {

    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const {refetch} = useGetWithdrawHistory(query);


    const copyToClipboard = (e, value) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(value)
        toast.success(t("DepositWithdraw.copy"));
    }

    const cancelWithdrawReqButtonTextHandler = () => {
        if (isLoading) return <Loading type="linear"/>
        return t('history.cancelWithdrawReq')
    }

    const cancelWithdrawReqFunc = (withdrawId) => {

        if (isLoading) return
        setIsLoading(true)

        cancelWithdrawReq(withdrawId)
            .then(() => {
                toast.success(t('history.cancelWithdrawReqSuccess'));
                refetch()
            })
            .catch((err) => {
                toast.error(t("userPage.serverError"))
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div className={`width-100 px-4 py-2 columns jc-between ai-center ${classes.container} ${classes.striped}`} >
            <div className={`width-100 column jc-between ai-center ${classes.rectangle}`} onClick={ ()=> setIsOpen(prevState => !prevState)}>
                <div className={`width-100 row jc-between ai-center`}>
                    <div className={`row`}>
                        <span><Date date={data?.createDate}/></span>
                        <span className={`${classes.spacing}`}/>
                        <span className={``}>{moment.utc(data?.createDate).local().format("HH:mm:ss")}</span>
                    </div>

                    <span className={`row jc-center ai-center`}>{t("HistoryStatus."+ data?.status)}</span>

                    {/*<span className={`row jc-center ai-center`}>{moment(data?.date).format("HH:mm:ss")}</span>*/}
                </div>

                <div className={`width-100 row jc-between ai-center`}>
                    <span>{data?.network}</span>
                    <div className={`direction-ltr row text-red`} style={{alignItems:"baseline"}}>
                        <span className={`fs-03`}>{new BN(data?.amount).toFormat()}</span>
                        <span className={`${classes.spacing}`}/>
                        <span>{data?.currency}</span>

                    </div>
                </div>

                {/*<div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.type")}</span>
                    <span>{t("HistoryType."+ data?.type)}</span>
                </div>*/}

            </div>

            {isOpen && <div className={`width-100 column jc-start ai-start mt-2 ${classes.rectangle}`}>

                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.lastUpdateDate")}</span>
                    <span>
                        {
                            data?.lastUpdateDate ? <>
                                <span className={``}>{moment.utc(data?.lastUpdateDate).local().format("HH:mm:ss")} - </span>
                                <Date date={data?.lastUpdateDate}/>
                            </> : "- - -"
                        }
                    </span>
                </div>

                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.appliedFee")}</span>

                    { data?.appliedFee ? <div className={`direction-ltr row`} style={{alignItems:"baseline"}}>
                        <span className={``}>{new BN(data?.amount).toFormat()}</span>
                        <span className={`${classes.spacing}`}/>
                        <span className={`fs-0-8`}>{data?.currency}</span>

                    </div> : <span>{"- - -"}</span>}

                </div>



                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.destAddress")}</span>
                    <span>{data?.destAddress ?
                        <div className={`row`}>
                            <span
                                data-html={true}
                                data-place="bottom"
                                data-effect="float"
                                data-tooltip-place="top"
                                data-tooltip-id="polban-tooltip"
                                data-tooltip-float={true}
                                data-tooltip-html={`<span class="column jc-between">${data?.destAddress}</span>`}
                                className={`${classes.name} direction-ltr`}
                            >{shortenHash(data?.destAddress) }</span>
                            <Icon
                                iconName="icon-copy fs-02"
                                iconClass={`cursor-pointer mr-025 hover-text`}
                                onClick={(e) => copyToClipboard(e, data?.destAddress)}
                            />

                        </div>
                        : "- - -"}</span>

                </div>

                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.transactionRef")}</span>
                    <span>{data?.destTransactionRef ?
                        <div className={`row`}>
                            <span
                                data-html={true}
                                data-place="bottom"
                                data-effect="float"
                                data-tooltip-place="top"
                                data-tooltip-id="polban-tooltip"
                                data-tooltip-float={true}
                                data-tooltip-html={`<span class="column jc-between">${data?.destTransactionRef}</span>`}
                                className={`${classes.name} direction-ltr`}
                            >{shortenHash(data?.destTransactionRef) }</span>
                            <Icon
                                iconName="icon-copy fs-02"
                                iconClass={`cursor-pointer mr-025 hover-text`}
                                onClick={(e) => copyToClipboard(e, data?.destTransactionRef)}
                            />

                        </div>
                        : "- - -"}</span>
                </div>


                <div className={`width-100 column jc-start ai-start mt-05`}>
                    <span>{t("history.statusReason")}</span>
                    <span>
                        {
                            data?.statusReason ? data?.statusReason : "- - -"
                        }
                    </span>
                </div>

                { data?.status === "CREATED" && <div className={`width-100 column jc-start ai-start mt-05`}>
                    <Button
                        buttonClass={`${classes.thisButton} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                        buttonTitle={cancelWithdrawReqButtonTextHandler()}
                        type="button"
                        onClick={()=>cancelWithdrawReqFunc(data.withdrawId)}
                    />
                </div> }

            </div>}


        </div>
    );
};

export default WithdrawHistoryTable;
