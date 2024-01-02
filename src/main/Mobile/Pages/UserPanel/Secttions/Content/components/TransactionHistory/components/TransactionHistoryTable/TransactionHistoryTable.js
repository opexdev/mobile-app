import React, {useState} from 'react';
import classes from './TransactionHistoryTable.module.css'
import {useTranslation} from "react-i18next";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN} from "../../../../../../../../../../utils/utils";
import {images} from "../../../../../../../../../../assets/images";
import {useSelector} from "react-redux";

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
            case "ORDER_CANCEL":
                return t("TransactionCategory.ORDER_CANCEL");
            case "ORDER_CREATE":
                return t("TransactionCategory.ORDER_CREATE");
            case "ORDER_FINALIZED":
                return t("TransactionCategory.ORDER_FINALIZED");
            default:
                return t("TransactionCategory.ETC");
        }
    };

    return  <div className={`${classes.striped} fs-0-9`}>
        {txs.map((tr, index) => {

            const isMaker = tr?.additionalData?.makerUuid === id
            const isTaker = tr?.additionalData?.takerUuid === id

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
                        <span className={`text-orange`}>{txCategory(tr.category)}</span>
                        <div className={`row jc-end ai-center`}>
                            <span className={`ml-3`}>{t("volume")}:</span>
                            <div className={`row`}>
                                <span className={`fs-02`}>
                                    {(tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "TRADE") ? "+ " :""}
                                    {(tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "TRADE") ? "- " :""}
                                    {(tr?.category === "FEE") ? "- " :""}

                                    {new BN(tr?.amount).toFormat()}

                                </span>
                                <span className={`fs-0-8 mr-1`}></span>

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
                                    <span> {t('TransactionCategory.'+tr.category)}</span>

                                    {tr?.category === "ORDER_CREATE" &&

                                        <span className={`mr-1`}>{tr?.additionalData?.ask && t('sell')} {tr?.additionalData?.bid && t('buy')}</span>
                                    }

                                    {tr?.additionalData?.takerDirection === "ASK" && isTaker ? <span className={`mr-1`}>{t('sell')}</span> : ""}
                                    {tr?.additionalData?.makerDirection === "BID" && isMaker ? <span className={`mr-1`}>{t('buy')}</span> : ""}

                                    <span className={`mr-1`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                    <span className={`mr-1`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                    <span className={`mr-1`}>{t("withPrice")}</span>
                                    <span className={`mr-1`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                    <span className={`mr-1`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>


                                    <div className={`width-100 row jc-start text-orange pt-1 mt-2 fs-0-7 ${classes.bottomNav}`}>

                                        { (tr?.wallet === "main") && (tr?.withdraw === true) && (tr?.category !== "FEE") ? <span>{t("TransactionHistory.assetBlock")}</span> : ""}
                                        { (tr?.wallet === "exchange") && (tr?.withdraw === false) ? <span>{t("TransactionHistory.readyToExchange")}</span> : ""}
                                        { (tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "TRADE") ? <span className={`text-green`}>{t("TransactionHistory.increaseWallet")}</span> : ""}
                                        { (tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "TRADE") ? <span className={`text-red`}>{t("TransactionHistory.decreaseWallet")}</span> : ""}
                                        { (tr?.category === "FEE") ? <span className={`text-red`}>{t("TransactionHistory.decreaseWallet")}</span> : ""}
                                        { (tr?.wallet === "main") && (tr?.withdraw === false) && (tr?.category === "ORDER_CANCEL") ? <span>{t("TransactionHistory.assetUnBlocked")}</span> : ""}
                                        { (tr?.wallet === "exchange") && (tr?.withdraw === true) && (tr?.category === "ORDER_CANCEL") ? <span>{t("TransactionHistory.cancelExchange")}</span> : ""}
                                        { (tr?.category === "ORDER_FINALIZED") ? <span>{t("TransactionHistory.finished")}</span> : ""}

                                    </div>

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
