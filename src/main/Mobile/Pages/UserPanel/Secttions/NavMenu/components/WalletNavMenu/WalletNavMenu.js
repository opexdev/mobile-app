import React from 'react';
import classes from "../../NavMenu.module.css";
import {NavLink, useParams} from "react-router-dom";
import * as Routes from "../../../../../../Routes/routes";
import Icon from "../../../../../../../../components/Icon/Icon";

const WalletNavMenu = () => {

    const {id} = useParams()


    return (
        <div className={`container ${classes.container} row ai-center jc-between`}>
            <NavLink
                to={Routes.Wallet+"/"+id + Routes.DepositRelative}
                className={({isActive}) =>
                isActive ? `col-33 column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
            }
                >
                <Icon iconName="icon-overview font-size-lg"/>
                <span className={`font-size-sm`}>واریز</span>
            </NavLink>
            <NavLink
                to={Routes.Wallet+"/"+id + Routes.WithdrawalRelative}
                className={({isActive}) =>
                    isActive ? `col-33 column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-orderbook font-size-lg"/>
                <span className={`font-size-sm`}>برداشت</span>
            </NavLink>
            <NavLink
                to={Routes.Wallet+"/"+id + Routes.transactionRelative}
                className={({isActive}) =>
                    isActive ? `col-33  column jc-center ai-center ${classes.selected}` : `col-33 column jc-center ai-center`
                }
            >
                <Icon iconName="icon-order font-size-lg"/>

                <span className={`font-size-sm`}>تراکنش ها</span>
            </NavLink>
        </div>
    );
};

export default WalletNavMenu;
