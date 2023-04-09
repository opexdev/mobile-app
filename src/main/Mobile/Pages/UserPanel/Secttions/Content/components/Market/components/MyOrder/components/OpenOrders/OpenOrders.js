import React, {Fragment, useEffect, useState} from "react";
import moment from "moment-jalaali";
import classes from "../../MyOrder.module.css";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Loading from "../../../../../../../../../../../../components/Loading/Loading";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import {BN} from "../../../../../../../../../../../../utils/utils";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import {toast} from "react-hot-toast";
import Error from "../../../../../../../../../../../../components/Error/Error";
import {useMyOpenOrders} from "../../../../../../../../../../../../queries";
import {cancelOrderByOrderID} from "js-api-client";
import Date from "../../../../../../../../../../../../components/Date/Date";


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
            <table className="text-center double-striped" cellSpacing="0" cellPadding="0">
                <thead className="th-border-y">
                <tr>
  {/*                  <th>{t("date")}</th>
                    <th>{t("time")}</th>
                    <th>
                        {t("volume")}({activePair.baseAsset})
                    </th>
                    <th>
                        {t("pricePerUnit")}({activePair.quoteAsset})
                    </th>
                    <th>{t("totalPrice")}</th>
                    <th>{t("myOrders.donePercentage")}</th>*/}
                    <th className={`text-start pr-2`}>
                        {t("date")}
                        <br/>
                        {t("time")}
                    </th>
                    <th>
                        {t("volume")}{/*({activePair.baseAsset})*/}
                        <br/>
                        {t("pricePerUnit")}{/*({activePair.quoteAsset})*/}
                    </th>
                    <th>
                        {t("totalPrice")}
                        <br/>
                        {t("myOrders.donePercentage")}
                    </th>
                    <th className={`pl-2`}/>
                </tr>
                </thead>
                <tbody>
                {data.map((tr, index) => {
                        const origQty = new BN(tr.origQty)
                        const executedQty = new BN(tr.executedQty)
                        const pricePerUnit = new BN(tr.price)
                        const totalPrice = pricePerUnit.multipliedBy(origQty)
                        return (<Fragment key={index}>
                            <tr className={` ${tr.side === "BUY" ? "text-green" : "text-red"}`}>
                                <td className={`text-start pr-2`}>
                                   <span> <Date date={tr.time}/></span> <br/>
                                   <span>{moment(tr.time).format("HH:mm:ss")}</span>
                                </td>
                                <td className={``}>
                                    <span>({activePair.baseAsset}) {origQty.decimalPlaces(activePair.baseAssetPrecision).toFormat()} </span><br/>
                                    <span>({activePair.quoteAsset}) {pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</span>
                                </td>
                                <td className={``}>
                                    <span>{totalPrice.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</span><br/>
                                    <span>{executedQty.dividedBy(origQty).multipliedBy(100).toFormat(0)}</span>
                                </td>
                                <td className={`text-end pl-2`}>
                                    <span
                                        onClick={() => cancelOrder(tr.orderId)}
                                        data-html={true}
                                        data-place="bottom"
                                        data-effect="float"
                                        data-tip={t("myOrders.cancelOrder")}

                                    >
                                        <Icon
                                            iconName="icon-cancel text-red fs-0-9"
                                            customClass={`${classes.iconBG} cursor-pointer`}
                                        />
                                    </span><br/>
                                    {openOrder === index ? (
                                        <span onClick={() => setOpenOrder(null)}>
                                        <Icon
                                            iconName="icon-up-open text-blue fs-0-9"
                                            customClass={`${classes.iconBG} cursor-pointer`}
                                        />
                                    </span>
                                    ) : (
                                        <span onClick={() => setOpenOrder(index)}>
                                        <Icon
                                            iconName="icon-down-open text-blue fs-0-9"
                                            customClass={`${classes.iconBG} cursor-pointer`}
                                        />
                                    </span>
                                    )}
                                </td>
                                
                            </tr>
                            <tr style={{display: openOrder === index ? "revert" : "none"}}>
                                <td colSpan="8" className={`py-1 px-2 fs-0-9`}>
                                    <div className="row jc-between  ai-center"
                                        style={{width: "100%"}}>
                                        <p className="width-47 row jc-between">
                                            {t("myOrders.orderId")} : <span>{tr.orderId}</span>
                                        </p>
                                        <p className="width-47 row jc-between">
                                            {t("myOrders.tradedAmount")} :{" "}
                                            <span>{executedQty.decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>
                                        </p>
                                    </div>
                                    <div
                                        className="row jc-between ai-center"
                                        style={{width: "100%"}}>
                                        <p className="width-47 row jc-between">
                                            {t("myOrders.avgTradedAmount")} :{" "}
                                            <span>-</span>
                                        </p>
                                        <p className="width-47 row jc-between">
                                            {t("myOrders.tradedPrice")} :{" "}
                                            <span>{executedQty.multipliedBy(pricePerUnit).decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </Fragment>)
                    }
                )}
                </tbody>
            </table>
        </ScrollBar>
    )
}

export default OpenOrders;