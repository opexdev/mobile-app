import React from 'react';
import classes from './HistoryHeader.module.css';
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import * as RoutesName from "../../../../../../Routes/routes";
import {activeActionSheet} from "../../../../../../../../store/actions/global";
import Icon from "../../../../../../../../components/Icon/Icon";

const HistoryHeader = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch();
    const location = useLocation()

    const clickHandler = () => {
        if (!(location.pathname.includes(RoutesName.HistoryRelative)) ) {

            console.log("in")
            dispatch(activeActionSheet({subMenu: true}))
        }
    }

    return (
        <>
            <h3 className={`mr-2 text-orange`} onClick={() => clickHandler()}>
                {t("history.title")}
            </h3>
            <Icon iconName="icon-clock fs-20 flex"
                  onClick={() => dispatch(activeActionSheet({menu: true}))}
            />
        </>
    );
};

export default HistoryHeader;
