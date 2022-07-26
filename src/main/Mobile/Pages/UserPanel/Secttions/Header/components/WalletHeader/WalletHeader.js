import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const WalletHeader = ({showSubMenu, showMenu}) => {

    const {id} = useParams()
    const {t} = useTranslation()

    return (
        <>
            <h3 style={{color: "var(--orange)"}} onClick={showSubMenu}>{t("currency." + id)}</h3>


            <Icon iconName="icon-safe font-size-lg-plus flex" onClick={showMenu}/>
        </>
    );
};

export default WalletHeader;
