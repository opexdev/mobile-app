import React from 'react';
import classes from "../../NavMenu.module.css";
import {NavLink, useParams} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";

const WalletNavMenu = () => {

    const {id} = useParams()


    return (
        <div className={`width-100 ${classes.container} row ai-center jc-between`}>
            <NavLink
                to={Routes.Wallet+"/"+id + Routes.DepositRelative}
                className={({isActive}) =>
                isActive ? `col-33 column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
            }
                >
                <Icon iconName="icon-overview fs-06"/>
                <span className={`1`}>واریز</span>
            </NavLink>
            <NavLink
                to={Routes.Wallet+"/"+id + Routes.WithdrawalRelative}
                className={({isActive}) =>
                    isActive ? `col-33 column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-orderbook fs-06"/>
                <span className={`1`}>برداشت</span>
            </NavLink>
            <NavLink
                to={Routes.Wallet+"/"+id + Routes.transactionRelative}
                className={({isActive}) =>
                    isActive ? `col-33  column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order fs-06"/>

                <span className={`fs-0-6`}>تراکنش ها</span>
            </NavLink>
        </div>
    );
};

export default WalletNavMenu;
