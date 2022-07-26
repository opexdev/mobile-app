import React from 'react';
import {useLocation} from "react-router-dom";

const MarketSubMenu = () => {
    const location = useLocation();

    return (
        <div className={`container flex jc-center ai- my-5`}>
            Market sub menu
        </div>
    );
};

export default MarketSubMenu;
