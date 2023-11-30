import React from "react";
import classes from "../MarketCard/MarketCard.module.css";
import {useDispatch, useSelector} from "react-redux";
import {images} from "../../../../../../../../../../assets/images";
import Icon from "../../../../../../../../../../components/Icon/Icon";
import {BN} from "../../../../../../../../../../utils/utils";
import {setActivePairInitiate} from "../../../../../../../../../../store/actions";
import {activeActionSheet} from "../../../../../../../../../../store/actions/global";
import {useGetLastPrices} from "../../../../../../../../../../queries/hooks/useGetLastPrices";


const MarketPairCard = ({id, pair,favPair,addFav}) => {

    const activePair = useSelector((state) => state.exchange.activePair.symbol)
    const {data: prices} = useGetLastPrices()
    const dispatch = useDispatch();
    const changeActivePair = () =>{
        if (activePair !== pair.symbol) {
            dispatch(setActivePairInitiate(pair, id))
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
                    src={images[pair.baseAsset]}
                    alt={pair.symbol}
                    title={pair.symbol}
                />
            </div>
            <div className={`row jc-between ai-center ${classes.marketCardContent}`}>
                <div className="row">
                    <div onClick={(e) => {
                        e.stopPropagation();
                        addFav(pair.symbol);
                    }} data-name={pair.symbol}>
                        <Icon
                            iconName={`${favPair.includes(pair.symbol) ? "icon-star-filled" : "icon-star"} text-color fs-04 ml-05`}
                        />
                    </div>
                    <span className={`mr-1`}>
                        {pair.baseAsset +"/"+pair.quoteAsset}
                    </span>
                </div>
                <div>
                    {new BN(prices[pair.symbol] || 0).toFormat()}
                </div>
            </div>
        </div>

    );
};


export default MarketPairCard;
