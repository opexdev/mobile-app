import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {activeActionSheet} from "../../../../../../../../store/actions/global";

const MarketHeader = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const activePair = useSelector((state) => state.exchange.activePair)

    return (
        <>
            <h3 className={`mr-2`} onClick={() => dispatch(activeActionSheet({subMenu: true}))}>
                {t("currency." + activePair.baseAsset)}/{t("currency." + activePair.quoteAsset)}
            </h3>
            <Icon iconName="icon-market fs-20 flex"
                  onClick={() => dispatch(activeActionSheet({menu: true}))}
            />
        </>
    );
};

export default MarketHeader;
