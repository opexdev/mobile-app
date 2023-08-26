import React, {Fragment, useEffect, useState} from "react";
import moment from "moment-jalaali";
import classes from "../../MyOrder.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import {useMyOrderHistory} from "../../../../../../../../../../../../queries";
import Error from "../../../../../../../../../../../../components/Error/Error";
import Date from "../../../../../../../../../../../../components/Date/Date";

const OrdersHistory = () => {
    const {t} = useTranslation();
    const [openOrder, setOpenOrder] = useState(null)

    const activePair = useSelector((state) => state.exchange.activePair)
    const lastTransaction = useSelector((state) => state.auth.lastTransaction);

    const {data, isLoading, error, refetch} = useMyOrderHistory(activePair.symbol)

    useEffect(() => {
        refetch()
    }, [lastTransaction])

    if (error) return <Error/>

    if (isLoading)  return <Loading/>

    if (data.length === 0) return <div className={`height-100 flex jc-center ai-center`}>{t("noData")}</div>

    return (
        <ScrollBar>
            <div className={`${classes.striped}`}>

                {data.map((tr, index) => {

                    const color = tr.side === "BUY" ? "text-green" : "text-red"

                    return (

                        <div key={index} className={`column px-5 py-1 ${classes.row}`}
                             onClick={() => setOpenOrder(openOrder === index ? null : index)}
                        >
                            <div className={`row jc-between ai-center my-1`}>
                                <span><Date date={tr.time}/> , {moment(tr.time).format("HH:mm:ss")}</span>
                                <div className={`row jc-end ai-center`}>
                                    <span className={`ml-3`}>{t("volume")}:</span>
                                    <div className={`row ${color}`}>
                                        <span className={`fs-02`}>{tr.origQty}</span>
                                        <span className={`fs-0-8 mr-1`}>{t("currency." + activePair.baseAsset.toUpperCase())}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`row jc-between ai-center my-1`}>
                                <span className={`text-orange`}>{t("orderStatus." + tr.status)}</span>
                                <div className={`row jc-end ai-center`}>
                                    <span className={`ml-3`}>{t("totalPrice")}:</span>
                                    <div className={`row ${color}`}>
                                        <span className={`fs-02`}>{(tr.origQty * tr.price).toLocaleString()}</span>
                                        <span className={`fs-0-8 mr-1`}>{t("currency." + activePair.quoteAsset.toUpperCase())}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{display: openOrder === index ? "revert" : "none"}} className={`column`}>
                                <div className={`row jc-between ai-center width-100 my-1`}>



                                        <span className={`ml-3`}>{t("pricePerUnit")}:</span>
                                        <div className={`row ${color}`}>
                                            <span className={`fs-02`}>{tr.price.toLocaleString()}</span>
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
                                        <span className={`ml-3`}>{t("orderType")}:</span>
                                        <div className={`row`}>
                                            <span>{t(tr.side.toLowerCase()) + " " + t("orderTypes." + tr.type)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`row jc-between ai-center width-100 my-1`}>
                                    <span className={`ml-3`}>{t("myOrders.stopOrderTime")}:</span>
                                    <div className={`row`}>
                                        <span><Date date={tr.updateTime}/> - {moment(tr.updateTime).format("HH:mm:ss")}</span>
                                    </div>
                                </div>
                                <div className={`row jc-between ai-center width-100 my-1`}>
                                    <span className={`ml-3`}>{t("myOrders.startOrderTime")}:</span>
                                    <div className={`row`}>
                                        <span><Date date={tr.time}/> - {moment(tr.time).format("HH:mm:ss")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                )}
            </div>
        </ScrollBar>
    )
}

export default OrdersHistory;