import React, {useState} from 'react';
import classes from './TransactionHistoryTable.module.css'
import {useTranslation} from "react-i18next";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN} from "../../../../../../../../../../utils/utils";
import {images} from "../../../../../../../../../../assets/images";

const TransactionHistoryTable = ({txs, offset}) => {

    const [openItem, setOpenItem] = useState(null);
    const {t} = useTranslation();

    return  <div className={`${classes.striped} fs-0-9`}>
        {txs.map((tr, index) => {
            return (
                <div key={index} className={`column px-5 py-1 ${classes.row}`}
                     onClick={() => setOpenItem(openItem === index ? null : index)}
                >
                    <div className={`row jc-between ai-center my-1`}>
                        <div className={`row jc-start ai-center`}>
                            <span className={`fs-02 ${classes.circle} ml-1 flex jc-center ai-center`}>{index + offset + 1}</span>
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
                        <span className={`text-orange`}>{t('TransactionCategory.'+tr.category)}</span>
                        <div className={`row jc-end ai-center`}>
                            <span className={`ml-3`}>{t("volume")}:</span>
                            <div className={`row`}>
                                <span className={`fs-02`}>{new BN(tr?.amount).toFormat()}</span>
                                <span className={`fs-0-8 mr-1`}></span>
                            </div>
                        </div>
                    </div>
                    <div style={{display: openItem === index ? "revert" : "none"}} className={`column`}>
                        <div className={`row wrap jc-start ai-center width-100 my-1`}>
                            {(tr?.category === "DEPOSIT" || tr?.category === "WITHDRAW") ? "----" :
                                <>
                                    <span> {t('TransactionCategory.'+tr.category)}</span>
                                    <span className={`mr-1`}>{tr?.additionalData?.ask && t('sell')} {tr?.additionalData?.bid && t('buy')}</span>
                                    <span className={`mr-1`}>{new BN(tr?.additionalData?.origQuantity).toFormat()}</span>
                                    <span className={`mr-1`}>{t("currency." + tr?.additionalData?.pair?.leftSideName )}</span>
                                    <span className={`mr-1`}>{t("withPrice")}</span>
                                    <span className={`mr-1`}>{new BN(tr?.additionalData?.origPrice).toFormat()}</span>
                                    <span className={`mr-1`}>{t("currency." + tr?.additionalData?.pair?.rightSideName )}</span>
                                </>
                            }
                        </div>
                    </div>
                </div>

            )}
        )}
    </div>
};

export default TransactionHistoryTable;
