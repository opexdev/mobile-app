import React from 'react';
import Icon from "../../../../../../../../components/Icon/Icon";
import {useDispatch} from "react-redux";
import {activeActionSheet} from "../../../../../../../../store/actions/global";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

const SettingsHeader = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch();
    const location = useLocation()

    return (
        <>
            <h3 className={`mr-2 text-orange`} onClick={() => dispatch(activeActionSheet({subMenu: true}))}>
                {t("routes." + location.pathname)}
            </h3>
            <Icon iconName="icon-settings fs-20 flex"
                  onClick={() => dispatch(activeActionSheet({menu: true}))}
            />
        </>
    );
};

export default SettingsHeader;
