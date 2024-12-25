import React from 'react';
import classes from '../../NavMenu.module.css'
import {NavLink, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import * as Routes from "../../../../../../Routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";
import {DepositHistory, WithdrawHistory} from "../../../../../../Routes/routes";

const HistoryNavMenu = () => {

    const {id} = useParams()
    const {t} = useTranslation();

    return (
        <div className={`width-100 ${classes.container} row ai-center jc-between`}>

            <NavLink
                to={Routes.TransactionsHistory}
                className={({isActive}) =>
                    isActive ? `col-33 column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-transactions fs-06"/>
                <span className={`fs-0-8`}>{t("history.transactions")}</span>
            </NavLink>
            <NavLink
                to={Routes.DepositHistory}
                className={({isActive}) =>
                    isActive ? `col-33 column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-deposit fs-06"/>
                <span className={`fs-0-8`}>{t("history.deposit")}</span>
            </NavLink>
            <NavLink
                to={Routes.WithdrawHistory}
                className={({isActive}) =>
                    isActive ? `col-33 column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-withdraw fs-06"/>
                <span className={`fs-0-8`}>{t("history.withdraw")}</span>
            </NavLink>

        </div>
    );
};

export default HistoryNavMenu;
