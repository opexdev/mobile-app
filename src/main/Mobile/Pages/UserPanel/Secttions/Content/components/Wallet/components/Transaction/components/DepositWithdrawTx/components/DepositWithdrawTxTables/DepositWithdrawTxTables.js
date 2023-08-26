import React, {useState} from 'react';
import {Trans, useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import Icon from "../../../../../../../../../../../../../../components/Icon/Icon";
import classes from "../../DepositWithdrawTx.module.css"
import Date from "../../../../../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN} from "../../../../../../../../../../../../../../utils/utils";

const DepositWithdrawTxTables = ({txs, id}) => {

    const [openItem, setOpenItem] = useState(false);
    const {t} = useTranslation();

    const copyAddressToClipboard = (value) => {
        navigator.clipboard.writeText(value)
        toast.success(<Trans
            i18nKey="DepositWithdraw.copy"
        />);
    }

    const txStatus = (status) => {
        switch (status) {
            case 0:
                return t("orderStatus.NEW");
            case 1:
                return t("orderStatus.DONE");
            case 2:
                return t("orderStatus.REJECTED");
            default:
                return t("orderStatus.NEW");
        }
    };

    return <div className={`${classes.striped}`}>
        {txs.map((tr, index) =>{

            const color = tr.hasOwnProperty('withdrawOrderId') ? "text-red" :  "text-green"

            return (

                <div key={index} className={`column px-5 py-1 ${classes.row}`}
                     onClick={() => setOpenItem(openItem === index ? null : index)}
                >
                    <div className={`row jc-between ai-center my-1`}>
                        <span><Date date={tr.time}/> , {moment(tr.time).format("HH:mm:ss")}</span>
                        <div className={`row jc-end ai-center`}>
                            <span className={`ml-3`}>{t("volume")}:</span>
                            <div className={`row ${color}`}>
                                <span className={`fs-02`}>{new BN(tr.amount).toFormat()}  </span>
                                <span className={`fs-0-8 mr-1`}>{t("currency." + id)}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`row jc-between ai-center my-1`}>
                        <div className={`row jc-start ai-center`}>
                            <span className={`ml-3`}>{t("status")}:</span>
                            <div className={`row`}>
                                <span className={``}>{txStatus(tr.status)}</span>
                            </div>
                        </div>
                        <div className={`row jc-end ai-center`}>

                            <span className={`ml-3`}>{t("DepositWithdrawTx.transactionType")}:</span>
                            <div className={`row ${color}`}>
                                <span className={`fs-02`}>{tr.hasOwnProperty('withdrawOrderId')  ? t("withdrawal") :  t("deposit")}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{display: openItem === index ? "revert" : "none"}} className={`column`}>
                        <div className={`row jc-between ai-center my-1`}>
                            <span className={`ml-3`}>{t("DepositWithdrawTx.network")}:</span>
                            <div className={`row`}>
                                <span className={``}>{tr.network}</span>
                            </div>
                        </div>

                        <div className={`column jc-center ai-start my-2`}>
                            <div className={`row jc-between ai-center width-100`}>
                                <span className={`ml-3`}>{t("DepositWithdrawTx.destination")}:</span>
                                <div className={`row`}>

                                    <Icon iconName="icon-copy fs-03 mr-2" customClass={`hover-text cursor-pointer`}
                                          onClick={() => copyAddressToClipboard(tr.address)}/>
                                </div>
                            </div>
                            <span className={`${classes.innerWidth} mt-05 text-start`}>{tr.address}</span>
                        </div>
                        <div className={`column jc-center ai-start my-2`}>
                            <div className={`row jc-between ai-center width-100`}>
                                <span className={`ml-3`}>{t("DepositWithdrawTx.transactionId")}:</span>
                                <div className={`row`}>

                                    <Icon iconName="icon-copy fs-03 mr-2" customClass={`hover-text cursor-pointer`}
                                          onClick={() => copyAddressToClipboard(tr.txId)}/>
                                </div>
                            </div>
                            <span className={`${classes.innerWidth} mt-05 text-start`}>{tr.txId}</span>
                        </div>
                    </div>
                    </div>
            )
            }
        )}
    </div>
};

export default DepositWithdrawTxTables;
