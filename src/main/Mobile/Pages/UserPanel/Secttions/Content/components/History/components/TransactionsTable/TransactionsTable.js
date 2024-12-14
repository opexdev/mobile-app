import React, {useState} from 'react';
import classes from './TransactionsTable.module.css'
import {useTranslation} from "react-i18next";
import Date from "../../../../../../../../../../components/Date/Date";
import {BN} from "../../../../../../../../../../utils/utils";
import moment from "moment-jalaali";

const TransactionsTable = ({data}) => {

    console.log("data", data)

    const [isOpen, setIsOpen] = useState(false);

    const {t} = useTranslation();

    return (
        <div className={`width-100 px-4 py-2 columns jc-between ai-center ${classes.container} ${classes.striped}`} >
            <div className={`width-100 column jc-between ai-center ${classes.rectangle}`} onClick={()=>data?.description && setIsOpen(prevState => !prevState)}>

                <div className={`width-100 row jc-between ai-center`}>
                    <div className={`row`}>
                        <span><Date date={data?.date}/></span>
                        <span className={`${classes.spacing}`}/>
                        <span className={``}>{moment.utc(data?.date).local().format("HH:mm:ss")}</span>
                    </div>

                    <span className={`row jc-center ai-center`}>{t("TransactionCategory."+ data?.category)}</span>

                    {/*<span className={`row jc-center ai-center`}>{moment(data?.date).format("HH:mm:ss")}</span>*/}
                </div>

                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.balanceChange")}</span>
                    <div className={`direction-ltr row ${new BN(data?.balanceChange).isLessThan(0) ? "text-red" : "text-green"}`} style={{alignItems:"baseline"}}>
                        <span className={`fs-03`}>{new BN(data?.balanceChange).isGreaterThan(0) && "+"}{new BN(data?.balanceChange).toFormat()}</span>
                        <span className={`${classes.spacing}`}/>
                        <span>{data?.currency}</span>

                    </div>
                </div>


                <div className={`width-100 row jc-between ai-center`}>
                    <span>{t("history.balance")}</span>
                    <div className={`direction-ltr row`} style={{alignItems:"baseline"}}>
                        <span className={`row jc-center ai-center`}>{new BN(data?.balance).toFormat()}</span>
                        <span className={`${classes.spacing}`}/>
                        <span>{data?.currency}</span>

                    </div>


                    {/*<span className={`row jc-center ai-center`}>{moment(data?.date).format("HH:mm:ss")}</span>*/}
                </div>



            </div>

            {isOpen && <div className={`width-90 column jc-start ai-start mt-2 ${classes.rectangle}`}>
                <span>{t("history.description")}</span>
                <span>{data?.description ? data?.description : "---"}</span>
            </div>}

        </div>
    );
};

export default TransactionsTable;
