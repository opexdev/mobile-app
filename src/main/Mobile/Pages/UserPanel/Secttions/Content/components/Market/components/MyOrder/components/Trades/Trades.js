import React, {useEffect, useState} from "react";
import moment from "moment-jalaali";
import classes from "../../MyOrder.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import Error from "../../../../../../../../../../../../components/Error/Error";
import {useMyTrades} from "../../../../../../../../../../../../queries";
import Date from "../../../../../../../../../../../../components/Date/Date";
import {BN} from "../../../../../../../../../../../../utils/utils";

const Trades = () => {


    const {t} = useTranslation();
    const [openOrder, setOpenOrder] = useState(null)

    const activePair = useSelector((state) => state.exchange.activePair)
    const lastTransaction = useSelector((state) => state.auth.lastTransaction);

    const {data, isLoading, error, refetch} = useMyTrades(activePair.symbol)

    useEffect(() => {
        refetch()
    }, [lastTransaction])

    if (error) return <Error/>

    if (isLoading) return <Loading/>

    if (data.length === 0) return <div className={`height-100 flex jc-center ai-center`}>{t("noData")}</div>

    return (
        <ScrollBar>
            <div className={`${classes.striped} fs-0-9`}>

                {data.map((tr, index) => {

                    const color = tr.isBuyer === false ? "text-green" : "text-red"

                    return (
                        <div key={index} className={`column px-5 py-1 ${classes.row}`}
                             onClick={() => setOpenOrder(openOrder === index ? null : index)}
                        >
                            <div className={`row jc-between ai-center my-1`}>
                                <span><Date date={tr.time}/> , {moment(tr.time).format("HH:mm:ss")}</span>
                                <div className={`row jc-end ai-center`}>
                                    <span className={`ml-3`}>{t("volume")}:</span>
                                    <div className={`row ${color}`}>
                                        <span className={`fs-02`}>{tr.qty}</span>
                                        <span className={`fs-0-8 mr-1`}>{t("currency." + activePair.baseAsset.toUpperCase())}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`row jc-between ai-center my-1`}>
                                <span className={`ml-3`}>{t("totalPrice")}:</span>
                                <div className={`row ${color}`}>
                                    <span className={`fs-02`}>{(tr.qty * tr.price).toLocaleString()}</span>
                                    <span className={`fs-0-8 mr-1`}>{t("currency." + activePair.quoteAsset.toUpperCase())}</span>
                                </div>
                            </div>


                            <div style={{display: openOrder === index ? "revert" : "none"}} className={`column`}>

                                <div className={`row jc-between ai-center my-1`}>
                                    <span className={`ml-3`}>{t("pricePerUnit")}:</span>
                                    <div className={`row ${color}`}>
                                        <span className={`fs-02`}>{(tr.price)}</span>
                                        <span className={`fs-0-8 mr-1`}>{t("currency." + activePair.quoteAsset.toUpperCase())}</span>
                                    </div>
                                </div>
                                <div className={`row jc-between ai-center width-100 my-1`}>
                                    <div className={`row jc-start ai-center`}>
                                        <span className={`ml-3`}>{t("myOrders.orderId")}:</span>
                                        <div className={`row`}>
                                            <span>{tr.orderId}</span>
                                        </div>
                                    </div>
                                    <div className={`row jc-end ai-center`}>
                                        <span className={`ml-3`}>{t("commission")}:</span>
                                        <div className={`row`}>
                                            <span>{new BN(tr.commission).toFormat()}</span>
                                            <span className={`fs-0-8 mr-1`}>{t("currency." + tr.commissionAsset.toUpperCase())}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}


                    /*

                    return (
                    <Fragment key={index}>
                        <tr className={tr.isBuyer === false ? "text-green" : "text-red"}>
                            <td><Date date={tr.time}/></td>
                            <td>{moment(tr.time).format("HH:mm:ss")}</td>
                            <td>{tr.qty}</td>
                            <td>{tr.price}</td>
                            <td>{(tr.qty * tr.price).toLocaleString()}</td>
                            {openOrder === index ? (
                                <td onClick={() => setOpenOrder(null)}>
                                    <Icon
                                        iconName="icon-up-open text-blue fs-0-7"
                                        customClass={`${classes.iconBG} cursor-pointer`}
                                    />
                                </td>
                            ) : (
                                <td onClick={() => setOpenOrder(index)}>
                                    <Icon
                                        iconName="icon-down-open text-blue fs-0-7"
                                        customClass={`${classes.iconBG} cursor-pointer`}
                                    />
                                </td>
                            )}
                        </tr>
                        <tr
                            style={{display: openOrder === index ? "revert" : "none"}}>
                            <td colSpan="6" className={`py-1 px-1 fs-0-9`}>
                                <div
                                    className="row jc-between  ai-center"
                                    style={{width: "100%"}}>
                                    <p className="width-47 row jc-between">
                                        {t("myOrders.orderId")} : <span>{tr.orderId}</span>
                                    </p>
                                    <p className="width-47 row jc-between">
                                        {t("commission")} : <span>{new BN(tr.commission).toFormat()} <span>{t("currency." + tr.commissionAsset.toUpperCase())}</span></span>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </Fragment>
                    )}

                     */

                )}
            </div>
        </ScrollBar>
    )
}

export default Trades;