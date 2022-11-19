import React from 'react';
import classes from './MarketInfoTable.module.css'
import {useTranslation} from "react-i18next";
import {images} from "../../../../../../../../../../assets/images";
import {Order, Panel} from "../../../../../../../../Routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setActivePairInitiate} from "../../../../../../../../../../store/actions";
import {BN} from "../../../../../../../../../../utils/utils";

const MarketInfoTable = ({data, activeCurrency}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allExchangeSymbols = useSelector((state) => state.exchange.symbols)

    const navigateToPanel = (symbol) => {
        const selectedPair = allExchangeSymbols.find( s => s.symbol === symbol)
        dispatch(setActivePairInitiate(selectedPair, 0))
        navigate(Order)
    }


    let head = (
        <div className="row text-color-gray px-4 py-2" style={{backgroundColor:"var(--tableHeader)"}}>
            <span className="width-50 flex jc-start ai-center">{t("MarketInfo.name")}</span>
            <span className="width-50 flex jc-end ai-center">{t("MarketInfo.lastPrice")}</span>
            {/*<span className="width-30 flex jc-end ai-center">{t("MarketInfo.chart")}</span>*/}
        </div>
    );

    let body = (
        <>
            {data.map((tr, index) => {
                return (
                    <div className={`${classes.row} row fs-01 rounded-5 border-bottom cursor-pointer px-4 py-1`} onClick={() => navigateToPanel(tr.symbol)}>
                        <span className="width-50 row jc-start ai-center">
                            <img src={images[tr?.base]} alt={tr?.base}
                             title={tr?.baseAsset} className={`img-md ml-1`}/>
                            <span className={`mr-1`}>{activeCurrency ? t("currency." + tr?.base) : tr?.base + " / " + tr?.quote}</span>
                        </span>

                        <span className={`width-50 column jc-start ai-end`}>
                            <span className={` ${tr.priceChange > 0 ? "text-green" : "text-red"}`}>{new BN(tr.lastPrice).toFormat()} <span className={`fs-0-7 mr-05`}>{t("currency." + tr?.quote)}</span></span>
                            <span className={`fs-0-6 ${tr.priceChange > 0 ? "text-green" : "text-red"}`}>{tr.priceChange} %</span>
                        </span>

                        {/*<span className="width-30 flex jc-end ai-center">
                            <img
                                className="img-lg"
                                src={images.chart}
                                alt={""}
                                title={""}
                            />
                        </span>*/}
                    </div>
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
