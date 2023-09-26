import React, {useEffect} from 'react';
import classes from './TransactionHistory.module.css'
import * as RoutesName from "../../../../../../Routes/routes";
import {activeOrderLayout} from "../../../../../../../../store/actions/global";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";

const TransactionHistory = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {

        if (location.pathname === RoutesName.TxHistory) {
            dispatch(activeOrderLayout(true))
        }
        return () => {
            dispatch(activeOrderLayout(false))
        }

    }, [location.pathname]);

    return (
        <div className={`width-100 flex ai-center jc-center height-100 px-3 py-1 ${classes.container}`}>
            TransactionHistory
        </div>
    );
};

export default TransactionHistory;
