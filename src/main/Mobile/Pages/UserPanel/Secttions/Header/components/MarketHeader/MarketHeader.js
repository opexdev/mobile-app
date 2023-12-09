import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {activeActionSheet} from "../../../../../../../../store/actions/global";
import i18n from "i18next";

const MarketHeader = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const activePair = useSelector((state) => state.exchange.activePair)
    const active = useSelector((state) => state.global.activeActionSheet.subMenu)

    return (
        <>
            <div className={`row jc-center ai-center fs-02`} onClick={() => dispatch(activeActionSheet({subMenu: true}))}>
                <span className={`ml-05`}>{t("currency." + activePair.baseAsset)}/{t("currency." + activePair.quoteAsset)}</span>
                <Icon iconName={`${active ? 'icon-up-micro' : 'icon-down-micro'}  fs-07 mr-05 flex`}/>
            </div>

            <Icon iconName="icon-market fs-20 flex"
                  onClick={() => dispatch(activeActionSheet({menu: true}))}
            />
        </>
    );
};

export default MarketHeader;
