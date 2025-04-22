import React from "react";
import classes from "../MarketCard/MarketCard.module.css";
import {useDispatch, useSelector} from "react-redux";
import {images} from "../../../../../../../../../../assets/images";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import {BN, formatWithPrecision} from "../../../../../../../../../../utils/utils";
import {setActivePairInitiate} from "../../../../../../../../../../store/actions";
import {activeActionSheet} from "../../../../../../../../../../store/actions/global";
import {useGetLastPrices} from "../../../../../../../../../../queries/hooks/useGetLastPrices";
import i18n from "i18next";


const MarketPairCard = ({id, pair,favPair,addFav}) => {

    console.log("id", id)

    const activePair = useSelector((state) => state.exchange.activePair.symbol)
    const {data: prices} = useGetLastPrices()
    const dispatch = useDispatch();

    const language = i18n.language
    const currencies = useSelector((state) => state.exchange.currencies)

    const changeActivePair = () =>{
        const pairSymbolFormatted = `${pair.baseAsset}_${pair.quoteAsset}`;
        if (activePair !== pairSymbolFormatted) {
            dispatch(setActivePairInitiate(`${pair.baseAsset}_${pair.quoteAsset}`, id));
            dispatch(activeActionSheet({
                menu: false,
                subMenu: false,
            }))
        }
    }

    return (<div onClick={changeActivePair}
                 className={`width-100 row jc-between ai-center px-4 py-2 my-1 cursor-pointer double-striped m-auto ${classes.container} ${activePair === pair.symbol ? classes.selected : ""} `}>
            <div className={` row jc-between ai-center ${classes.marketCardImage}`}>
                <img
                    className="img-md flex"
                    src={currencies[pair?.baseAsset]?.icon}
                    alt={pair?.symbol}
                    title={pair?.symbol}
                />
            </div>
            <div className={`row jc-between ai-center ${classes.marketCardContent}`}>
                <div className="row">
                    <div onClick={(e) => {
                        e.stopPropagation();
                        addFav(pair?.symbol);
                    }} data-name={pair?.symbol}>
                        <Icon
                            iconName={`${favPair.includes(pair.symbol) ? "icon-star-filled" : "icon-star"} text-color fs-04 ml-05`}
                        />
                    </div>
                    <span className={`mr-1`}>
                        {pair?.baseAsset + " / " + pair?.quoteAsset}
                    </span>
                </div>
                <div>
                    {formatWithPrecision(prices[pair?.symbol] || 0, currencies[pair?.quoteAsset]?.precision ?? 0)}
                </div>
            </div>
        </div>

    );
};


export default MarketPairCard;
