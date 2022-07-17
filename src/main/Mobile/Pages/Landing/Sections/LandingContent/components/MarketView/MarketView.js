import React from 'react';
import Title from "../../../../../../../../components/Title/Title";
import MarketViewCard from "./components/MarketViewCard/MarketViewCard";

const MarketView = () => {
    return (
        <div className={`column py-2`} style={{backgroundColor: "var(--mainContent)"}}>
            <span className={`width-90 m-auto`}>
                <Title title={"روند 24 ساعت"}/>
            </span>
            <MarketViewCard/>
        </div>
    );
};

export default MarketView;
