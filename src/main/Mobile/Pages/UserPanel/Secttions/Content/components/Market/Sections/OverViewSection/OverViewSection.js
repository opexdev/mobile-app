import React from 'react';
import Overview from "../../components/Overview/Overview";
import TradingView from "../../components/TradingView/TradingView";

const OverViewSection = () => {
    return (
        <>
            <div className={`container col-28`}>
                <Overview/>
            </div>
            <div className={`container col-70`}>
                <TradingView/>
            </div>
        </>
    );
};

export default OverViewSection;
