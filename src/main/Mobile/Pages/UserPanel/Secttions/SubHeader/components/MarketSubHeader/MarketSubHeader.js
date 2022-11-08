import React from 'react';

const MarketSubHeader = () => {
    return (
        <>
            <div className={`width-100 row jc-between ai-center pb-1`}>
                <span>موجودی:</span>
                <span>0.0005 بیتکوین | 1،564،666 تومان</span>
            </div>

            <span>آخرین قیمت: <span className={`text-green`}>1,651,999,900</span> تومان</span>
        </>
    );
};

export default MarketSubHeader;
