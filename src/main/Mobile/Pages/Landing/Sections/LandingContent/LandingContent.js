import React from 'react';
import classes from './LandingContent.module.css'
import ScrollBar from "../../../../../../components/ScrollBar";
import MarketTitle from "./components/MarketTitle/MarketTitle";
import Spinner from "./components/Spinner/Spinner";
import MarketView from "./components/MarketView/MarketView";
import MarketInfo from "./components/MarketInfo/MarketInfo";
import Footer from "../../../../../../components/Footer/Footer";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";

const LandingContent = () => {
    return (
        <div className={`${classes.container} width-100 column`}>
            <ScrollBar>
                <MarketTitle/>
                <Spinner/>
                <MarketView/>
                <MarketInfo/>
                <GeneralInfo/>
                <Footer/>
            </ScrollBar>
        </div>
    );
};

export default LandingContent;
