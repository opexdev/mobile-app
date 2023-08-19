import React, {useEffect, useState} from "react";
import classes from "../../Order.module.css";
import {Trans, useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserAccount} from "../../../../../../../../../../../../queries/hooks/useGetUserAccount";
import {toast} from "react-hot-toast";
import {setLastTransaction} from "../../../../../../../../../../../../store/actions/auth";
import {BN, parsePriceString} from "../../../../../../../../../../../../utils/utils";
import {createOrder} from "js-api-client";
import {images} from "../../../../../../../../../../../../assets/images";
import NumberInput from "../../../../../../../../../../../../components/NumberInput/NumberInput";
import Button from "../../../../../../../../../../../../components/Button/Button";


const SellOrder = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)

    const tradeFee = useSelector((state) => state.auth.tradeFee)
    const isLogin = useSelector((state) => state.auth.isLogin)
    const activePair = useSelector((state) => state.exchange.activePair)
    const bestSellPrice = useSelector((state) => state.exchange.activePairOrders.bestSellPrice)
    const selectedSellOrder = useSelector((state) => state.exchange.activePairOrders.selectedSellOrder)

    const {data: userAccount} = useGetUserAccount()
    const base = userAccount?.wallets[activePair.baseAsset]?.free || 0;

    const [alert, setAlert] = useState({
        reqAmount: null,
        submit: false,
    });

    const [order, setOrder] = useState({
        tradeFee: new BN(0),
        stopLimit: false,
        stopMarket: false,
        stopPrice: new BN(0),
        reqAmount: new BN(0),
        pricePerUnit: new BN(0),
        totalPrice: new BN(0),
    });

    useEffect(() => {
        if (alert.submit) {
            setAlert({
                ...alert, submit: false
            })
        }
    }, [order])

    useEffect(() => {
        setOrder({
            tradeFee: new BN(0),
            stopLimit: false,
            stopMarket: false,
            stopPrice: new BN(0),
            reqAmount: new BN(0),
            pricePerUnit: new BN(0),
            totalPrice: new BN(0),
        })
        setAlert({
            submit: false,
            reqAmount: null,
            totalPrice: null,
        })
    }, [activePair])


    const currencyValidator = (key, val, rule) => {
        if (!val.isZero() && val.isLessThan(rule.min)) {
            return setAlert({
                ...alert,
                [key]: (
                    <Trans
                        i18nKey="orders.minOrder"
                        values={{
                            min: activePair.baseRange.min,
                            currency: t("currency." + activePair.baseAsset),
                        }}
                    />
                ),
            });
        }
        if (val.isGreaterThan(rule.max)) {
            return setAlert({
                ...alert,
                [key]:
                    (<Trans
                        i18nKey="orders.maxOrder"
                        values={{
                            max: activePair.baseRange.max,
                            currency: t("currency." + activePair.baseAsset),
                        }}
                    />)
            })
        }
        if (!val.mod(rule.step).isZero()) {
            return setAlert({
                ...alert,
                [key]: (<Trans
                    i18nKey="orders.divisibility"
                    values={{mod: rule.step.toString()}}
                />)
            })
        }
        return setAlert({...alert, [key]: null});
    };

    const sellPriceHandler = (value, key) => {
        value = parsePriceString(value);
        switch (key) {
            case "reqAmount":
                const reqAmount = new BN(value);
                currencyValidator("reqAmount", reqAmount, activePair.baseRange);
                setOrder({
                    ...order,
                    reqAmount,
                    totalPrice: reqAmount.multipliedBy(order.pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
                    tradeFee: reqAmount.multipliedBy(order.pricePerUnit).multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
                });
                break;
            case "pricePerUnit":
                const pricePerUnit = new BN(value);
                setOrder({
                    ...order,
                    pricePerUnit: pricePerUnit,
                    totalPrice: pricePerUnit.multipliedBy(order.reqAmount).decimalPlaces(activePair.quoteAssetPrecision),
                    tradeFee: pricePerUnit.multipliedBy(order.reqAmount).multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
                });
                break;
            case "totalPrice":
                const totalPrice = new BN(value);
                const req = totalPrice.dividedBy(order.pricePerUnit).decimalPlaces(activePair.baseAssetPrecision);
                setOrder({
                    ...order,
                    reqAmount: req.isFinite() ? req : new BN(0),
                    totalPrice,
                    tradeFee: req.isFinite() ? totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision) : new BN(0),
                });
                currencyValidator("reqAmount", req, activePair.baseRange);
                break;
            default:
        }
    };

    useEffect(() => {
        setOrder((prevState) => ({
            ...order,
            tradeFee: prevState.totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        }));
    }, [tradeFee]);

    useEffect(() => {
        sellPriceHandler(
            bestSellPrice.toString(),
            "pricePerUnit",
        );
    }, [order.stopMarket]);

    useEffect(() => {
        const reqAmount = new BN(selectedSellOrder.amount);
        const pricePerUnit = new BN(selectedSellOrder.pricePerUnit);
        setOrder({
            ...order,
            reqAmount,
            pricePerUnit: pricePerUnit,
            totalPrice: reqAmount.multipliedBy(pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
            tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        });
        currencyValidator("reqAmount", reqAmount, activePair.baseRange);
    }, [selectedSellOrder]);

    const fillSellByWallet = () => {
        if (order.pricePerUnit.isEqualTo(0) && bestSellPrice === 0) return toast.error(t("orders.hasNoOffer"));
        if (order.pricePerUnit.isEqualTo(0)) {
            const reqAmount = new BN(base).decimalPlaces(activePair.baseAssetPrecision);
            const pricePerUnit = new BN(bestSellPrice);
            setOrder({
                ...order,
                reqAmount: reqAmount,
                pricePerUnit: pricePerUnit,
                totalPrice: reqAmount.multipliedBy(pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
                tradeFee: reqAmount.multipliedBy(pricePerUnit).multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
            });
        } else {
            sellPriceHandler(
                base.toString(),
                "reqAmount",
            );
        }
    };

    const fillSellByBestPrice = () => {
        sellPriceHandler(
            bestSellPrice.toString(),
            "pricePerUnit",
        );
    };

    useEffect(() => {
        if (order.reqAmount.isGreaterThan(base)) {
            return setAlert({
                ...alert,
                reqAmount: t('orders.notEnoughBalance')
            })
        }
        return setAlert({
            ...alert,
            reqAmount: null
        })
    }, [order.reqAmount]);

    const submit = () => {
        if (!isLogin) return

        if (isLoading) return

        setIsLoading(true)
        createOrder(activePair.symbol, "SELL", order)
            .then((res) => {
                setOrder({
                    tradeFee: new BN(0),
                    stopLimit: false,
                    stopMarket: false,
                    stopPrice: new BN(0),
                    reqAmount: new BN(0),
                    pricePerUnit: new BN(0),
                    totalPrice: new BN(0),
                })
                toast.success(<Trans
                    i18nKey="orders.success"
                    values={{
                        base: t("currency." + activePair.baseAsset),
                        quote: t("currency." + activePair.quoteAsset),
                        type: t("sell"),
                        reqAmount: order.reqAmount,
                        pricePerUnit: order.pricePerUnit,
                    }}
                />);
                dispatch(setLastTransaction(res.data.transactTime))
            }).catch(() => {
            toast.error(t("orders.error"));
            setAlert({
                ...alert, submit: true
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const submitButtonTextHandler = () => {
        if (isLoading) return <img className={`${classes.thisLoading}`} src={images.linearLoading} alt="linearLoading"/>

        if (isLogin) return t("sell")

        return t("pleaseLogin")
    }


    return (
        <div className={`column jc-between ${classes.content} px-2 py-1`}>
            <div className={`column`}>
                <div className={`row jc-between ai-center fs-0-8`} onClick={() => {fillSellByWallet()}}>
                    <span>{t("orders.availableAmount")}:</span>
                    <span>{new BN(base).toFormat()}{" "}{t("currency." + activePair.baseAsset)}</span>
                </div>
                <div className={`row jc-between ai-center fs-0-8`} onClick={() => fillSellByBestPrice()}>
                    <span> {t("orders.bestOffer")}:</span>
                    <span> {new BN(bestSellPrice).toFormat()}{" "}{t("currency." + activePair.quoteAsset)}</span>
                </div>
            </div>
            <NumberInput
                lead={t("orders.amount")}
                after={t("currency." + activePair.baseAsset)}
                value={order.reqAmount.toString()}
                maxDecimal={activePair.baseAssetPrecision}
                onchange={(e) => sellPriceHandler(e.target.value, "reqAmount")}
                alert={alert.reqAmount}
                customClass={`${classes.smallInput} fs-0-8`}
            />
            <NumberInput
                lead={t("orders.pricePerUnit")}
                after={t("currency." + activePair.quoteAsset)}
                value={order.pricePerUnit.toString()}
                maxDecimal={activePair.quoteAssetPrecision}
                onchange={(e) => sellPriceHandler(e.target.value, "pricePerUnit")}
                customClass={`${classes.smallInput} fs-0-8 my-05`}
            />
            <NumberInput
                lead={t("orders.totalPrice")}
                value={order.totalPrice.toString()}
                maxDecimal={activePair.quoteAssetPrecision}
                after={t("currency." + activePair.quoteAsset)}
                onchange={(e) => sellPriceHandler(e.target.value, "totalPrice")}
                customClass={`${classes.smallInput} fs-0-8`}
            />
            <div className={`row jc-between ai-center`}>
                <div className="column jc-center fs-0-8">
                    <p>
                        {t("orders.tradeFee")}:{" "}
                        {order.tradeFee.toFormat()}{" "}
                        {t("currency." + activePair.quoteAsset)}
                    </p>
                    <p>
                        {t("orders.getAmount")}:{" "}
                        {order.totalPrice.minus(order.tradeFee).decimalPlaces(activePair.baseAssetPrecision).toNumber()}{" "}
                        {t("currency." + activePair.quoteAsset)}
                    </p>
                </div>
                <Button
                    buttonClass={`${classes.thisButton} width-50 ${classes.sellOrder} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center`}
                    type="submit"
                    onClick={submit}
                    disabled={alert.reqAmount || order.reqAmount.isZero() || order.pricePerUnit.isZero() || !isLogin}
                    buttonTitle={submitButtonTextHandler()}
                />
            </div>
        </div>
    );
};

export default SellOrder;
