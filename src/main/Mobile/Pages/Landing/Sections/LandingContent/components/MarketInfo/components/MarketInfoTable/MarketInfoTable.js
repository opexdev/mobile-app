import React, {useState} from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import {Order} from "../../../../../../../../Routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setActivePairInitiate} from "../../../../../../../../../../store/actions";
import {BN} from "../../../../../../../../../../utils/utils";
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list";
import Button from "../../../../../../../../../../components/Button/Button";

const MarketInfoTable = ({data, activeCurrency}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allExchangeSymbols = useSelector((state) => state.exchange.symbols)

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

                    if (swipLeft === index) return setSwipLeft(null)
                    return setSwipRight(prevState => prevState === index ? null : index)
                }}
            />
        </LeadingActions>
    );

    const trailingActions = (index) => (
        <TrailingActions>
            <SwipeAction
                destructive={false}
                onClick={() => {
                    if (swipRight === index) return setSwipRight(null)
                    return setSwipLeft(prevState => prevState === index ? null : index)
                }}
            />
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

    let body = (
        <>
            {data.map((tr, index) => {
                return (
                    <SwipeableList threshold={0.01}>
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
                                         <span className={`mr-1`}>{activeCurrency ? t("currency." + tr?.base) : tr?.base + " / " + tr?.quote}</span>
                                    </div>
                                    <div className={`width-50 column jc-start ai-end`}>
                                        <div className={`row jc-center ai-center`}>
                                            <span className={`fs-0-6 ml-3 ${tr.priceChange > 0 ? "text-green" : "text-red"}`}>{tr.priceChange} %</span>
                                            <span className={`mr-1 ${tr.priceChange > 0 ? "text-green" : "text-red"}`}>{new BN(tr.lastPrice).toFormat()}
                                            <span className={`fs-0-7 mr-05`}>{t("currency." + tr?.quote)}</span></span>
                                        </div>
                                        <span className={`fs-0-8`}>{new BN(tr.volume).toFormat()}</span>
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
                                        <img
                                            className={`img-lg ${classes.filter}`}
                                            src={images.chart}
                                            alt={""}
                                            title={""}
                                        />
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
