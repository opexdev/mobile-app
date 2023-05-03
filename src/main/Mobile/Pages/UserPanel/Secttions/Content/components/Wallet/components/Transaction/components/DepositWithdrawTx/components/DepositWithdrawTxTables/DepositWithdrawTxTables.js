import React, {Fragment, useState} from 'react';
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
                return t("orderStatus.FILLED");
            case 2:
                return t("orderStatus.REJECTED");
            default:
                return t("orderStatus.NEW");
        }
    };

    return <div className={`${classes.doubleStriped}`}>
        {txs.map((tr, index) => (
            <div key={index}>
                <div className={`row  fs-0-9`}>
                    <div className={`width-43 column ai-start pr-3 pt-025 pb-025`}>
                        <span className={`mb-025`}><Date date={tr.time}/> | {moment(tr.time).format("HH:mm:ss")}</span>
                        <span className={`row ${tr.hasOwnProperty('withdrawOrderId') ? "text-red" :  "text-green"} mt-025`} >
                            <span>{tr.hasOwnProperty('withdrawOrderId')  ? t("withdrawal") :  t("deposit")}</span>
                            <span className={`mx-2`}>{id}</span>
                            <span>{new BN(tr.amount).toFormat()}</span>
                        </span>
                    </div>
                    <div className={`width-43 column ai-end pt-025 pb-025`}>
                        <span>{txStatus(tr.status)}</span>
                        <span>{tr.network}</span>
                    </div>
                    <div className={`width-14 flex jc-end ai-center pl-3 pt-025 pb-025`} onClick={() => setOpenItem(openItem === index ? null : index)}>
                        <Icon iconName={`${openItem === index ? 'icon-up-open' : 'icon-down-open'} text-blue fs-0-7 cursor-pointer`} customClass={classes.iconBG}/>
                    </div>
                </div>
                <span style={{display: openItem === index ? "revert" : "none"}} className={`fs-0-9`}>
                    <div  className={``}>
                        <div className="row jc-around  ai-center px-3" style={{width: "100%"}}>
                            <p className="col-94 row jc-between">
                                {t("DepositWithdrawTx.destination")} :
                                <span>{tr.address}</span>
                            </p>
                            <p className="col-03 row jc-end">
                                <Icon iconName="icon-copy fs-01" customClass={`hover-text cursor-pointer`}
                                      onClick={() => copyAddressToClipboard(tr.address)}/>
                            </p>
                        </div>
                        <div className="row jc-around ai-center px-3 pb-05" style={{width: "100%"}}>
                            <p className="col-94 row jc-between">
                                {t("DepositWithdrawTx.transactionId")} :
                                <span>{id === "BTC" ? tr.txId.slice(0, tr.txId.indexOf("_")) : tr.txId}</span>
                            </p>
                            <p className="col-03 row jc-end">
                                <Icon
                                    iconName="icon-copy fs-01"
                                    customClass={`hover-text cursor-pointer`}
                                    onClick={() => copyAddressToClipboard(tr.txId)}
                                />
                            </p>
                        </div>
                    </div>
                </span>

            </div>
        ))}
    </div>
};

export default DepositWithdrawTxTables;
