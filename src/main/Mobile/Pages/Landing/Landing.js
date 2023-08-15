import React from 'react';
import classes from "./Landing.module.css";
import {images} from "../../../../assets/images";
import MarketTitle from "./components/MarketTitle/MarketTitle";
import Spinner from "./components/Spinner/Spinner";
import MarketView from "./components/MarketView/MarketView";
import MarketInfo from "./components/MarketInfo/MarketInfo";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";

const Landing = () => {
    return (
        <div className={`${classes.container} move-image`} style={{backgroundImage: `url("${images.spaceStar}")`}}>
            <MarketTitle/>
            <Spinner/>
            <MarketView/>
            <MarketInfo/>
            <GeneralInfo/>
        </div>
    );
};

export default Landing;
