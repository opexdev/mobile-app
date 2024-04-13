import React, {useState} from 'react';
import classes from './TransactionHistoryTable.module.css'
import {useTranslation} from "react-i18next";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN} from "../../../../../../../../../../utils/utils";
import {images} from "../../../../../../../../../../assets/images";
import {useSelector} from "react-redux";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import i18n from "i18next";

const TransactionHistoryTable = ({txs, offset}) => {

    const [openItem, setOpenItem] = useState(null);
    const {t} = useTranslation();

    const id = useSelector(state => state.auth.id);

    const txCategory = (category) => {
        switch (category) {
            case "DEPOSIT":
                return t("TransactionCategory.DEPOSIT");
            case "FEE":
                return t("TransactionCategory.FEE");
            case "TRADE":
                return t("TransactionCategory.TRADE");
            case "WITHDRAW":
                return t("TransactionCategory.WITHDRAW");
            case "WITHDRAW_REQUEST":
                return t("TransactionCategory.WITHDRAW_REQUEST");
            case "WITHDRAW_ACCEPT":
                return t("TransactionCategory.WITHDRAW_ACCEPT");
            case "WITHDRAW_REJECT":
                return t("TransactionCategory.WITHDRAW_REJECT");
            case "ORDER_CANCEL":
                return t("TransactionCategory.ORDER_CANCEL");
            case "ORDER_CREATE":
                return t("TransactionCategory.ORDER_CREATE");
            case "ORDER_FINALIZED":
                return t("TransactionCategory.ORDER_FINALIZED");
            case "PURCHASE_FINALIZED":
                return t("TransactionCategory.PURCHASE_FINALIZED");
            default:
                return t("TransactionCategory.ETC");
        }
    };

    const sideHandler = (category, takerDirection, makerDirection, isTaker, isMaker, ask, bid, num) => {
        if (category === "ORDER_CREATE" || category === "ORDER_CANCEL") {
            return  <span className={``}>{ask && t('sell')} {bid && t('buy')}</span>
        }
        if (((takerDirection === "ASK") || (makerDirection === "BID")) && isTaker && isMaker) {
            return <span className={``}>{t('TransactionHistory.selfTrade')}</span>
        }
        if (takerDirection === "ASK" && isTaker) {
            return <span className={``}>{t('sell')}</span>
        }
        if (makerDirection === "BID" && isMaker) {
            return <span className={``}>{t('buy')}</span>
        }
        if (makerDirection === "ASK" && isTaker) {
            return <span className={``}>{t('buy')}</span>
        }
        if (takerDirection === "BID" && isMaker) {
            return <span className={``}>{t('sell')}</span>
        }
        else {

        }
    }


    return  <div className={`${classes.striped} fs-0-9`}>
        {txs.map((tr, index) => {

            const isMaker = tr?.additionalData?.makerUuid === id
            const isTaker = tr?.additionalData?.takerUuid === id

            const isSelfTrade = (((tr?.additionalData?.takerDirection === "ASK") || ( tr?.additionalData?.makerDirection === "BID")) && isTaker && isMaker)

            return (
                <div key={index} className={`column px-5 py-1 ${classes.row}`}
                     onClick={() => setOpenItem(openItem === index ? null : index)}
                >
                    <div className={`row jc-between ai-center my-1`}>
                        <div className={`row jc-start ai-center`}>
                            <span className={`fs-02 ${classes.circle} ml-1 flex jc-center ai-center pl-2`}>{index + offset + 1}</span>
                            <span className={`mr-1`}><Date date={tr.date}/> , {moment(tr.date).format("HH:mm:ss")}</span>
                        </div>
                        <div className={`row jc-end ai-center`}>
                            <span className={`ml-3`}>{t("TransactionHistory.coin")}:</span>
                            <div className={`row jc-center ai-center`}>
                                <span className={`ml-1`}>{t("currency." + tr.currency )}</span>
                                <span className={`fs-0-8 mr-1`}> <img
                                    className={`img-sm flex`}
                                    src={images[tr.currency]}
                                    alt={tr.currency}
                                    title={tr.currency}
                                /> </span>
                            </div>
                        </div>
                    </div>
                    <div className={`row jc-between ai-center my-1`}>
                        <span className={`font-weight-bold`}>{txCategory(tr.category)}</span>
                        <div className={`row jc-end ai-center`}>
                            <span className={`ml-3`}>{t("volume")}:</span>
                            <div className={`row ${i18n.language !== "fa" ? 'row-reverse jc-end' : 'row jc-start'} `}>
                                <span className={`${i18n.language !== "fa" ? 'mr-1' : 'ml-1'}`}>{new BN(tr?.amount).toFormat() }</span>

                                {
                                    ( (tr?.category === "TRADE") && isSelfTrade) ? "" : <>
                                        {
                                            (tr?.category !== "WITHDRAW_REQUEST" && tr?.category !== "WITHDRAW_REJECT" && tr?.category !== "WITHDRAW_ACCEPT" && tr?.category !== "ORDER_CREATE" && tr?.category !== "ORDER_CANCEL" )
                                            && <div className={`row`}>{tr?.withdraw ? '-' : '+'}</div>
                                        }
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                    <div style={{display: openItem === index ? "revert" : "none"}} className={`column`}>
                        <div className={`row wrap jc-start ai-center width-100 my-1`}>
                            {(
                                tr?.category === "FEE" ||
                                tr?.category === "TRADE" ||
                                tr?.category === "ORDER_CANCEL" ||
                                tr?.category === "ORDER_CREATE"  ||
                                tr?.category === "ORDER_FINALIZED" )

                                ?
                                <>

                                    { (tr?.category === "FEE") ? <span className={`ml-1`}>{t("TransactionHistory.forFee")}</span> : ""}
                                    { sideHandler(tr?.category, tr?.additionalData?.takerDirection, tr?.additionalData?.makerDirection, isTaker, isMaker, tr?.additionalData?.ask, tr?.additionalData?.bid, (index + offset + 1))}

                                    <span className={`mr-1`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                    <span className={`mr-1`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                    <span className={`mr-1`}>{t("withPrice")}</span>
                                    <span className={`mr-1`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                    <span className={`mr-1`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>


                                    { (tr?.category === "TRADE" && !isSelfTrade) || (tr?.category === "FEE") || (tr?.category === "ORDER_FINALIZED") ? <div className={`width-100 row jc-between pt-1 mt-2 fs-0-8 ${classes.bottomNav}`}>

                                         <span>{t("TransactionHistory.balanceStatus")}:</span>

                                        <div className={`row ${tr?.withdraw ? 'text-red' : 'text-green'}`}><span className={`ml-05`}>{t("currency." + tr.currency )}</span><Icon iconName={`${tr?.withdraw ? 'icon-down' : 'icon-up'} flex`} customClass={`flex jc-center ai-center`}/></div>

                                    </div>: ""}

                                </>
                                 : "----"
                            }
                        </div>
                    </div>
                </div>

            )}
        )}
    </div>
};

export default TransactionHistoryTable;
