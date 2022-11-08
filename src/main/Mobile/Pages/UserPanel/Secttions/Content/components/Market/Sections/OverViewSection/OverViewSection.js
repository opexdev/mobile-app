import React from 'react';
import Overview from "../../components/Overview/Overview";
import TradingView from "../../components/TradingView/TradingView";

const OverViewSection = () => {
    return (
        <>
            <div className={`width-100 col-28`}>
                <Overview/>
            </div>
            <div className={`width-100 col-70`}>
                <TradingView/>
            </div>
        </>
    );
};

export default OverViewSection;
