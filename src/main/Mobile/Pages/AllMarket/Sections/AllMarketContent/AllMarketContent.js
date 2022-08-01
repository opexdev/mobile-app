import React from 'react';
import classes from './AllMarketContent.module.css'
import ScrollBar from "../../../../../../components/ScrollBar";
import Footer from "../../../../../../components/Footer/Footer";
import Swing from "./components/Swing/Swing";

const AllMarketContent = () => {
    return (
        <div className={`${classes.container} container column`}>
            <ScrollBar>



                <Swing/>

                <Footer/>




            </ScrollBar>
        </div>
    );
};

export default AllMarketContent;
