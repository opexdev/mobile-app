import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {activeActionSheet} from "../../../../../../../../store/actions/global";
import {useDispatch} from "react-redux";

const WalletHeader = ({showSubMenu, showMenu}) => {

    const {id} = useParams()
    const {t} = useTranslation()
    const dispatch = useDispatch();


    return (
        <>
            <h3 style={{color: "var(--orange)"}}
                onClick={() => dispatch(activeActionSheet({subMenu: true}))}>{t("currency." + id)}
            </h3>
            <Icon iconName="icon-safe fs-20 flex"
                  onClick={() => dispatch(activeActionSheet({menu: true}))}
            />
        </>
    );
};

export default WalletHeader;
