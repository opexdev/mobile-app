import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const MarketHeader = ({showSubMenu, showMenu}) => {
    const {t} = useTranslation();

    const activePair = useSelector((state) => state.exchange.activePair)

    return (
        <>
            <h3 className={`mr-2`} onClick={showSubMenu}>{t("currency." + activePair.baseAsset)}/{t("currency." + activePair.quoteAsset)}</h3>


            <Icon iconName="icon-market font-size-lg-plus flex" onClick={showMenu}/>
        </>
    );
};

export default MarketHeader;
