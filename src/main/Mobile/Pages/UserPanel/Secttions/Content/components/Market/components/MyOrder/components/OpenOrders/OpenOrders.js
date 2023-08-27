import React, {useEffect, useState} from "react";
import moment from "moment-jalaali";
import classes from "../../MyOrder.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import {BN} from "../../../../../../../../../../../../utils/utils";
import {toast} from "react-hot-toast";
import Error from "../../../../../../../../../../../../components/Error/Error";
import {useMyOpenOrders} from "../../../../../../../../../../../../queries";
import {cancelOrderByOrderID} from "js-api-client";
import Date from "../../../../../../../../../../../../components/Date/Date";
import Button from "../../../../../../../../../../../../components/Button/Button";


const OpenOrders = () => {

    const {t} = useTranslation();
    const [openOrder, setOpenOrder] = useState(null)

    const activePair = useSelector((state) => state.exchange.activePair)
    const lastTransaction = useSelector((state) => state.auth.lastTransaction);

    const {data, isLoading, error, refetch} = useMyOpenOrders(activePair.symbol)

    useEffect(() => {
        refetch()
    }, [lastTransaction])

    const cancelOrder = async (orderId) => {
        await cancelOrderByOrderID(activePair.symbol, orderId)
            .then(() => toast.success(t('myOrders.cancelSuccess')))
            .catch(() => toast.error(t('myOrders.cancelError')))
        refetch()
    }

    if (error) return <Error/>

    if (isLoading) return <Loading/>

    if (data.length === 0) return <div className={`height-100 flex jc-center ai-center`}>{t("noData")}</div>


    return (
        <ScrollBar>
            <div className={`${classes.striped} fs-0-9`} >


                {data.map((tr, index) => {
                        const origQty = new BN(tr.origQty)
                        const executedQty = new BN(tr.executedQty)
                        const pricePerUnit = new BN(tr.price)
                        const totalPrice = pricePerUnit.multipliedBy(origQty)
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
                                        <span className={`fs-02`}>{origQty.decimalPlaces(activePair.baseAssetPrecision).toFormat()}  </span>
                                        <span className={`fs-0-8 mr-1`}>{t("currency." + activePair.baseAsset.toUpperCase())}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`row jc-between ai-center my-1`}>
                                <div className={`row jc-start ai-center`}>
                                    <span className={`ml-3`}>{t("myOrders.donePercentage")}:</span>
                                    <div className={`row`}>
                                        <span>{executedQty.dividedBy(origQty).multipliedBy(100).toFormat(0)}</span>
                                    </div>
                                </div>
                                <div className={`row jc-end ai-center`}>
                                    <span className={`ml-3`}>{t("totalPrice")}:</span>
                                    <div className={`row ${color}`}>
                                        <span className={`fs-02`}>{totalPrice.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</span>
                                        <span className={`fs-0-8 mr-1`}>{t("currency." + activePair.quoteAsset.toUpperCase())}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{display: openOrder === index ? "revert" : "none"}} className={`column`}>

                                <div className={`row jc-between ai-center width-100 my-1`}>
                                    <span className={`ml-3`}>{t("pricePerUnit")}:</span>
                                    <div className={`row ${color}`}>
                                        <span className={`fs-02`}>{pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</span>
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
                                        <span className={`ml-3`}>{t("myOrders.tradedAmount")}:</span>
                                        <div className={`row`}>
                                            <span>{executedQty.decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`row jc-between ai-center width-100 my-1`}>
                                    <div className={`row jc-start ai-center`}>
                                        <span className={`ml-3`}>{t("myOrders.avgTradedAmount")}:</span>
                                        <div className={`row`}>
                                            <span>-</span>
                                        </div>
                                    </div>

                                    <div className={`row jc-end ai-center`}>
                                        <span className={`ml-3`}>{t("myOrders.tradedPrice")}:</span>
                                        <div className={`row`}>
                                            <span>{executedQty.multipliedBy(pricePerUnit).decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`row jc-center ai-center width-100 mb-2 mt-3`}>
                                    <Button
                                        type="button"
                                        buttonClass={`${classes.thisButton} cursor-pointer`}
                                        buttonTitle={t('myOrders.cancelOrder')}
                                        onClick={() => cancelOrder(tr.orderId)}
                                    />
                                </div>
                            </div>
                        </div>)
                    }
                )}

            </div>
        </ScrollBar>
    )
}

export default OpenOrders;