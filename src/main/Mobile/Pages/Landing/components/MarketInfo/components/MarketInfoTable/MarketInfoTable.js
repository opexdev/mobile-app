import React, {useState} from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../assets/images";
import {Order} from "../../../../../../Routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setActivePairInitiate} from "../../../../../../../../store/actions";
import {BN, getCurrencyNameOrAlias} from "../../../../../../../../utils/utils";
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list";
import Button from "../../../../../../../../components/Button/Button";
import i18n from "i18next";
import {useGetChartData} from "../../../../../../../../queries";

const  MarketInfoTable = ({data, activeCurrency, interval}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)
    const allExchangeSymbols = useSelector((state) => state.exchange.symbols)

    const pairsList = useSelector((state) => state.exchange.pairsList)
    const symbols = Object.keys(pairsList);

    const { data: ChartData, isLoading: ChartDataIsLoading, error: ChartDataError } = useGetChartData(symbols, interval);


    const [swipRight, setSwipRight] = useState(null);
    const [swipLeft, setSwipLeft] = useState(null);


    const navigateToPanel = (symbol) => {
        const selectedPair = allExchangeSymbols.find(s => s.symbol === symbol)
        dispatch(setActivePairInitiate(selectedPair, 0))
        navigate(Order)
    }

    const leadingActions = (index) => (
        <LeadingActions>
            <SwipeAction
                onClick={() => {
                    if (i18n.language === "fa") {
                        if (swipLeft === index) return setSwipLeft(null)
                        return setSwipRight(prevState => prevState === index ? null : index)
                    } else {
                        if (swipRight === index) return setSwipRight(null)
                        return setSwipLeft(prevState => prevState === index ? null : index)
                    }
                }}
            ><></></SwipeAction>
        </LeadingActions>
    );

    const trailingActions = (index) => (
        <TrailingActions>
            <SwipeAction
                destructive={false}
                onClick={() => {
                    if (i18n.language === "fa") {
                        if (swipRight === index) return setSwipRight(null)
                        return setSwipLeft(prevState => prevState === index ? null : index)
                    } else {
                        if (swipLeft === index) return setSwipLeft(null)
                        return setSwipRight(prevState => prevState === index ? null : index)
                    }
                }}
            ><></></SwipeAction>
        </TrailingActions>
    );

    const swipClassHandler = (index) => {
        if (swipRight === index) return classes.activeSwipRight;
        if (swipLeft === index) return classes.activeSwipLeft;
        return classes.hideSwip
    }

    const hideSwip = (index) => {
        if (swipRight === index) return setSwipRight(null)
        if (swipLeft === index) return setSwipLeft(null)
    }


    let head = (
        <div className="row text-color-gray px-4 py-2" style={{backgroundColor: "var(--tableHeader)"}}>
            <span className="width-50 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-50 flex jc-end ai-center">{t("MarketInfo.lastPrice")}</span>
        </div>
    );

    const chartView = (chartInfo) => {
        if (ChartDataIsLoading) {
            return <span className="flashit ">-----</span>
        }
        if (ChartDataError || !(chartInfo?.svgData)) {
            return
        }
        return <img src={`data:image/svg+xml;base64,${chartInfo?.svgData}`} alt={chartInfo?.symbol} className={`${classes.chart} ${chartInfo?.isTrendUp ? classes.filterUp : classes.filterDown }`}/>
    }

    let body = (
        <>
            {data.map((tr, index) => {
                const chartInfo = ChartData?.find(chart => chart.symbol.replace("_", "") === tr.symbol);
                return (
                    <SwipeableList threshold={0.01} key={index}>
                        <SwipeableListItem
                            leadingActions={leadingActions(index)}
                            trailingActions={trailingActions(index)}
                        >
                            <div className={`${classes.row} position-relative  row fs-01 rounded-5 border-bottom cursor-pointer`} key={index}>
                                <div className={`width-100 row  px-4 py-1 ${classes.front} ${swipClassHandler(index)}`} onClick={() => hideSwip(index)}>
                                     <div className="width-50 row jc-start ai-center">
                                         <img
                                             src={images[tr?.base]}
                                             alt={tr?.base}
                                             title={tr?.baseAsset}
                                             className={`img-md ml-1`}
                                         />
                                         <span className={`mr-1`}>{activeCurrency ? getCurrencyNameOrAlias(currencies[tr?.base], language) : tr?.base + " / " + tr?.quote}</span>
                                    </div>
                                    <div className={`width-50 column jc-start ai-end`}>
                                        <div className={`row jc-center ai-center`}>

                                            <span className={`fs-0-6 ml-3 ${tr.priceChangePercent > 0 ? "text-green" : tr.priceChangePercent < 0 ? "text-red" : ""} direction-ltr}`}>

                                                {tr.priceChangePercent === 0 ? "0 %" : `${new BN(tr.priceChangePercent).toFormat(2)} %`}

                                            </span>


                                            <span className={`mr-1 ${tr.priceChangePercent > 0 ? "text-green" : tr.priceChangePercent < 0 ? "text-red" : ""}`}>{new BN(tr.lastPrice).decimalPlaces(currencies[tr?.quote]?.precision ?? 0).toFormat()}
                                            <span className={`fs-0-7 mr-05`}>{getCurrencyNameOrAlias(currencies[tr?.quote], language)}</span></span>
                                        </div>
                                        <span className={`fs-0-8`}>{new BN(tr.volume).decimalPlaces(currencies[tr?.base]?.precision ?? 0).toFormat()}</span>
                                    </div>
                                </div>

                                <div className={`position-absolute ${classes.behind} width-100 flex jc-between ai-center px-4 py-1`}>
                                    <div className="width-30 flex jc-center ai-center height-100">
                                        <Button
                                            buttonClass={classes.thisButton}
                                            type="button"
                                            onClick={() => navigateToPanel(tr.symbol)}
                                            buttonTitle={t("MarketInfo.trade")}
                                        />
                                    </div>

                                    <div className="width-30 flex jc-end ai-center">
                                        {chartView(chartInfo)}
                                    </div>
                                </div>
                            </div>
                        </SwipeableListItem>
                    </SwipeableList>
                )
            })}
        </>
    );

    return (
        <>
            {head}
            {body}
        </>
    );
};

export default MarketInfoTable;
