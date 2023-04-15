import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {activeActionSheet} from "../../../../../../../../store/actions/global";
import {useDispatch} from "react-redux";
import i18n from "i18next";

const WalletHeader = ({showSubMenu, showMenu}) => {

    const {id} = useParams()
    const {t} = useTranslation()
    const dispatch = useDispatch();


    return (
        <>
            <div className={`row jc-center ai-center text-orange fs-02`} onClick={() => dispatch(activeActionSheet({subMenu: true}))}>
                <span className={`ml-1`}>{t("currency." + id)}</span>
                {i18n.language === "fa" && <span className={`mr-1`}>{id}</span>}
            </div>
            <Icon iconName="icon-safe fs-20 flex"
                  onClick={() => dispatch(activeActionSheet({menu: true}))}
            />
        </>
    );
};

export default WalletHeader;
