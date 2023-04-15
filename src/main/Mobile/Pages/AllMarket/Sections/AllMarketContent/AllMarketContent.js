import React from 'react';
import classes from './AllMarketContent.module.css'
import ScrollBar from "../../../../../../components/ScrollBar";
import Footer from "../../../../../../components/Footer/Footer";
import Swing from "./components/Swing/Swing";
import MarketStats from "./components/MarketStats/MarketStats";
import AllMarketInfo from "./components/AllMarketInfo/AllMarketInfo";

const AllMarketContent = () => {
    return (
        <div className={`${classes.container} width-100 column`}>
            <ScrollBar>
               {/* <Swing/>*/}
                <MarketStats/>
                <AllMarketInfo/>
                <Footer/>
            </ScrollBar>
        </div>
    );
};

export default AllMarketContent;
