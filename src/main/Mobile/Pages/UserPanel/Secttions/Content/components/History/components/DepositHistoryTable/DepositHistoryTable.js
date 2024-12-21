import React, {useState} from 'react';
import classes from './DepositHistoryTable.module.css'
import {useTranslation} from "react-i18next";
import {toast} from "react-hot-toast";
import Date from "../../../../../../../../../../components/Date/Date";
import moment from "moment-jalaali";
import {BN, shortenHash} from "../../../../../../../../../../utils/utils";
import Icon from "../../../../../../../../../../components/Icon/Icon";

const DepositHistoryTable = ({data}) => {

    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();


    const copyToClipboard = (e, value) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(value)
        toast.success(t("DepositWithdraw.copy"));
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
                    <div className={`direction-ltr row ${data?.status !== "INVALID" ? 'text-green' : 'text-gray'}`} style={{alignItems:"baseline"}}>
                        <span className={`fs-03`}>{new BN(data?.amount).toFormat()}</span>
                        <span className={`${classes.spacing}`}/>
                        <span>{data?.currency}</span>

                    </div>
                </div>

                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.type")}</span>
                    <span>{t("HistoryType."+ data?.type)}</span>
                </div>


            </div>

            {isOpen && <div className={`width-100 column jc-start ai-start mt-2 ${classes.rectangle}`}>

                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.sourceAddress")}</span>
                    <span>{data?.sourceAddress ?
                        <div className={`row`}>
                            <span
                                data-html={true}
                                data-place="bottom"
                                data-effect="float"
                                data-tooltip-place="top"
                                data-tooltip-id="polban-tooltip"
                                data-tooltip-float={true}
                                data-tooltip-html={`<span class="column jc-between">${data?.sourceAddress}</span>`}
                                className={`${classes.name} direction-ltr`}
                            >{shortenHash(data?.sourceAddress) }</span>
                            <Icon
                                iconName="icon-copy fs-02"
                                iconClass={`cursor-pointer mr-025 hover-text`}
                                onClick={(e) => copyToClipboard(e, data?.sourceAddress)}
                            />

                        </div>
                        : "- - -"}</span>

                </div>
                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.transactionRef")}</span>
                    <span>{data?.transactionRef ?
                        <div className={`row`}>
                            <span
                                data-html={true}
                                data-place="bottom"
                                data-effect="float"
                                data-tooltip-place="top"
                                data-tooltip-id="polban-tooltip"
                                data-tooltip-float={true}
                                data-tooltip-html={`<span class="column jc-between">${data?.transactionRef}</span>`}
                                className={`${classes.name} direction-ltr`}
                            >{shortenHash(data?.transactionRef) }</span>
                            <Icon
                                iconName="icon-copy fs-02"
                                iconClass={`cursor-pointer mr-025 hover-text`}
                                onClick={(e) => copyToClipboard(e, data?.transactionRef)}
                            />

                        </div>
                        : "- - -"}</span>
                </div>
                <div className={`width-100 column jc-start ai-start`}>
                    <span>{t("history.description")}</span>
                    <span>{data?.note ? data?.note : "- - -"}</span>
                </div>

            </div>}
        </div>
    );
};

export default DepositHistoryTable;
