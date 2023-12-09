import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {activeActionSheet} from "../../../../../../../../store/actions/global";
import {useDispatch, useSelector} from "react-redux";
import i18n from "i18next";

const WalletHeader = () => {

    const {id} = useParams()
    const {t} = useTranslation()
    const dispatch = useDispatch();

    const active = useSelector((state) => state.global.activeActionSheet.subMenu)

    return (
        <>
            <div className={`row jc-center ai-center text-orange fs-02`} onClick={() => dispatch(activeActionSheet({subMenu: true}))}>
                <span className={`ml-05`}>{t("currency." + id)}</span>
                {i18n.language === "fa" && <span className={`mr-05`}>{id}</span>}
                <Icon iconName={`${active ? 'icon-up-micro' : 'icon-down-micro'}  fs-07 mr-05 flex`}/>
            </div>
            <Icon iconName="icon-safe fs-20 flex"
                  onClick={() => dispatch(activeActionSheet({menu: true}))}
            />
        </>
    );
};

export default WalletHeader;
