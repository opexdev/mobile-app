import React, {useEffect} from "react";
import classes from "./OrderBookTable.module.css";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {BN} from "../../../../../../../../../../../../utils/utils";
import ScrollBar from "../../../../../../../../../../../../components/ScrollBar";
import {
    setBestBuyPrice,
    setBestSellPrice,
    setBuyOrder,
    setSellOrder
} from "../../../../../../../../../../../../store/actions";
import {useLocation, useNavigate} from "react-router-dom";
import {OrderBook as OrderBookRoute, Order as OrderRoute} from "../../../../../../../../../../Routes/routes";

const OrderBookTable = ({data, type}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const activePair = useSelector((state) => state.exchange.activePair)

    let header;

    let totalAmount = data.reduce((total, asks) => parseFloat(asks[1]) + total, 0);
    let avg = {pricePerUnit: new BN(0), amount: new BN(0), total: new BN(0)};
    let start = "right";
    let end = "left";

    if (i18n.language === "en") {
        start = "left";
        end = "right";
    }

    if (type === "buy") {
        header = (
            <div className="row jc-between">
                <span className="width-50">{t("pricePerUnit")}</span>
                <span className="width-50">{t("volume")}</span>
            </div>
        );
    } else {
        header = (
            <div className="row jc-between">
                <span className="width-50">{t("volume")}</span>
                <span className="width-50">{t("pricePerUnit")}</span>
            </div>
        );
    }
    useEffect(() => {
        if (data.length > 0) {
            totalAmount = data.reduce((total, asks) => parseFloat(asks[1]) + total, 0);
            type === "buy"
                ? dispatch(setBestSellPrice(data[0][0]))
                : dispatch(setBestBuyPrice(data[0][0]));
        }
    }, [data]);

    const backgroundBar = (percent) => {
        if (type === "buy") {
            return {
                background: `linear-gradient(to ${end}, var(--greenAlpha) ${percent}%, transparent ${percent}%) no-repeat`,
            };
        }
        return {
            background: `linear-gradient(to ${start}, var(--redAlpha) ${percent}%, transparent ${percent}%) no-repeat`,
        };
    }


    return (
        <div className={`column width-100 ${classes.container}`}>
            <ScrollBar>
                <div className="text-center">
                    <div className={` ${classes.thead} `}>{header}</div>
                    <div className={` ${classes.tbody} `}>
                        {data.map((tr, index) => {
                            const pricePerUnit = new BN(tr[0])
                            const amount = new BN(tr[1])
                            const percent = amount.multipliedBy(100).dividedBy(totalAmount)

                            avg = {
                                pricePerUnit: pricePerUnit.plus(avg.pricePerUnit),
                                amount: amount.plus(avg.amount),
                            }
                            return type === "buy" ? (
                                <div
                                    key={index}
                                    style={backgroundBar(percent.toString())}
                                    className='cursor-pointer row jc-between'
                                    onClick={() => {
                                        dispatch(setSellOrder({
                                            pricePerUnit: parseFloat(pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toString()),
                                            amount: 0,
                                        }))
                                        if (location.pathname === OrderBookRoute) navigate(OrderRoute, {replace: true})
                                    }
                                    }>
                                    <span
                                        className="width-50">{pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}</span>
                                    <span
                                        className="width-50">{amount.decimalPlaces(activePair.baseAssetPrecision).toFormat()}</span>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    style={backgroundBar(percent.toString())}
                                    className='cursor-pointer row jc-between'
                                    onClick={() => {
                                        dispatch(setBuyOrder({
                                            pricePerUnit: parseFloat(pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toString()),
                                            amount: 0,
                                        }))
                                        if (location.pathname === OrderBookRoute) navigate(OrderRoute, {replace: true})
                                    }
                                    }>
                                    <span className="width-50">
                                        {amount.decimalPlaces(activePair.baseAssetPrecision).toFormat()}
                                    </span>
                                    <span className="width-50">
                                        {pricePerUnit.decimalPlaces(activePair.quoteAssetPrecision).toFormat()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ScrollBar>
        </div>
    );
};


export default OrderBookTable;
