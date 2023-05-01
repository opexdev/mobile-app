import React, {useEffect, useState} from "react";
import classes from "../../Order.module.css";
import {Trans, useTranslation} from "react-i18next";
import VerticalNumberInput from "../../../../../../../../../../../../components/VerticalTextInput/VerticalNumberInput";
import {setLastTransaction} from "../../../../../../../../../../../../store/actions/auth";
import {connect, useDispatch, useSelector} from "react-redux";
import {BN, parsePriceString} from "../../../../../../../../../../../../utils/utils";
import {useNavigate} from "react-router-dom";
import Icon from "../../../../../../../../../../../../components/Icon/Icon";
import Button from "../../../../../../../../../../../../components/Button/Button";
import {Login as LoginRoute} from "../../../../../../../../../../Routes/routes";
import {toast} from "react-hot-toast";
import {images} from "../../../../../../../../../../../../assets/images";
import {createOrder} from "../../api/order";
import {useGetUserAccount} from "../../../../../../../../../../../../queries/hooks/useGetUserAccount";
import NumberInput from "../../../../../../../../../../../../components/NumberInput/NumberInput";



const BuyOrder = () => {

    const navigate = useNavigate();

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {data: userAccount} = useGetUserAccount()
    const [isLoading, setIsLoading] = useState(false)

    const activePair = useSelector((state) => state.exchange.activePair)
    const bestBuyPrice = useSelector((state) => state.exchange.activePairOrders.bestBuyPrice)
    const selectedBuyOrder = useSelector((state) => state.exchange.activePairOrders.selectedBuyOrder)

    const tradeFee = useSelector((state) => state.auth.tradeFee)
    const isLogin = useSelector((state) => state.auth.isLogin)

    const quote = userAccount?.wallets[activePair.quoteAsset]?.free || 0;

    const [alert, setAlert] = useState({
        submit: false,
        reqAmount: null,
        totalPrice: null,
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

    /*useEffect(() => {
        if (alert.submit) {
            setAlert({
                ...alert, submit: false
            })
        }
    }, [order, activePair])*/

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
                [key]: (
                    <Trans
                        i18nKey="orders.maxOrder"
                        values={{
                            max: activePair.baseRange.max,
                            currency: t("currency." + activePair.baseAsset),
                        }}
                    />
                ),
            });
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

    const buyPriceHandler = (value, key) => {
        value = parsePriceString(value);
        switch (key) {
            case "reqAmount":
                const reqAmount = new BN(value);
                currencyValidator("reqAmount", reqAmount, activePair.baseRange);
                setOrder({
                    ...order,
                    reqAmount,
                    totalPrice: reqAmount.multipliedBy(order.pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
                    tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
                });
                break;
            case "pricePerUnit":
                const pricePerUnit = new BN(value);
                setOrder({
                    ...order,
                    pricePerUnit: pricePerUnit,
                    totalPrice: pricePerUnit.multipliedBy(order.reqAmount).decimalPlaces(activePair.quoteAssetPrecision),
                    tradeFee: order.reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
                });
                break;
            case "totalPrice":
                const totalPrice = new BN(value);
                const req = totalPrice.dividedBy(order.pricePerUnit).decimalPlaces(activePair.baseAssetPrecision);
                setOrder({
                    ...order,
                    reqAmount: req.isFinite() ? req : new BN(0),
                    totalPrice,
                    tradeFee: req.isFinite() ? req.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision) : new BN(0),
                });
                currencyValidator("reqAmount", req, activePair.baseRange);
                break;
            default:
        }
    };

    useEffect(() => {
        if (order.totalPrice.isGreaterThan(quote)) {
            return setAlert({
                ...alert,
                totalPrice: t('orders.notEnoughBalance')
            })
        }
        return setAlert({
            ...alert,
            totalPrice: null
        })
    }, [order.totalPrice]);


    useEffect(() => {
        setOrder((prevState) => ({
            ...order,
            tradeFee: prevState.totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        }));
    }, [tradeFee]);

    useEffect(() => {
        buyPriceHandler(
            bestBuyPrice.toString(),
            "pricePerUnit",
        );
    }, [order.stopMarket]);

    useEffect(() => {
        const reqAmount = new BN(selectedBuyOrder.amount);
        const pricePerUnit = new BN(selectedBuyOrder.pricePerUnit);
        setOrder({
            ...order,
            reqAmount,
            pricePerUnit: pricePerUnit,
            totalPrice: reqAmount.multipliedBy(pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
            tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        });
        currencyValidator("reqAmount", reqAmount, activePair.baseRange);
    }, [selectedBuyOrder]);

    useEffect(() => {
        const reqAmount = new BN(selectedBuyOrder.amount);
        const pricePerUnit = new BN(selectedBuyOrder.pricePerUnit);
        setOrder({
            ...order,
            reqAmount,
            pricePerUnit: pricePerUnit,
            totalPrice: reqAmount.multipliedBy(pricePerUnit).decimalPlaces(activePair.quoteAssetPrecision),
            tradeFee: reqAmount.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
        });
        currencyValidator("reqAmount", reqAmount, activePair.baseRange);
    }, [selectedBuyOrder]);


    const fillBuyByWallet = () => {
        if(order.pricePerUnit.isEqualTo(0) && bestBuyPrice === 0 ) return toast.error(t("orders.hasNoOffer"));
        if (order.pricePerUnit.isEqualTo(0)) {
            const totalPrice = new BN(quote);
            setOrder({
                ...order,
                reqAmount: totalPrice.dividedBy(bestBuyPrice).decimalPlaces(activePair.baseAssetPrecision),
                pricePerUnit: new BN(bestBuyPrice),
                totalPrice,
                tradeFee: totalPrice.multipliedBy(tradeFee[activePair.quoteAsset]).decimalPlaces(activePair.baseAssetPrecision),
            });
        } else {
            buyPriceHandler(
                quote.toString(),
                "totalPrice",
            );
        }
    };

    const fillBuyByBestPrice = () => {
        buyPriceHandler(
            bestBuyPrice.toString(),
            "pricePerUnit",
        );
    };

    console.log("activePair.symbol" , activePair.symbol)

    const submit = async () => {
        if (!isLogin) {
            navigate(LoginRoute, { replace: true });
            return false
        }
        if (isLoading) {
            return false
        }
        setIsLoading(true)
        createOrder(activePair.symbol, "BUY", order)
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
                        type: t("buy"),
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
        if (isLoading) {
            return <img className={`${classes.thisLoading}`} src={images.linearLoading} alt="linearLoading"/>
        }
        /*if (alert.submit) {
            return <span>{t("login.loginError")}</span>
        }*/
        if (isLogin) {
            return t("buy")
        }
        /*if (isLogin) {
            return <span>{t("buy")} {order.reqAmount.minus(order.tradeFee).decimalPlaces(activePair.baseAssetPrecision).toNumber()}{" "}
                {t("currency." + activePair.baseAsset)}</span>
        }*/
        return t("pleaseLogin")
    }




    return (
        <div className={`column jc-between ${classes.content} px-2 py-1`}>

            <div className={`column`}>
                <div className={`row jc-between ai-center fs-0-8`} onClick={() => {fillBuyByWallet()}}>
                    <span>{t("orders.availableAmount")}:</span>
                    <span>{new BN(quote).toFormat()}{" "}{t("currency." + activePair.quoteAsset)}</span>
                </div>
                <div className={`row jc-between ai-center fs-0-8`} onClick={() => fillBuyByBestPrice()}>
                    <span>{t("orders.bestOffer")}:</span>
                    <span>{new BN(bestBuyPrice).toFormat()}{" "}{t("currency." + activePair.quoteAsset)}</span>
                </div>
            </div>

            <NumberInput
                lead={t("volume")}
                after={t("currency." + activePair.baseAsset)}
                value={order.reqAmount.toString()}
                maxDecimal={activePair.baseAssetPrecision}
                onchange={(e) => buyPriceHandler(e.target.value, "reqAmount")}
                alert={alert.reqAmount}
                customClass={`${classes.smallInput} fs-0-8`}
            />
            <NumberInput
                lead={t("orders.pricePerUnit")}
                after={t("currency." + activePair.quoteAsset)}
                value={order.pricePerUnit.toString()}
                maxDecimal={activePair.quoteAssetPrecision}
                onchange={(e) => buyPriceHandler(e.target.value, "pricePerUnit")}
                customClass={`${classes.smallInput} fs-0-8 my-05`}
            />
            <NumberInput
                lead={t("totalPrice")}
                value={order.totalPrice.toString()}
                maxDecimal={activePair.quoteAssetPrecision}
                after={t("currency." + activePair.quoteAsset)}
                onchange={(e) => buyPriceHandler(e.target.value, "totalPrice")}
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
                    buttonClass={`${classes.thisButton} width-50 ${classes.buyOrder} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} flex jc-center ai-center`}
                    type="submit"
                    onClick={submit}
                    disabled={alert.reqAmount || order.reqAmount.isZero() || order.pricePerUnit.isZero() || !isLogin}
                    buttonTitle={submitButtonTextHandler()}

                />
            </div>



        </div>
    );
};



export default BuyOrder;
