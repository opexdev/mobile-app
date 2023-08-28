import React from 'react';
import classes from "./AllMarket.module.css";
import {images} from "../../../../assets/images";
import MarketStats from "./components/MarketStats/MarketStats";
import AllMarketInfo from "./components/AllMarketInfo/AllMarketInfo";

const AllMarket = () => {

    return (
        <div className={`${classes.container} move-image`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <MarketStats/>
            <AllMarketInfo/>
        </div>

    );
}

export default AllMarket;